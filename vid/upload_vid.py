# Uploads the given video to Facebook

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from sys import argv

if len(argv) != 4:
    raise ValueError("Needs four arguments: username, password, and the vid to use")

USER, PASS, VID = argv[1:]

#driver = webdriver.Firefox()
#driver.implicitly_wait(20)
#driver.get("https://www.facebook.com")
