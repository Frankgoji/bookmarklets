javascript: (() => {
    const pandoraMuteUntil = () => {
        const clickMuteButton = () => {
            document.getElementsByClassName('VolumeDurationControl__VolumeIconContainer')[0].click();
        };
        const getSongTitle = () => {
            const checkAdOverlay = document.getElementsByClassName('Video__Top__Message')[0];
            if (checkAdOverlay && checkAdOverlay.innerText === 'Advertisement') {
                return 'ADPLAYED';
            }
            let currSong = document.getElementsByClassName('Marquee__wrapper__content')[0];
            currSong = (currSong) ? currSong : document.getElementsByClassName('Marquee__wrapper__content__child')[0];
            return (currSong && currSong.innerText && currSong.innerText !== 'Your station will be right back.') ? currSong.innerText : 'ADPLAYED';
        };
        console.log('first click mute');
        clickMuteButton();
        _currSongTitle = getSongTitle();
        console.log('curr song is: ' + _currSongTitle);
        _intervalId = setInterval(function() {
            console.log(`checking (interval ID ${_intervalId})`);
            _checkSongTitle = getSongTitle();
            console.log(_checkSongTitle);
            if (_currSongTitle !== _checkSongTitle) {
                console.log('should click mute');
                setTimeout(clickMuteButton, 1000);
                clearInterval(_intervalId);
            }
        }, 1000);
    };
    const spotifyMuteUntil = () => {
        const clickMuteButton = (isMute) => {
            const label = isMute ? 'Mute' : 'Unmute';
            document.querySelector(`button[aria-label = "${label}"]`).click();
        };
        let muted = false;

        const intervalId = setInterval(() => {
            if (document.title.includes('Advertisement') && !muted) {
                clickMuteButton(true);
                muted = true;
            } else if (!document.title.includes('Advertisement') && muted) {
                clickMuteButton(false);
                muted = false;
            }
        }, 1000);
    };

    /* Main */
    if (document.URL.includes('pandora')) {
        pandoraMuteUntil();
    } else if (document.URL.includes('spotify')) {
        spotifyMuteUntil();
    }
})();
