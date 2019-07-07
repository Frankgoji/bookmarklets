console.log('Background installed, up and running.');

// Show icon for Tumblr page
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.tumblr.com'}
        })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});

// onMessage listener
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.contentScriptQuery === 'getPostDate') {
        // get the post date for a particular post
        var url = request.url;
        console.log("Retrieving " + url);
        fetch(url)
            .then(data => data.text())
            .then(data => {
                var date = data.match(/datePublished":"([^"]*)-0[0-9]:00"/)[1] + "Z";
                console.log("Post date is " + date);
                sendResponse(Date.parse(date));
            });
        return true;
    }
});
