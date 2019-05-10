javascript: (function() {
    document.getElementsByClassName('VolumeDurationControl__VolumeIconContainer')[0].click();
    _currSong = document.getElementsByClassName('Marquee__wrapper__content')[0];
    _currSong = (_currSong) ? _currSong : document.getElementsByClassName('Marquee__wrapper__content__child')[0];
    _currSongTitle = (_currSong) ? _currSong.innerText : 'ADPLAYED';
    console.log('curr song is: ' + _currSongTitle);
    _intervalId = setInterval(function() {
        console.log('checking');
        _checkSongTitle = document.getElementsByClassName('Marquee__wrapper__content')[0];
        _checkSongTitle = (_checkSongTitle) ? _checkSongTitle : document.getElementsByClassName('Marquee__wrapper__content__child')[0];
        console.log(_checkSongTitle);
        if (_checkSongTitle && _currSongTitle !== _checkSongTitle.innerText) {
            console.log('should mute');
            document.getElementsByClassName('VolumeDurationControl__VolumeIconContainer')[0].click();
            clearInterval(_intervalId);
        }
    }, 1000);
})();
