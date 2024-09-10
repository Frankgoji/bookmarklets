// Copy below for adding a keybinding to 'd' to delete top of Watch Later queue
javascript: (
    () => {
        const rmTop = async (e) => {
            if (e.key !== 'd') {
                return
            }
            document.querySelector('#contents ytd-playlist-video-renderer button').click();
            await new Promise(r => setTimeout(r, 1000));
            document.querySelectorAll('tp-yt-paper-listbox ytd-menu-service-item-renderer')[2].click();
        }
        document.onkeydown = rmTop;
    }
)()
