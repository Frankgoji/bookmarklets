javascript:(function() {
    fetch('http://tumblr.com').catch(err=>{alert("cors,https?"+err);throw err;});
    _scroll = function() {
		window.scrollTo(0, document.body.scrollHeight);
    };
    _getBottomTime = function() {
        _links = document.getElementsByClassName('post_permalink');
        _bottomLink = _links[_links.length - 1].href;
        return fetch(_bottomLink)
            .then(data=>data.text())
            .then(data=>Date.parse(data.match(/datePublished":"([^"]*)-05:00"/)[1] + "Z"))
            .catch(err=>{alert("cors,https?"+err);throw err;});
    };
    _time = Date.parse(prompt("Time:"));
    _posts = [];
    _toRemove = [];
    _getToTime = function(reachedTime, origLen) {
        if (document.getElementById('posts').childNodes.length - 2 === origLen) {
            setTimeout(() => _getToTime(reachedTime, origLen), 1000);
            return;
        }
        _toRemove.map(p => p.remove());
        _toRemove.length = 0;
        _getBottomTime().then(date => {
            if (date > _time) {
                _currPosts = [];
                Array.from(document.getElementById('posts').childNodes).map((p, i) => {
                    if (i > 1) {
                        _toRemove.push(p);
                        _currPosts.push(p);
                    }
                });
                _posts.push(_currPosts);
                _scroll();
                _getToTime(false, _currPosts.length);
            } else {
                _top = document.getElementById('new_post_buttons');
                _check = document.createElement('input');
                _check.setAttribute("type", "checkbox");
                _check.id = "advance_check";
                _top.parentNode.insertBefore(_check, _top.nextSibling);
                _advance();
            }
        });
    };
    _advance = function() {
        if (_posts.length === 0) {
            document.getElementById("advance_check").remove();
            return;
        }
        _c = document.getElementById("advance_check");
        if (!_c.checked) {
            setTimeout(_advance, 500);
        } else {
            _c.checked = false;
            Array.from(document.getElementById('posts').childNodes).map((p, i) => {
                if (i > 1) {
                    p.remove();
                }
            });
            _top = document.getElementById('advance_check');
            _toAdd = _posts.pop(_posts.length - 1);
            for (i=_toAdd.length-1; i >=0; i--) {
                _top.parentNode.insertBefore(_toAdd[i], _top.nextSibling);
            }
            _advance();
        }
    };
    _getToTime(false);
}
)()
