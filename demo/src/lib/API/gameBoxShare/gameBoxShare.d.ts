interface shareCallbackParam {
    /**
     * 选项:\
     * qq \
     * wx \
     * qzone \
     * feed : 动态 \
     * pm : 私信 \
     * clan : 家族 \
     * system : 系统第三方
     */
    type: string;
    extra: string;
    /**
     * 可选值: \
     * -1 : 分享失败 \
     * 0 : 分享取消 \
     * 1 : 分享成功 \
     * 注: \
     * 微信分享（包括朋友圈）总返回1
     */
    shareResult: number;
}
interface innerShareConfig {
    icon: string;
    title: string;
    message: string;
}
/**
 * 内部分享配置
 */
interface extra {
    activityId?: number;
    customUrl?: string;
    type?: string;
    custom?: {
        /**
         * 会在内部分享地址带上?ext=xxx
         */
        activityUri?: string;
        /**
         * 内部分享标题
         */
        activityTitle?: string;
        /**
         * 描述
         */
        activityDesc?: string;
    };
}
interface shareConfig {
    /**
     * 弹出的渠道
     * qq,wx,qzone,weibo,pm,clan,feed
     */
    shareConfig?: string;
    shareTitle?: string;
    shareContent?: string;
    shareUrl?: string;
    shareIcon?: string;
    feed?: innerShareConfig;
    pm?: innerShareConfig;
    clan?: innerShareConfig;
    extra?: extra;
}
interface shareForTypeConfig {
    /**
     * 分享渠道
     * /**
     * 选项:\
     * qq \
     * wx \
     * qzone \
     * feed : 动态 \
     * pm : 私信 \
     * clan : 家族 \
     * system : 系统第三方
     * */
    type: string;
    shareUrl?: string;
    icon?: string;
    title?: string;
    message?: string;
    extra: extra;
}
declare class gameBoxShare {
    constructor();
    private mergeConfig;
    private init;
    private test;
    private shareAPI;
    private initConfig;
    private curConfig;
    private getClientConfig;
    private shareComplete;
    private callShare;
    private callShareForType;
    /**
     * 定制客户端分享并打开分享面板
     */
    openShare: (userConfig?: shareConfig) => Promise<shareCallbackParam>;
    /**
     * 定制客户端分享并直接分享到对应渠道
     */
    shareForType: (userConfig: shareForTypeConfig) => Promise<shareCallbackParam>;
    /**设置分享配置，会影响右上角分享组件的配置。*/
    setClientShare(config: any): void;
    /**重置分享配置为初始状态（读取后台配置），会影响右上角配置*/
    resetClientShare(config: any): void;
}
declare const _default: gameBoxShare;
export default _default;
