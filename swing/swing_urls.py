# Prints all the swing URLs in the dropbox so that I can wget them

import sys
import urllib.request
from html.parser import HTMLParser

assert len(sys.argv) == 2, "Should have 1 argument, the URL"
URL = sys.argv[1]

class LinkHTMLParser(HTMLParser):
    should_print = False
    url_to_print = ''

    def tuples_to_dict(self, tups):
        return {attr[0]: attr[1] for attr in tups}

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            attr_dict = self.tuples_to_dict(attrs)
            if 'class' in attr_dict and \
                    attr_dict['class'] == 'file-link filename-link' and \
                    'jpg' not in attr_dict['href']:
                LinkHTMLParser.should_print = True
                LinkHTMLParser.url_to_print = attr_dict['href'] + '|'

    def handle_endtag(self, tag):
        if tag == 'a':
            LinkHTMLParser.should_print = False

    def handle_data(self, data):
        if LinkHTMLParser.should_print and 'jpg' not in data:
            print(LinkHTMLParser.url_to_print + data)
            LinkHTMLParser.url_to_print = ''

parser = LinkHTMLParser(convert_charrefs=True)
with urllib.request.urlopen(URL) as page:
    parser.feed(page.readall().decode('utf-8'))
