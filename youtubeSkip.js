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
