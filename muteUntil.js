javascript: (function() {
    var clickMuteButton = function() {
        document.getElementsByClassName('VolumeDurationControl__VolumeIconContainer')[0].click();
    };
    var getSongTitle = function() {
        let checkAdOverlay = document.getElementsByClassName('Video__Top__Message')[0];
        if (checkAdOverlay && checkAdOverlay.innerText === 'Advertisement') {
            return 'ADPLAYED';
        }
        let currSong = document.getElementsByClassName('Marquee__wrapper__content')[0];
        currSong = (currSong) ? currSong : document.getElementsByClassName('Marquee__wrapper__content__child')[0];
        return (currSong) ? currSong.innerText : 'ADPLAYED';
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
            clickMuteButton();
            clearInterval(_intervalId);
        }
    }, 1000);
})();
