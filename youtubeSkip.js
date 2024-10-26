// Copy below for basically a youtube skip button
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
        document.getElementsByClassName('ytp-skip-ad-button')[0].click();
    }
)()

// Copy below for something that will skip for basically the whole video
javascript: (
    async () => {
        const getVid = () => {
            return document.getElementById('movie_player').querySelector('video');
        };
        const skip = async () => {
            if (document.querySelector('.video-ads').childNodes.length === 0) {
                return;
            }
            const v = getVid();
            if (v.duration < 60) {
                v.currentTime = v.duration;
                document.getElementsByClassName('ytp-skip-ad-button')[0].click();
            }
            await new Promise(r => setTimeout(r, 1000));
        };
        await skip(); await skip();
        await new Promise(r => setTimeout(r, 1000));
        const v = getVid();
        var currVid = window.location.href;
        var normalDuration = v.duration;
        setInterval(() => {
            const v = getVid();
            if (window.location.href !== currVid) {
                currVid = window.location.href;
                normalDuration = v.duration;
            }
            if (document.getElementsByClassName('ytp-skip-ad-button')[0]) {
                document.getElementsByClassName('ytp-skip-ad-button')[0].click();
            }
            if (v.duration < normalDuration) {
                skip();
            }
        }, 200);
    }
)()
