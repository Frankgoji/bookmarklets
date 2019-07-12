// Listen for a request for startTime and endTime
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.contentScriptQuery === 'getTimes') {
        // get, parse, and send the start and end times
        var fromTime = document.getElementById('startTime').value;
        var toTime = document.getElementById('endTime').value;
        var message = {
            startTime: Date.parse(fromTime),
            endTime: Date.parse((toTime === 'now') ? new Date() : toTime)
        };
        sendResponse(message);
        return true;
    }
});

// Check the input for the times, and enable/disable the start button as appropriate
function checkTimes() {
    var startTime = document.getElementById('startTime').value;
    var endTime = document.getElementById('endTime').value;
    document.getElementById('start').disabled = startTime === '' || endTime === '';
}

// Start scrolling
function startScroll() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            file: 'tumblrScroll.js'
        });
    });
    window.close();
    return false;
}
