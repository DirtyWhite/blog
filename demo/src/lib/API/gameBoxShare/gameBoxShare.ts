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
    type: string
    extra: string
    /**
     * 可选值: \
     * -1 : 分享失败 \
     * 0 : 分享取消 \
     * 1 : 分享成功 \
     * 注: \
     * 微信分享（包括朋友圈）总返回1
     */
    shareResult: number
}

interface innerShareConfig {
    icon: string,
    title: string,
    message: string
}

/**
 * 内部分享配置
 */
interface extra {
    activityId?: number,
    customUrl?: string,
    type?: string,
    custom?: {
        /**
         * 会在内部分享地址带上?ext=xxx
         */
        activityUri?: string
        /**
         * 内部分享标题
         */
        activityTitle?: string
        /**
         * 描述
         */
        activityDesc?: string
    }

}

interface shareConfig {
    /**
     * 弹出的渠道
     * qq,wx,qzone,weibo,pm,clan,feed
     */
    shareConfig?: string,
    shareTitle?: string
    shareContent?: string,
    shareUrl?: string,
    shareIcon?: string,
    feed?: innerShareConfig,
    pm?: innerShareConfig,
    clan?: innerShareConfig,
    extra?: extra
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
    type: string,
    shareUrl?: string,
    icon?: string,
    title?: string,
    message?: string,
    extra: extra

}

class gameBoxShare {
    constructor() {
        this.init();
    }

    private mergeConfig(into, from) {
        for (let key in from) {
            if (into[key] && into[key].toString() === "[object Object]") {
                this.mergeConfig(into[key], from[key]);
            } else {
                into[key] = from[key];
            }
        }
        return into;
    }

    private async init() {
        await this.getClientConfig();
        this.test();
    }

    private async test() {
        // let { shareResult } = await this.shareComplete();
        // shareResult
    }

    private shareAPI = window['shareAPI'] || {};
    //后台默认客户端分享配置
    private initConfig: shareConfig
    //当前的客户端配置
    private curConfig = {}
    private getClientConfig = () => {
        return new Promise(resolve => {
            window['setShareData'] = clientConfig => {
                this.initConfig = clientConfig;
                resolve();
            }
            this.shareAPI.getShareData && this.shareAPI.getShareData();
        })

    }

    private shareComplete(): Promise<shareCallbackParam> {
        return new Promise(resolve => {
            window['shareCompleted'] = function (e) {
                resolve(e)
            }
        })
    }

    private callShare(finalConfig) {
        this.shareAPI.onJsShare(JSON.stringify(finalConfig));
    }

    private callShareForType(finalConfig) {
        this.shareAPI.onJsShareForType(JSON.stringify(finalConfig))
    }

    /**
     * 定制客户端分享并打开分享面板
     */
    public openShare = (userConfig: shareConfig = {}) => {
        const fianlConfig = this.mergeConfig(this.initConfig, userConfig);
        this.callShare(fianlConfig)
        return this.shareComplete();
    }
    /**
     * 定制客户端分享并直接分享到对应渠道
     */
    public shareForType = (userConfig: shareForTypeConfig) => {
        const { shareIcon, shareTitle, shareContent } = this.initConfig;
        const fianlConfig = this.mergeConfig(
            this.initConfig, this.mergeConfig({
                icon: shareIcon,
                title: shareTitle,
                message: shareContent
            }, userConfig)
        );
        this.callShareForType(fianlConfig)
        return this.shareComplete();
    }

    /**设置分享配置，会影响右上角分享组件的配置。*/
    public setClientShare(config) {
        this.curConfig = this.mergeConfig(this.initConfig, config);
        window['openShare'] = this.callShare(this.curConfig)
    }

    /**重置分享配置为初始状态（读取后台配置），会影响右上角配置*/
    public resetClientShare(config) {
        this.curConfig = Object.assign({}, this.initConfig);
        window['openShare'] = this.callShare(this.curConfig);
    }
}

export default new gameBoxShare()
export type gbshare = gameBoxShare;