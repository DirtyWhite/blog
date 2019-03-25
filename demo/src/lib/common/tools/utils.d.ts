declare class Utils {
    /**
     * 获取元素的transformX和Y
     * @param ele 节点
     */
    getComputedStyle(ele: HTMLElement): { x: number, y: number }
    /**
     * 延迟一定时间后resolve的promise
     * @param delay 延迟时间
     */
    wait(delay: number): Promise<void>
    /**
     * 格式化姓名为5个字，超出则...
     * @param name 姓名
     */
    formatName(name: string): string
    /**
     * 格式化数字为字符串，规则为
     * 1W+ ~ 1000W 显示 万+
     * 9999W+显示 亿+
     * @param number 数字
     */
    formatNumber(number: number): string
    /**
     * 获取transform的x，y值
     * @param ele dom节点
     */
    getComputedStyle(ele: HTMLElement): void
    /**
     * 格式化时间戳,不足两位补0
     * @param timestamp 时间戳
     */
    formatTime(timestamp: string | number): { Y: string, M: string, D: string, h: string, m: string, s: string }
    /**
     * 自定义toast
     * @param txt 文案
     */
    myToast(txt: string): void
    /**
     * 手机号校验
     * @param phoneNumber 手机号
     */
    testPhone(phoneNumber: number): void
    /**
     * localStorage缓存，支持cooklie降级
     * @param namespace 存储标志位
     * @param data 存储内容
     */
    store(namespace: string, data?: number | string | object): void | object | number | string
    /**
     * 监听对象数据变动
     * @param o 监听对象
     * @param p 监听对象的key
     * @param oriValue key对应的初始zhi
     * @param setCallback set回调
     * @param getCallback get回调
     */
    $watch(o: object, p: string, oriValue: any, setCallback?: Function, getCallback?: Function): void
    /**
     * 绘制圆角矩形
     * @param  Laya 
     * @param {number} width 
     * @param {number} height 
     * @param {number} borderRadius 
     * @param {string} color 
     * @param {string} text 
     */
    drawBorderSp<T>(Laya: T, width: number, height: number, borderRadius: number, color: string, text?: string): { bg, txt }
    /**
     * 获取到目标节点间的距离
     * @param {Object} target
     * @param {Object} parent
     */
    getOffsetTop(target: HTMLElement, parent: HTMLElement): number
    /**
     * 获取地址参数
     * @param param 参数
     */
    getQueryString(param: string): string
}
declare var utils: Utils;
export default utils