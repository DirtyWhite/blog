import ajax from 'axios';
import promise from 'es6-promise';
import bus from './bus'
import Host from './hostConfig.js';
promise.polyfill();

function toast(msg) {
    bus.$emit('toast', msg)
}
export default class http {
    commonInfo = {}
    extraHeaders = {}
    constructor(commonInfo) {
        this.commonInfo = commonInfo;
        this.init();
    }
    init() {
        if (typeof window == 'undefined') return;
        ajax.interceptors.response.use(function (res) {
            if (res.data.code == '90') {
                window.actFinished = true;
                bus.$emit('actFinished')
            } else if (res.data.code == '91') {
                window.actUnstart = true;
                bus.$emit('actUnstart')
            }
            return res;
        }, function (error) {
            return Promise.reject(error);
        });
        window.closeDevice && (this.extraHeaders['close-device'] = window.closeDevice)
    }
    U(name) { //拼接url
        return Host.host + name;
    }
    N(name) {
        return Host.nodeHost + name;
    }
    appendGet(url, param) {
        let connect = url.indexOf('?') > -1 ? "&" : "?";
        param = {
            ...param,
            ...this.commonInfo
        }
        let result = url;
        for (let i in param) {
            result += connect + param[i]
        }
        return result;
    }
    async get(url, para = {}, type = "1") {
        let root = this;
        return ajax.get(this.U(url), {
            params: {
                ...this.commonInfo,
                ...para
            },
            headers: this.extraHeaders
        });
    }
    async post(url, para = {}, getParam = {}) {
        let root = this;
        let query = {
            ...this.commonInfo,
            ...para,
        };
        return ajax.post(this.U(url), qs.stringify(query), {
            headers: Object.assign(this.extraHeaders, {
                'Content-Type': 'application/x-www-form-urlencoded',
            })

        });
    }
    async nodeGet(url, para = {}, type = "1") {
        let root = this;
        return ajax.get(this.N(url), {
            params: {
                ...this.commonInfo,
                ...para
            },
            headers: this.extraHeaders
        });
    }
    async nodePost(url, para = {}, getParam = {}) {
        let root = this;
        let query = {
            ...this.commonInfo,
            ...para,
        };
        return ajax.post(this.N(url), qs.stringify(query), {
            headers: Object.assign(this.extraHeaders, {
                'Content-Type': 'application/x-www-form-urlencoded',
            })
        });
    }
}

