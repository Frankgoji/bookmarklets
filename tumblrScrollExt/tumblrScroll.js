var _scroll = function() {
    window.scrollTo(0, document.body.scrollHeight);
};
var _getBottomTime = function() {
    var _links = document.getElementsByClassName('post_permalink');
    var _bottomLink = _links[_links.length - 1].href;
    var _penUltBottomLink = _links[_links.length - 2].href;
    _links = null;
    return _getPostDate(_bottomLink)
        .catch(() => _getPostDate(_penUltBottomLink))
        .catch(err=>{alert("cors,https?"+err);throw err;});
};
var _getPostDate = function(url) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({contentScriptQuery: 'getPostDate', url: url}, date => resolve(date));
    });
};
var _posts = [];
var _getToTime = function(reachedTime, _fromTime, _toTime, origLen) {
    let parentNode = document.getElementById('posts');
    if (parentNode.childNodes.length - 2 === origLen) {
        setTimeout(() => _getToTime(reachedTime, _fromTime, _toTime, origLen), 1000);
        return;
    }
    if (origLen) {
        for (i = 0; i < origLen; i++) {
            parentNode.removeChild(parentNode.childNodes[2]);
        }
    }
    _getBottomTime().then(date => {
        if (date > _fromTime) {
            var _lenCurrPosts = parentNode.childNodes.length - 2;
            if (date < _toTime) {
                let _storedPosts = [];
                for (i = 0; i < _lenCurrPosts; i++) {
                    _storedPosts.push(parentNode.childNodes[i+2]);
                }
                _posts.push(_storedPosts);
            }
            _scroll();
            parentNode = null;
            _getToTime(false, _fromTime, _toTime, _lenCurrPosts);
        } else {
            var _top = document.getElementById('new_post_buttons');
            var _check = document.createElement('input');
            _check.setAttribute("type", "checkbox");
            _check.id = "advance_check";
            _top.parentNode.insertBefore(_check, _top.nextSibling);
            _advance();
        }
    });
};
var _advance = function() {
    if (_posts.length === 0) {
        document.getElementById("advance_check").remove();
        return;
    }
    var _c = document.getElementById("advance_check");
    if (!_c.checked) {
        setTimeout(_advance, 500);
    } else {
        _c.checked = false;
        Array.from(document.getElementById('posts').childNodes).map((p, i) => {
            if (i > 1) {
                p.remove();
            }
        });
        var _top = document.getElementById('advance_check');
        var _lineBreak = document.createElement('hr');
        _top.parentNode.insertBefore(_lineBreak, _top.nextSibling);
        var _toAdd = _posts.pop(_posts.length - 1);
        for (i=_toAdd.length-1; i >=0; i--) {
            _top.parentNode.insertBefore(_toAdd[i], _top.nextSibling);
        }
        _advance();
    }
};
/**
 * Set home button to scroll to top if still advancing.
 */
var _homeOnClick = function() {
    if (_posts.length !== 0) {
        window.scrollTo(0, 0);
        return false;
    }
    return true;
};
chrome.runtime.sendMessage({contentScriptQuery: 'getTimes'}, times => {
    console.log(times);
    document.getElementsByClassName('tab_anchor')[0].onclick = _homeOnClick;
    _getToTime(false, times.startTime, times.endTime);
});
