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

class ParaPLDL:
    """A Parallel PlayList DownLoader"""

    def __init__(self, url):
        """Initializes the downloader with a Selenium webdriver"""
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(20)
        self.driver.get(url) # TODO: don't get url, get the pl download site and
        # input the url. can get the titles from checking the elements
        # TODO: click all the links until all of the playlist elements are
        # present
        #bar = driver.find_element_by_name("playlist")
        #bar.send_keys(pl_url)
        #bar.send_keys(Keys.RETURN)
        #driver.switch_to_window("windowname5")
        #driver.close()
        #driver.switch_to_window(driver.window_handles[0])
        #links = driver.find_elements_by_link_text("Download as video")
        #download_urls = ";".join(map(lambda x: x.get_attribute("href"), links))

    def run(self, thread_count=5):
        """Runs the download process with multiple threads"""
        def _link_getter(driver,)

    def close(self):
        self.driver.quit()
        # TODO: maybe close the threads if necessary?

if __name__ == '__main__':
    if len(argv) != 2:
        raise ValueError("Needs only playlist url")

    url = argv[1]

    pldl = ParaPLDL(url)
    pldl.run()
    pldl.close()

