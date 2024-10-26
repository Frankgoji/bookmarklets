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
            v.currentTime = v.duration;
            document.getElementsByClassName('ytp-skip-ad-button')[0].click();
            await new Promise(r => setTimeout(r, 1000));
        };
        await skip(); await skip();
        await new Promise(r => setTimeout(r, 1000));
        const v = getVid();
        setInterval(() => {
            skip();
        }, 200);
    }
)()
