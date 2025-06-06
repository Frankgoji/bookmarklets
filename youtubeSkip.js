// Copy below for basically a youtube skip button
// BTW now I know that the skip button issue is caused by BISCOTTI_BASED_DETECTION_STATE_IS_CLICK_EVENT_TRUSTED.
// It would require an extension, not just a bookmarklet, to get past the isTrusted check.
javascript: (
    () => {
        const getVid = () => {
            return document.getElementById('movie_player').querySelector('video');
        };
        if (document.querySelector('.video-ads').childNodes.length === 0) {
            return;
        }
        const v = getVid();
        v.currentTime = v.duration;
    }
)()

// Copy below for something that will skip for basically the whole video
javascript: (
    async () => {
        const getVid = () => {
            return document.getElementById('movie_player').querySelector('video');
        };
        const skip = async () => {
            try {
                if (document.querySelector('.video-ads').childNodes.length === 0) {
                    return;
                }
                const v = getVid();
                v.currentTime = v.duration;
                await new Promise(r => setTimeout(r, 1000));
            } catch (e) {
                /* Do Nothing */
            }
        };
        await skip(); await skip();
        await new Promise(r => setTimeout(r, 1000));
        const v = getVid();
        setInterval(() => {
            skip();
        }, 200);
    }
)()
