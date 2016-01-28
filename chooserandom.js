// Chooses a random video in a youtube playlist
javascript:(function(){
    _my_script=document.createElement('SCRIPT');
    _my_script.type='text/javascript';
    _my_script.src='https://googledrive.com/host/0B79SR6ca7vCedFFteGhpSjhqcDg';
    document.getElementsByTagName('head')[0].appendChild(_my_script);
})();

// This is the script listed in the google drive file
function clickButton() {
    _links = document.getElementsByClassName("pl-video-title-link yt-uix-tile-link yt-uix-sessionlink  spf-link ");
    _link = _links[Math.floor(Math.random() * _links.length)];
    window.location.href = _link.href;
}

clickButton();

// include a line that has the browser click the shuffle button on the playlist
