/**网络请求类，封装通过node转发请求php端，或者直接node端的方法，支持get和post */
export default class http<T> {
    /**
     * 构造函数
     * @param commomInfo 每次请求都会带上的数据，如scookie、deviceId等
     */
    constructor(commomInfo?: Object)
    /**
     * 发送get请求，由node转发到php
     * @param {url} 请求地址，请求会被拼接成//[dlstest.img4399.com/redirect/huodong.4399.cn/test/game]/api（测试环境）
     * @param {para} 请求参数，对象形式
     */
    get: (url: string, para?: Object) => Promise<T>
    /**
     * 发送get请求到node根路径
     * @param {url} 请求地址，请求会被拼接成//dlstest.img4399.com/redirect/huodong.4399.cn/test/game/（测试环境）
     * @param {para} 请求参数，对象形式
     */
    nodeGet: (url: string, para?: Object) => Promise<T>
    /**
     * 发送post请求，由node转发到php
     * @param {url} 请求地址，请求会被拼接成//[dlstest.img4399.com/redirect/huodong.4399.cn/test/game]/api（测试环境）
     * @param {para} 请求参数，对象形式
     * @param {getParam} post请求下用get方式传参,对象形式,默认拼接上commonInfo
     */
    post: (url: string, para?: Object, getParam?: Object) => Promise<T>
    /**
     * 发送post请求，由node转发到php
     * @param {url} 请求地址，请求会被拼接成//[dlstest.img4399.com/redirect/huodong.4399.cn/test/game]/api（测试环境）
     * @param {para} 请求参数，对象形式
     * @param {getParam} post请求下用get方式传参,对象形式,默认拼接上commonInfo
     */
    nodePost: (url: string, para?: Object, getParam?: Object) => Promise<T>
}