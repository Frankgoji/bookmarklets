# Downloads a large playlist by individually getting the video urls, using a
# downloader, and running a parallel operation to download it

# Differs from vid.sh in that it threads the downloads, leaves the original
# names of the videos, and leaves a log in the folder with timestamps for each
# operation

# TODO: one selenium webdriver, 5 threads getting links -> 5 webdrivers
# downloading the links
# TODO: queue with info such as vid_num and name ("%0d %s" % vid_num, name), and
# download link
# TODO: a separate thread running simultaneously that waits for all vids done
# downloading and nothing in queue, runs wget to download each vid from the
# queue

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from sys import argv
import os
import datetime
import subprocess
import threading

class ParaPLDL:
    """A Parallel PlayList DownLoader"""

    def __init__(self, url, name):
        """Initializes the downloader with a Selenium webdriver"""
        # Create the log file
        self.name = name
        self.logfile = self.name + '.log'
        with open(self.logfile, 'w') as l:
            pass # initialize empty log file

        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(20)
        self.driver.get("http://downvids.net/download-youtube-playlist-videos")
        self.log("Started Selenium driver")

        bar = self.driver.find_element_by_name("playlist")
        bar.send_keys(url)
        bar.send_keys(Keys.RETURN)
        self.log("Inputted the playlist url")
        self.driver.switch_to_window("windowname5")
        self.driver.close()
        self.log("Closed popup window")
        self.driver.switch_to_window(self.driver.window_handles[0])

        links = self.driver.find_elements_by_link_text("Download as video")
        self.download_urls = list(map(lambda x: x.get_attribute("href"), links))
        self.titles = list(map(lambda x: x.text,
                    self.driver.find_elements_by_css_selector('.msgtxt.en')))
        assert self.download_urls == self.titles, "Diff num of titles and links"
        self.log("Acquired video download links and titles")
        self.driver.quit()
        self.log("Closed the Selenium webdriver")

    def log(self, line):
        """Writes line to log at self.log with timestamps"""
        now = datetime.datetime.now()
        time = datetime.datetime.strftime(now, '(%d %b %Y %H:%M:%S)')
        with open(self.logfile, 'a') as log:
            log.write(time + ' ' + line + '\n')

    def run(self, thread_count=2):
        """Runs the download process with multiple threads"""
        trycount = 10
        numprefix = '{0:0%dd}' % len(str(thread_count))

        def downloader(thread_num):
            """A thread that runs the download"""
            tid = 'Thread ' + numprefix.format(thread_num) + ': '
            for i in range(thread_num, len(self.titles), thread_count):
                title, link = self.titles[i], self.download_urls[i]
                name = numprefix.format(thread_num) + ' ' + title + '.mp4'
                tries = 0
                while (not os.path.exists(name) or os.path.getsize(name) == 0) \
                        and tries <= trycount:
                    if os.path.exists(name): os.remove(name)
                    subprocess.call(['wget', '--output-document=' + name, link])
                    self.log(tid + 'Calling wget for ' + name)
                    tries += 1
                if (not os.path.exists(name) or os.path.getsize(name) == 0):
                    self.log(tid + 'wget failed for ' + name)
                else:
                    self.log(tid + 'wget successfully downloaded ' + name)

        threads = []
        for i in range(thread_count):
            threads.append(threading.Thread(target=downloader, args=(i,)))
            self.log('Thread ' + numprefix.format(i) + ' created')

        for i in range(thread_count):
            threads[i].start()
            self.log('Thread ' + numprefix.format(i) + ' started')

        for t in threads: t.join()
        self.log('Threads terminated')
        self.log('Downloads completed')


if __name__ == '__main__':
    if len(argv) != 3:
        raise ValueError("Needs playlist url and name")

    url = argv[1]
    name = argv[2]

    # Create folder
    os.mkdir(name)
    os.chdir(name)

    pldl = ParaPLDL(url, name)
    pldl.run()

