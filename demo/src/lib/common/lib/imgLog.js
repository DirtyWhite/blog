/**
 * 
 */
var imgLog = function() {
    var unique = (function() {
        var time = (new Date()).getTime() + '_',
            i = 0;
        return function() {
            return time + (i++);
        }
    })();
    var _run = function(url) {
        var data = window['imgLogData'] || (window['imgLogData'] = {});
        var img = new Image();
        var uid = unique();
        //销毁一些对象
        img.onload = img.onerror = function() {
            img.onload = img.onerror = null;
            img = null;
            delete data[uid];
        };
        img.src = url + '&_cache=' + uid;
    };
    return {
        run: _run
    }
}();
export default imgLog;