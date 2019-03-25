import Env from './Env';

let plat = 'A';

let isDebug = getQueryString('isDebug') == 1

plat = isDebug ? 'E' : Env.isAndroidTuer ? 'A' :
    Env.isIosTuer ? 'I' :
        'E';

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
    window.tuerAPICache = {};
}

function Exec(funcs, ...params) {
    if (funcs.cache && window.tuerAPICache[funcs.cache]) {
        return window.tuerAPICache[funcs.cache];
    }
    let funcName = funcs[plat];
    let res = funcName && funcName();
    funcs.cache && (window.tuerAPICache[funcs.cache] = res);
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
                mPauth: this.testScookie
            }
            : Exec({
                A: () => {
                    let res = tuerStoryAPI.isLogin()
                    if (res) {
                        let result = {};
                        let loginInfo = JSON.parse(res)[0].userJson
                        loginInfo = loginInfo.slice(1, loginInfo.length - 2)
                        let Arr = loginInfo.split(',')

                        Arr.map(el => {
                            let obj = el.split('=');
                            let val = obj[1];
                            val = val.replace(/'/g, "");
                            result[obj[0].trim()] = val
                        })
                        return result;
                    } else {
                        return false;
                    }
                },
                I: () => { },
                cache: 'getLoginInfo'
            })
    }
    getDeviceId() {
        return this.isDebug
            ? this.testDeviceId : Exec({
                A: () => tuerStoryAPI.getDeviceId(),
                I: () => { },
                cache: 'getDeviceId'
            })
    }
    getUdid() {
        return this.isDebug
            ? this.testUdid : Exec({
                A: () => tuerStoryAPI.getUdid(),
                I: () => { },
                cache: 'getUdid'
            })
    }
    //功能
    doCheckLogin() {
        let scookie = this.getLoginInfo();
        if (!scookie) {
            this.jumpLogin();
            return false;
        } else {
            return scookie;
        }
    }
    doShare(title, des, url, iconUrl) {
        return Exec({
            A: () => tuerStoryAPI.callShareToSocial(title, des, url, iconUrl),
            I: () => { },
            E: () => {
                console.log('调用分享')
            }
        })
    }
    doToast(txt) {
        return Exec({
            A: () => tuerStoryAPI.showToast(txt),
            I: () => { },
            E: () => {
                console.log('调用toast：' + txt)
            }
        })
    }
    doUpdate() {
        return Exec({
            A: () => tuerStoryAPI.checkUpdate(),
            I: () => { },
            E: () => {
                console.log('更新')
            }
        })
    }

    //跳转
    jumpLogin() {
        return Exec({
            A: () => tuerStoryAPI.openLogin(),
            I: () => { },
            E: () => {
                console.log('跳转登陆')
            }
        })
    }
    /**跳转分类详情 */
    jumpCategoryDetail({ title, id }) {
        return Exec({
            A: () => tuerStoryAPI.openCategoryDetail(String(title), String(id)),
            I: () => { },
            E: () => {
                console.log('跳转分类详情')
            }
        })
    }
    /**跳转听故事 */
    jumpListenStoryBigCategory() {
        return Exec({
            A: () => tuerStoryAPI.openListenStoryBigCategory(),
            I: () => { },
            E: () => {
                console.log('跳转听故事')
            }
        })
    }
    /**跳转听绘本 */
    jumpBookStoryBigCategory() {
        return Exec({
            A: () => tuerStoryAPI.openBookStoryBigCategory(),
            I: () => { },
            E: () => {
                console.log('跳转听绘本')
            }
        })
    }
    /**跳转完善宝贝信息 */
    jumpEditBabyInfo() {
        return Exec({
            A: () => tuerStoryAPI.openEditBabyInfo(),
            I: () => { },
            E: () => {
                console.log('跳转完善宝贝信息')
            }
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
}

export default new API();
