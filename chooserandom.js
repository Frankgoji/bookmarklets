// Chooses a random video in a youtube playlist
javascript:(function(){
    _my_script=document.createElement('SCRIPT');
    _my_script.type='text/javascript';
    _my_script.src='https://googledrive.com/host/0B79SR6ca7vCeb0FqTmJKNmVXbDA';
    document.getElementsByTagName('head')[0].appendChild(_my_script);
})();

// This is the script listed in the google drive file
function clickButton() {
    _links = document.getElementsByClassName("pl-video-title-link yt-uix-tile-link yt-uix-sessionlink  spf-link ");
    _link = _links[Math.floor(Math.random() * _links.length)];
    window.location.href = _link.href + "&shuffle=1";
}

var load_button_interval = setInterval(function(){
    _load_more = "yt-uix-button yt-uix-button-size-default yt-uix-button-default load-more-button yt-uix-load-more browse-items-load-more-button";
    _load_button = document.getElementsByClassName(_load_more);
    if (_load_button.length !== 0) {
        _load_button[0].click();
    } else {
        clearInterval(load_button_interval);
        clickButton();
    }
}, 1000);
