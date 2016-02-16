// Chooses a random video in a youtube playlist
javascript:(function(){
    _my_script=document.createElement('SCRIPT');
    _my_script.type='text/javascript';
    _my_script.src='https://googledrive.com/host/0B79SR6ca7vCedFFteGhpSjhqcDg';
    document.getElementsByTagName('head')[0].appendChild(_my_script);
})();

// This is the script listed in the google drive file
function clickButton() {
    clickLoad();
    _links = document.getElementsByClassName("pl-video-title-link yt-uix-tile-link yt-uix-sessionlink  spf-link ");
    _link = _links[Math.floor(Math.random() * _links.length)];
    window.location.href = _link.href;
    _shuffle = document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-player-controls yt-uix-button-empty yt-uix-button-has-icon shuffle-playlist yt-uix-button-opacity yt-uix-tooltip yt-uix-tooltip");
    setTimeOut(function(){_shuffle[0].click();}, 2000);
}

function clickLoad() {
    _load_more = "yt-uix-button yt-uix-button-size-default yt-uix-button-default load-more-button yt-uix-load-more browse-items-load-more-button";
    _load_button = document.getElementsByClassName(_load_more)
    if (_load_button.length != 0) {
        _load_button[0].click();
        setTimeOut(clickLoad, 1000);
    }
}

clickButton();

// Also make sure to click the "Load" button at the bottom of the screen to make
// sure the whole playlist has been loaded
// include a line that has the browser click the shuffle button on the playlist
