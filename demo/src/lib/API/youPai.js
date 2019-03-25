import Env from './Env';

function systemLimit(type) {
    if (Env.isAndroid && type == 'Android') {
        return false;
    } else if (Env.isIos && type == 'IOS') {
        return false;
    } else {
        alert('只支持' + type)
        return true;
    }
}

if (typeof window !== "undefined") {
    window.ypApiCache = {};
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

let promise = function ({ protocol, cb, cache }, param) {
    if (cache && window.ypApiCache[protocol]) {
        return Promise.resolve(window.ypApiCache[protocol]);
    }
    return new Promise(async res => {
        await new Promise(resolve => {//连续调用api时，若未被缓存，则延迟执行，防止客户端block
            setTimeout(function () {
                resolve();
            }, 200)
        });
        if (!Env.isYouPai) {
            console.log("执行协议：" + protocol)
            console.log("参数：" + param)
            res();
            return;
        }
        let url = protocol + serialize(param);
        location.href = url;
        if (!cb) {
            res();
            return;
        }
        window[cb] = function () {
            cache && (window.ypApiCache[protocol] = arguments);
            res(arguments);
        }
    })
}

/**
 * 
 * 序列化参数
 * IOS若无参数，不可在协议后拼接?
 * @param {Object} obj 
 * @returns string
 */
let serialize = function (obj) {
    if (!obj) return '';
    let str = '?';
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            str += `${i}=${obj[i]}&`
        }
    }
    return str;
}

class API {
    testScookie = '';
    testDeviecId = '';
    testVersion = '';
    isDebug = false;
    constructor() {
        if (typeof window == 'undefined') return;
        this.isDebug = getQueryString('isDebug') == 1
        this.testScookie = getQueryString('scookie')
        this.testDeviecId = getQueryString('deviceId')
        this.testVersion = getQueryString('version')
    }

    //getMethods
    getDeviceId() {
        return this.isDebug
            ? Promise.resolve(this.testDeviecId)
            : promise({
                protocol: "protocol://getDeviceID",
                cb: "setDeviceID",
                cache: true
            }).then(res => {
                return res ? res[0] : null
            })
    }

    getLoginInfo() {
        return this.isDebug
            ? Promise.resolve({
                cookie: this.testScookie,
                uid: '1',
                nick: '小debug',
                sface: ''
            })
            : promise({
                protocol: "protocol://setLoginInfo",
                cb: "setLoginInfo",
                cache: false
            }).then(res => {
                //2.4.2版本未登录时返回 {0:"",1:"",2:"",3:"",4:"",5:"0"}
                if (!res || (!res[0] && !res[1])) {
                    return false;
                }
                let loginInfo = {
                    cookie: res[0] + "|" + res[1],
                    uid: res[2],
                    nick: res[3],
                    sface: res[4]
                }
                return loginInfo;
            })
    }

    getVersion() {
        return this.isDebug
            ? Promise.resolve(this.testVersion)
            : promise({
                protocol: "protocol://getVersion",
                cb: 'setVersion',
                cache: true
            }).then(res => {
                let result = res ? res[0] : null
                return result
            })
    }

    //doMethods
    doCheckLogin() {
        return new Promise(async res => {
            let loginInfo = await this.getLoginInfo();
            if (loginInfo) {
                res(loginInfo);
            } else {
                this.jumpLogin();
            }
        })
    }

    doPlayVideoDirectly(url = "测试名", title = "测试地址") {
        window.ClientAPI.onJsPlayVideo(String(title), String(url))
    }

    doPlayVideo(
        id = "215801",
        title = "陈子豪：艰难的战斗",
        videoSrc = "http://sj.video.5054399.com/sjyx/youpaiyunyingshiping1/czhjndzd.mp4",
        pic = "http://t1.sj.img4399.com:8089/test_ma/ma~1_20150518102327_55594d1f8e44b.jpeg",
        type = "电脑游戏"
    ) {
        return promise({
            protocol: 'protocol://toPlayVideo'
        }, { id, title, videoSrc, pic, type })
    }

    doToast(msg = "默认信息", yourToast) {
        if (Env.isAndroidYoupai) {
            window.ClientAPI.onJsToast(msg);
        } else if (Env.isIosYoupai) {
            let dic = { 'handlerInterface': 'Native', 'function': 'onJsToast', 'parameters': { 'msg': msg } };
            window.webkit.messageHandlers['Native'].postMessage(dic);
        } else {
            typeof yourToast == 'function' && yourToast(msg);
        }
    }

    doCloseWebView() {
        return promise({
            protocol: "protocol://toClose"
        })
    }

    doCheckUpdate() {
        return promise({
            protocol: 'protocol://toCheckver'
        })
    }

    doOpenShare() {
        return promise({
            protocol: 'protocol://toShare',
            cb: 'setShareResult'
        })
    }

    doCustomShare(
        title = '自定义分享标题',
        content = '自定义分享内容',
        iconUrl = '',
        redirectUrl = ''
    ) {
        iconUrl = encodeURIComponent(iconUrl);
        redirectUrl = encodeURIComponent(redirectUrl);
        return promise({
            protocol: 'protocol://toCustomShare',
            cb: 'setShareResult'
        }, { title, content, iconUrl, redirectUrl })
    }

    doListenShake(operate = 1) {
        return promise({
            protocol: "protocol://toShake",
            cb: "setShake"
        }, { operate })
    }

    doCopy(content) {
        return promise({
            protocol: "protocol://setClipboard",
            cb: 'setClipboard'
        }, { content })
    }

    doSavePic(name, base64) {
        name = encodeURIComponent(name)
        base64 = encodeURIComponent(base64)
        return promise({
            protocol: "protocol://toSavePicture"
        }, { name, url: base64 })
    }
    doSharePic(base64) {
        let url = encodeURIComponent(base64)
        return promise({
            protocol: "protocol://toSharePicture",
            cb: 'setShareResult'
        }, { url })
    }
    doBind() {
        return promise({
            protocol: 'protocol://toBindAccount',
            cb: "setBindSuccess"
        })
    }
    doBindMobile() {
        return promise({
            protocol: 'protocol://toBindMobile',
            cb: "setBindMobileSuccess"
        })
    }
    doSetTitle(title) {
        return promise({
            protocol: "protocol://setTitle"
        }, { title })
    }
    doCheckAppInstalled(packageName) {
        return promise({
            protocol: "protocol://checkAPP",
            cb: "checkAPPResult"
        }, { packageName }).then(res => {
            return res !== "0"
        })
    }

    //jumpMethods
    jumpLogin() {
        return promise({
            protocol: "protocol://toLogin",
            cb: "setLoginInfo"
        })
    }

    jumpHotVideo(id = "342") {
        if (systemLimit('Android')) return;
        return promise({
            protocol: 'protocol://toVideoCategory'
        }, { id })
    }

    jumpVideoCollection(id = "253", name = "集合名称") {
        return promise({
            protocol: 'protocol://toVideoCollection'
        }, { id, name })
    }
    jumpVideoCategory(id = "75") {
        return promise({
            protocol: 'protocol://toVideoCategory'
        }, { id })
    }

    jumpUploadVideo(channel = "huodong") {
        return promise({
            protocol: 'protocol://uploadVideo'
        }, { channel })
    }

    jumpFeedBack() {
        return promise({
            protocol: 'protocol://toFeedback'
        })
    }

    jumpSearch(keyword = "默认关键词") {
        return promise({
            protocol: 'protocol://search'
        }, { keyword })
    }

    jumpOpenLive() {
        return promise({
            protocol: "protocol://toOpenLive"
        })
    }

    jumpPersonalPage(id = '0') {
        return promise({
            protocol: "protocol://toPersonalPage"
        }, { id })
    }

    jumpLiveList(id = 1, type = 1, name = "推荐直播") {
        return promise({
            protocol: "protocol://toLiveList"
        }, { id, type, name })
    }

    jumpRecharge(type = 0) { // 页面类型：0充值页（充值首页），1充值页子页（立即充值页，选择充值金额），缺省值为0
        return promise({
            protocol: "protocol://toRecharge"
        }, { type })
    }

    jumpRoom(id = '1') {
        return promise({
            protocol: "protocol://toMobileLive"
        }, { id })
    }

    //isMethods
    isRequiredVersion = async (android, ios) => {
        if (!Env.isYouPai) return true;
        let version = await this.getVersion();
        let ver = String(version);
        ver = ver.split('.').join("");
        let result;
        if (ver.length <= 3) {
            result = ver.slice(0, 2) + '0' + ver[2];
        } else {
            result = ver.split;
        }
        function normolize(str) {
            return parseInt(str.split('.').join(""));
        }
        if (Env.isIosYoupai) {
            return ver >= normolize(ios);
        } else if (Env.isAndroidYoupai) {
            return ver >= normolize(android);
        } else {
            return true;
        }
    }

}

export default new API();