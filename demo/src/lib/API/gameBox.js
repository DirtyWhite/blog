import Env from './Env';
import share from './gameBoxShare/gameBoxShare'
let plat = 'A';

let isDebug = getQueryString('isDebug') == 1

plat = isDebug ? 'E' : Env.isAndroidGameBox ? 'A' :
    Env.isIosGameBox ? 'I' :
        'E';

let ApiUndefinedHandler

function systemLimit(type) {
    if (Env.isAndroid && type == 'Android') {
        return false;
    } else if (Env.isIos && type == 'IOS') {
        return false;
    } else {
        API.toast('只支持' + type)
        return true;
    }
}

function getQueryString(name) {
    if (typeof window == 'undefined') return;
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

if (typeof window !== "undefined") {
    window.gameBoxAPICache = {};
}

function Exec(funcs, ...params) {
    if (funcs.cache && window.gameBoxAPICache[funcs.cache]) {
        return window.gameBoxAPICache[funcs.cache];
    }
    let funcName = funcs[plat];
    let res;
    try {
        res = funcName();
    } catch (e) {
        console.log(e)
        ApiUndefinedHandler && ApiUndefinedHandler()
    }
    funcs.cache && (window.gameBoxAPICache[funcs.cache] = res);
    return res;
}
class API {
    constructor() {
        if (typeof window == 'undefined') return;
        this.isDebug = isDebug
        this.testScookie = getQueryString('scookie')
        this.testDeviceId = getQueryString('deviceId')
        this.testUdid = getQueryString('udid')
        this.testUid = getQueryString('uid')

        if (Env.isAndroidGameBox) {
            this.doLeaveCallbackLeave();
        }
    }
    setUndefinedHandler = (e => {
        ApiUndefinedHandler = e;
    })
    extend = (name, { A, I, E }) => {
        if (this[name]) throw '该API已经被定义'
        this[name] = () => {
            return Exec({
                A, I, E
            })
        }
    }
    call = (A, I, E) => {
        return Exec({
            A, I, E
        })
    }
    bindEvent = ({ event, callback }) => {
        window.android && android.bindEvent(event, callback)
    }
    //信息获取
    getLoginInfo = () => {
        return this.isDebug
            ? {
                uid: this.testUid || '1429204874',
                nick: '大debug',
                sface: '',
                sex: 0
            }
            : Exec({
                A: () => JSON.parse(login.onLoadUserInfo()),
                I: () => onJsLoadUserInfo(),
                cache: 'getLoginInfo'
            })
    }
    getScookie = () => {
        return this.isDebug
            ? this.testScookie
            : Exec({
                A: () => login.onLoadCookieForJs(),
                I: () => onJsLoadCookieForJs(),
                cache: 'getScookie'
            })
    }
    getUdid = () => {
        return this.isDebug
            ? this.testUdid
            : Exec({
                A: () => android.getUniqueId(),
                I: () => onJsGetMUDID(),
                cache: 'getUdid'
            })
    }
    getDeviceId = () => {
        return this.isDebug
            ? this.testDeviceId || ('test' + new Date().getTime())
            : Exec({
                A: () => android.onJsGetDeviceId(),
                I: () => onJsGetDeviceId(),
                cache: 'getDeviceId'
            })
    }
    getInstalledGames = () => {
        return Exec({
            A: () => android.installedGames(),
            I: () => systemLimit('android')
        })
    }
    getIsGameInstalled = (packagesStr) => {
        return Exec({
            A: () => android.isGameInstalled(packagesStr),
            I: () => systemLimit('android')
        })
    }
    getUid() {
        return Exec({
            A: () => android.onJsGetPtUid(),
            I: () => {
                return this.getLoginInfo().uid
            },
            cache: 'getUid'
        })
    }
    getAppStatus(packages) {
        return new Promise(resolve => {
            let donwloadAPI = window.donwloadAPI || window.android;
            downloadAPI.getAppStatus(packages, "apiGetAppStatus");
            window.apiGetAppStatus = status => {
                let state = [];
                for (let i in status) {
                    let cur = status[i];
                    state.push({
                        packageName: cur.packageName,
                        status: cur.status,
                        explain:
                            cur.status == 0 ? '' :
                                cur.status == 100 ? '下载中' :
                                    cur.status == 101 ? '暂停' :
                                        cur.status == 102 ? '等待中' :
                                            cur.status == 103 ? '下载完成待安装' :
                                                cur.status == 201 ? '安装完成' : '',
                        shownTitle:
                            cur.status == 0 ? '' :
                                cur.status == 100 ? '下载中' :
                                    cur.status == 101 ? '继续' :
                                        cur.status == 102 ? '等待中' :
                                            cur.status == 103 ? '安装' :
                                                cur.status == 201 ? '开始玩' : '',
                    })
                }
                resolve(state);
            };
        })
    }
    getVersion() {
        var str = global.navigator.userAgent.toLowerCase();
        var indexStr = '4399gamecenter/';
        var result = str.indexOf(indexStr);
        var startIndex = indexStr.length + result;
        var version = str.substring(startIndex, startIndex + 3);
        var num = parseInt(str.substring(startIndex, startIndex + 7).split('.').join(''));

        const ua = navigator.userAgent.split(';');
        let curVer = parseFloat(ua[ua.length - 2]);
        if (isNaN(curVer)) {
            curVer = parseFloat(ua[ua.length - 1]);
        }

        return { version: num, versioncode: curVer };
    }
    watchAppDownloadStatus() {
        //单例
        if (window.dlUpdator) return window.dlUpdator;
        let updator = window.dlUpdator || {
            active: true,//是否监听
            downloadState: {},//维持下载状态的对象
            get: (packageName) => {//根据包名获取下载状态
                return updator.downloadState[packageName]
            },
            watch: (callback) => {//监听的回调
                callback(updator.downloadState)
            }
        };
        let downloadAPI = window.donwloadAPI || window.android;
        window.apiDlCallback = status => {
            if (!updator.active) return;
            for (let i in status) {
                let cur = status[i];
                let packageName = cur.packageName
                let currentState = {
                    packageName: cur.packageName,
                    status: cur.status,
                    explain:
                        cur.status == 0 ? '' :
                            cur.status == 100 ? '下载中' :
                                cur.status == 101 ? '暂停' :
                                    cur.status == 102 ? '等待中' :
                                        cur.status == 103 ? '下载完成待安装' :
                                            cur.status == 201 ? '安装完成' : '',
                    shownTitle:
                        cur.status == 0 ? '' :
                            cur.status == 100 ? '下载中' :
                                cur.status == 101 ? '继续' :
                                    cur.status == 102 ? '等待中' :
                                        cur.status == 103 ? '安装' :
                                            cur.status == 201 ? '开始玩' : '',
                }
                updator.downloadState[packageName] = currentState
            }
            updator.watch();
        }
        downloadAPI.bindEvent('download', 'apiDlCallback');
        window.dlUpdator = updator;
        return updator
    }
    //功能
    doCheckLogin() {
        let scookie = this.getScookie();
        if (!scookie) {
            this.jumpLogin();
            return false;
        } else {
            return scookie;
        }
    }
    doCopy = (text = '测试文案', toastText = '测试复制成功', outer) => {
        return Exec({
            A: () => android.onCopyToClipboard(text, toastText),
            I: () => onJsCopyToClipboard(text, toastText),
            E: () => { outer && outer(text, toastText) }
        })
    }
    doToast = (message = '测试toast', outer) => {
        return Exec({
            A: () => android.onJsToShowToast(message),
            I: () => onJsToast(message),
            E: () => { outer && outer(message) }
        })
    }
    doPlayVideo = (title = '测试视频', url = 'http://www.4399.com') => {
        return Exec({
            A: () => android.playVideo(title, url),
            I: () => onJsPlayVideo(title, url)
        })
    }
    doClose = () => {
        return Exec({
            A: () => android.finishActivity(),
            I: () => systemLimit('android')
        })
    }
    doLaunchApp = (pkgName) => {
        return Exec({
            A: () => downloadAPI.launchApp(String(pkgName)),
        })
    }
    downloadApp({ downloadUrl, packageName, appName, icoPath, fileMD5 }) {
        let downloadAPI = window.downloadAPI || window.android;
        downloadAPI.downloadApp(JSON.stringify({ downloadUrl, packageName, appName, icoPath, fileMD5 }))
    }
    updateApp(detail) {
        if (window.android && android.exceFunc) {
            android.exceFunc("onDownloadStart", JSON.stringify(detail));
        }
    }
    doPageCallbackOnce = (key = '', callback) => {
        window.apiPageCallbackKey = key;
        let callbackKey = "apiPageCallback"
        this.bindEvent({
            event: 'resume',
            callback: callbackKey
        });

        return new Promise((resolve) => {
            window[callbackKey] = () => {
                window[callbackKey] = () => { }
                if (window.apiPageCallbackKey !== key) return;
                typeof callback == 'function' && callback();
                resolve();
            }
        })
    }
    doLeaveCallbackLeave = (obj) => {
        let apiKey = "apiLeaveCallbackKey";
        if (!obj) {
            let obj = localStorage.getItem(apiKey);

            obj = JSON.parse(obj);
            if (obj) {
                let event = document.createEvent('HTMLEvents');
                let caught = () => {
                    localStorage.removeItem(apiKey)
                }
                event.data = obj;
                event.caught = caught;
                event.initEvent("triggerPageLeaveCallback", false, false);
                setTimeout(e => {
                    document.dispatchEvent(event);
                }, 1000);
            }

        } else {
            let str = JSON.stringify(obj);
            localStorage.setItem(apiKey, str);
        }

    }
    doSavePic = (base64) => {
        return Exec({
            A: () => android.savePic(base64),
            I: () => systemLimit('android')
        })
    }
    doOpenWebview(url) {
        return Exec({
            A: () => android.openWeb(url),
            I: () => jumpToActivityDetails('', url)
        })
    }

    //跳转
    jumpRecharge(hid) {
        return Exec({
            A: () => android.openHebiRecharge(`{source_type:huodong,source_id:${hid}}`),
            I: () => systemLimit('android'),
            E: () => { console.log('充值SDK') }
        })
    }
    jumpLogin() {
        return Exec({
            A: () => android.onJSClickLogin(),
            I: () => systemLimit('android'),
            E: () => { console.log('去登录') }
        })
    }
    jumpWallet() {
        return Exec({
            A: () => android.openWallet(),
            I: () => jumpToHomePage('indexDianle'),
            E: () => { console.log('去钱包') }
        })
    }
    jumpNewGame() {
        return Exec({
            A: () => android.jumpToNewGame(),
            I: () => jumpToHomePage('indexNewGame'),
            E: () => { console.log('新游页') }
        })
    }
    jumpToGameDetail(id = '36227', index = 0) {
        return Exec({
            A: () => android.jumpToGameDetailWithIndex(id, index),
            I: () => jumpToGameDetails(id),
            E: () => { console.log('游戏详情页') }
        })
    }
    jumpPersonalPage(id = '1665445583') {
        return Exec({
            A: () => android.onJsToProfileDetailsByPtUid(String(id)),
            I: () => jumpToProfileDetailsByPtUid(id),
            E: () => { console.log('个人中心页' + id) }
        })
    }
    //todo:几个论坛的api先跳过
    jumpEarnHebi() {
        return Exec({
            A: () => android.onJsToPlayGameEarnHebi(),
            I: () => jumpToDownApp(),
            E: () => { console.log('试玩赚盒币') }
        })
    }
    jumpActivity(id, url) {
        return Exec({
            A: () => android.onJsToActivityDetails(id, url),
            I: () => jumpToActivityDetails(id, url),
            E: () => location.href = url + `?id=${id}`,
        })
    }
    jumpFeed() {
        return Exec({
            A: () => android.onJsToFeedBack(),
            I: () => jumpToFeedBack(),
            E: () => console.log('去反馈')
        })
    }
    jumpHebiRecord() {
        return Exec({
            A: () => android.onJsToBoxCoinRecord(),
            I: () => onJsToBoxCoinRecord(),
            E: () => console.log('盒币使用记录')
        })
    }
    jumpDailySign() {
        return Exec({
            A: () => android.onJsToDailySign(),
            I: () => jumpToDailySign(),
            E: () => console.log('每日签到')
        })
    }
    jumpZoneTopic(id) {
        return Exec({
            A: () => android.onJsToTodayTopic(id),
            I: () => jumpToDailySign(),
            E: () => console.log('每日签到')
        })
    }
    jumpNewFunc() {
        return Exec({
            A: () => android.onJsToTodayTopic(id),
            I: () => systemLimit('android'),
            E: () => console.log('新功能介绍')
        })
    }
    jumpSetContact() {
        return Exec({
            A: () => android.onJsSetExtensionInfo(JSON.stringify({ extType: 'contact' })),
            I: () => jumpToEditAddressInfo(),
            E: () => console.log('设置收货信息')
        })
    }
    jumpShop() {
        return Exec({
            A: () => android.jumpToShop(),
            I: () => jumpToShop(),
            E: () => console.log('跳转商店')
        })
    }
    jumpShopTab(tabIndex) {
        return Exec({
            A: () => android.jumpToShopTab(tabIndex),
            I: () => jumpToShop(),
            E: () => console.log('跳转商店')
        })
    }
    jumpGoodsDetail(id = 5) {
        return Exec({
            A: () => android.jumpToGoodsDetail(id),
            I: () => jumpToNewsVideoDetail(String(id)),
            E: () => console.log('跳转商品详情')
        })
    }
    jumpAddFeed(text = null) {
        return Exec({
            A: () => android.jumpToAddFeed(text),
            I: () => systemLimit('android'),
            E: () => console.log('跳转动态')
        })
    }
    jumpMyZone() {
        return Exec({
            A: () => android.jumpToMyZone(),
            I: () => systemLimit('android'),
            E: () => console.log('跳转我的动态')
        })
    }
    jumpMy() {
        return Exec({
            A: () => android.jumpToMy(),
            I: () => jumpToHomePage("indexMy"),
            E: () => console.log('跳转我的动态')
        })
    }
    jumpLiveList() {
        return Exec({
            A: () => {
                if (this.isRequiredVersion(3800)) {
                    android.openLiveCategory('all', '');
                } else {
                    android.openLiveCategory('0', '');
                }
            },
            I: () => systemLimit('android'),
            E: () => console.log('跳转所有直播')
        })
    }
    jumpRoom(roomId) {
        return Exec({
            A: () => android.playLiveTv(roomId),
            I: () => systemLimit('android'),
            E: () => console.log('跳转直播间id' + roomId)
        })
    }
    jumpForumsDetails(forumsId) {
        return Exec({
            A: () => android.onJsToForumsDetails(String(forumsId)),
            I: () => systemLimit('android'),
            E: () => console.log('跳转游戏圈论坛详情,id:' + forumsId)
        })
    }
    jumpForumsTopic(tid, id) {
        return Exec({
            A: () => android.onJsToForumsTopic(String(tid), String(id), 0),
            I: () => systemLimit('android'),
            E: () => console.log('跳转游戏圈论坛详情,id:' + forumsId)
        })
    }
    jumpHubDetail(quanId, tab) {
        return Exec({
            A: () => android.openHubDetail(`{"quan_id": ${quanId}, "tab": ${tab}}`),
            I: () => systemLimit('android'),
            E: () => console.log('跳转圈子详情,id:' + quanId + ",tab:" + tab)
        })
    }
    jumpGameHubAdd(title, content, gamehubId, forumId, kindID) {
        return Exec({
            A: () => android.jumpToGameHubAdd(String(title), String(content), String(gamehubId), String(forumId), String(kindID)),
            I: () => systemLimit('android'),
            E: () => console.log('跳转游戏圈发帖')
        })
    }
    jumpGiftDetail(giftId) {
        return Exec({
            A: () => android.onJsToGiftDetails(String(giftId)),
            I: () => systemLimit('android'),
            E: () => console.log('跳转礼包id:' + giftId)
        })
    }
    jumpHomeTagDetail(tagName) {
        return Exec({
            A: () => android.onJsToTagDetail(String(tagName)),
            I: () => systemLimit('android'),
            E: () => console.log('跳转找游戏推荐标签' + tagName)
        })
    }
    jumpActivityList(id, type) {
        return Exec({
            A: () => android.onJsToActivityList(+id, +type),
            I: () => systemLimit('android'),
            E: () => console.log('跳转活动列表')
        })
    }
    jumpDianle() {
        return Exec({
            A: () => android.onJsToDianle(),
            E: () => console.log('跳转赚零花钱')
        })
    }
    jumpQuan() {
        return Exec({
            A: () => android.jumpToHomePage('indexHubQauna'),
            E: () => console.log('跳转游戏圈-圈子')
        })
    }
    jumpBooking() {
        return Exec({
            A: () => android.toReserveArea(),
            E: () => console.log('跳转预约专区')
        })
    }
    jumpShopDressUp() {
        return Exec({
            A: () => android.jumpToShopDressUp(),
            E: () => console.log('跳转装扮页')
        })
    }
    jumpMiniGame() {
        return Exec({
            A: () => android.openMiniGame("{\"router\":\"minigame/collection\",\"params\":{},\"entrance\":\"广场小游戏模块标题\"}"),
            E: () => console.log('跳转小游戏集合页')
        })
    }


    //状态判定

    isRequiredVersion(requiredVersion) {
        if (String(requiredVersion).length != 4) {
            throw '版本号需要为4位数字，如3.8为 3800'
        }
        let ver = this.getVersion()
        let version = ver.version;
        return version >= requiredVersion
    }
    isRequiredVersioncode(requiredVersionCode) {
        if (String(requiredVersionCode).length != 4) {
            throw '版本号需要为4位数字，如3.8为 3800'
        }
        let ver = this.getVersion()
        let code = ver.version;
        return code >= requiredVersionCode
    }

    //分享
    share = share
}

export default new API();