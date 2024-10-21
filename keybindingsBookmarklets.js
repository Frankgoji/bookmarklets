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
        };
        document.onkeydown = rmTop;
    }
)()

// Copy below for adding a keybinding to ~ to auto-click Add to Queue
javascript: (
    () => {
        const addToQueue = async (e) => {
            if (e.key !== "~") {
                return
            }
            document.querySelector('button[aria-label = "Open post state options"]').click();
            await new Promise(r => setTimeout(r, 250));
            document.querySelectorAll('div[role = "group"] li')[1].click();
            await new Promise(r => setTimeout(r, 250));
            document.querySelector('button[aria-label = "Open post state options"]').parentNode.parentNode.parentNode.querySelector('button').click();
        };
        document.onkeydown = addToQueue;
    }
)()
