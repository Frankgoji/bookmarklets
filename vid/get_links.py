# This python script uses selenium to get the appropriate links for the
# specified youtube playlist, then prints them out.

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from sys import argv

if len(argv) != 2:
    raise ValueError("Needs only 1 arg: playlist url")

pl_url = argv[1]
print(pl_url)

driver = webdriver.Firefox()
driver.implicitly_wait(20)
driver.get("http://downvids.net/download-youtube-playlist-videos")
bar = driver.find_element_by_name("playlist")
bar.send_keys(pl_url)
bar.send_keys(Keys.RETURN)
if len(driver.window_handles) > 1:  # Close popup
    driver.switch_to_window(driver.window_handles[1])
    driver.close()
driver.switch_to_window(driver.window_handles[0])
links = driver.find_elements_by_link_text("Download as video")
names_elems = driver.find_elements_by_class_name('msgtxt')
download_urls = map(lambda x: x.get_attribute("href"), links)
names = map(lambda x: x.text, names_elems)
for n, l in zip(names, download_urls):
    print(n, l)
driver.quit()
