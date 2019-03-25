import ajax from 'axios';
import * as promise from 'es6-promise';
import qs from '../lib/qs'
import Env from '../../API/Env'
import bus from './bus.js'
import Host from './hostConfig';
import {
    Observable,
    Observer,
    fromEvent,
    merge,
    from,
    Subject,
    interval,
    timer,
    concat
} from 'rxjs';
import {
    tap,
    filter,
    map,
    mergeMap,
    mapTo,
    publishReplay,
    refCount,
    switchMap,
    distinct,
    repeat,
    scan,
    timeInterval,
    buffer,
    bufferTime,
    bufferCount,
    take,
    first,
    takeUntil,
    skip,
    debounceTime,
    distinctUntilChanged,
    startWith
} from 'rxjs/operators';
promise.polyfill();

export default class http<T> {
    commonInfo = {}
    constructor(commonInfo) {
        this.commonInfo = commonInfo;
        this.init();
    }
    init() {
        if (typeof window == undefined) return;
        ajax.interceptors.response.use(function (res) {
            return res;
        }, function (error) {
            return Promise.reject(error);
        });
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

    get(url, para = {}, type = "1"): Observable<T> {
        let root = this;
        return Observable.create(async (observer: Observer<T>) => {
            try {
                let res = await ajax.get<T>(this.U(url), {
                    params: {
                        ...this.commonInfo,
                        ...para
                    }
                });
                observer.next(res.data);
                observer.complete();
            } catch (err) {
                observer.error(err);
            }
        })
    }

    post(url, para = {}, getParam = {}): Observable<T> {
        let root = this;
        let query = {
            ...this.commonInfo,
            ...para,
        };
        return Observable.create(async (observer: Observer<T>) => {
            try {
                let res = await ajax.post<T>(this.U(url), qs.stringify(query), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });
                observer.next(res.data);
                observer.complete();
            } catch (err) {
                observer.error(err);
            }
        })
    }

    nodeGet(url, para = {}, type = "1"): Observable<T> {
        let root = this;
        return Observable.create(async (observer: Observer<T>) => {
            try {
                let res = await ajax.get(this.N(url), {
                    params: {
                        ...this.commonInfo,
                        ...para
                    }
                });
                observer.next(res.data);
                observer.complete();
            } catch (err) {
                observer.error(err);
            }
        })
    }

    nodePost(url, para = {}, getParam = {}): Observable<T> {
        let root = this;
        let query = {
            ...this.commonInfo,
            ...para,
        };
        return Observable.create(async (observer: Observer<T>) => {
            try {
                let res = await ajax.post(this.N(url), qs.stringify(query), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });
                observer.next(res.data);
                observer.complete();
            } catch (err) {
                observer.error(err);
            }
        })
    }
}