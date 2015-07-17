# This python script uses selenium to get the appropriate links for the
# specified youtube playlist, then prints them out.

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from sys import argv

# read argument to get playlist url
if len(argv) != 2:
    raise ValueError("Needs only 1 arg: playlist url")

pl_url = argv[1]

driver = webdriver.Firefox()
driver.get("http://downvids.net/download-youtube-playlist-videos")
bar = driver.find_element_by_name("playlist")
bar.send_keys(pl_url)
bar.send_keys(Keys.RETURN)
# close popup
driver.switch_to_window("windowname5")
driver.close()
driver.switch_to_window(driver.window_handles[0])
links = driver.find_elements_by_link_text("Download as video")
download_urls = ";".join(map(lambda x: x.get_attribute("href"), links))
print(download_urls)
driver.quit()
