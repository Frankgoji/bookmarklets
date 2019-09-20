/* Periodically polls the latest message in the chat, and if it's a new message
 * prints out a desktop notification.
 */
javascript:(
    function() {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                var prevMsg = '';
                setInterval(() => {
                    let messages = document.getElementsByTagName('yt-live-chat-text-message-renderer');
                    let lastMsg = messages[messages.length - 1];
                    let msg = document.evaluate('.//span[@id="message"]', lastMsg, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
                    if (msg !== prevMsg) {
                        console.log(msg);
                        prevMsg = msg;
                        let notif = new Notification(msg);
                    }
                }, 1000);
            }
        });
    }
)();
