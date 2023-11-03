// Copy below for basically a youtube skip button
javascript: (
    () => {
        try {
            document.getElementsByClassName('ytp-ad-skip-button')[0].click();
        } catch {
            const v = document.querySelector('video');
            v.currentTime = v.duration;
            document.getElementsByClassName('ytp-ad-skip-button')[0].click();
        }
    }
)()

// Copy below for something that will skip for basically the whole video
javascript: (
    async () => {
        try {
            document.getElementsByClassName('ytp-ad-skip-button')[0].click();
        } catch {
            const v = document.querySelector('video');
            if (v.duration < 60) {
                v.currentTime = v.duration;
                document.getElementsByClassName('ytp-ad-skip-button')[0].click();
            }
        }
        await new Promise(r => setTimeout(r, 1000));
        const v = document.querySelector('video');
        const normalDuration = v.duration;
        setInterval(() => {
            const v = document.querySelector('video');
            if (v.duration < normalDuration) {
                try {
                    document.getElementsByClassName('ytp-ad-skip-button')[0].click();
                } catch {
                    const v = document.querySelector('video');
                    v.currentTime = v.duration;
                    document.getElementsByClassName('ytp-ad-skip-button')[0].click();
                }
            }
        }, 200);
    }
)()
