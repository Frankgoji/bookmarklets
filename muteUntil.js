javascript: (function() {
    document.getElementsByClassName('VolumeDurationControl__VolumeIconContainer')[0].click();
    _currSong = document.getElementsByClassName('Marquee__wrapper__content')[0];
    _currSongTitle = (_currSong) ? _currSong.innerText : 'ADPLAYED';
    _intervalId = setInterval(function() {
        _checkSongTitle = document.getElementsByClassName('Marquee__wrapper__content')[0];
        if (_checkSongTitle && _currSongTitle !== _checkSongTitle.innerText) {
            clearInterval(_intervalId);
            document.getElementsByClassName('VolumeDurationControl__VolumeIconContainer')[0].click();
        }
    }, 1000);
})();
