// Copy below for basically a youtube skip button
javascript: (
    () => {
        try {
            document.getElementsByClassName('ytp-ad-skip-button-modern')[0].click();
        } catch {
            const v = document.querySelector('video');
            v.currentTime = v.duration;
            document.getElementsByClassName('ytp-ad-skip-button-modern')[0].click();
        }
    }
)()

// Copy below for something that will skip for basically the whole video
javascript: (
    async () => {
        const skip = async () => {
            if (!document.querySelector('.ytp-ad-text')) {
                return;
            }
            try {
                document.getElementsByClassName('ytp-ad-skip-button-modern')[0].click();
            } catch {
                const v = document.querySelector('video');
                if (v.duration < 60) {
                    v.currentTime = v.duration;
                    document.getElementsByClassName('ytp-ad-skip-button-modern')[0].click();
                }
            }
            await new Promise(r => setTimeout(r, 1000));
        };
        await skip(); await skip();
        await new Promise(r => setTimeout(r, 1000));
        const v = document.querySelector('video');
        var currVid = window.location.href;
        var normalDuration = v.duration;
        setInterval(() => {
            const v = document.querySelector('video');
            if (window.location.href !== currVid) {
                currVid = window.location.href;
                normalDuration = v.duration;
            }
            if (document.getElementsByClassName('ytp-ad-skip-button-modern')[0]) {
                document.getElementsByClassName('ytp-ad-skip-button-modern')[0].click();
            }
            if (v.duration < normalDuration) {
                skip();
            }
        }, 200);
    }
)()
