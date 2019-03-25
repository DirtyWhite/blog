export interface youPai {
    /**
     * 获取设备id
     * @returns 设备id
     */
    getDeviceId(): Promise<string>;
    /**
     * 获取登录信息
     * @returns -{cookie,uid,nick,sface}
     */
    getLoginInfo(): Promise<loginInfo>;
    /**
     * 获取应用版本号
     * @returns 应用版本号
     */
    getVersion(): Promise<string>;

    /**
     * 获取登录信息
     * 未登录跳转登录
     * @returns  -{cookie,uid,nick,sface}
     */
    doCheckLogin(): void | Promise<loginInfo>;

    /**
     * 直接播放一段视频url，不进行跳转
     * @param {string} url -视频地址
     * @param {string} title -视频标题
     */
    doPlayVideoDirectly(url: string, title: string): void;

    /**
     * 播放视频
     * @param {number} id -视频id
     * @param {string} title -视频标题
     * @param {string} videoSrc -视频地址
     * @param {string} pic -预览图地址
     * @param {string} type 视频类型
     */
    doPlayVideo(id: string | number, title: string, videoSrc: string, pic?: string, type?: string): void


    /**
     * toast提示
     * @param {string} message -要弹出的文本 
     * @param {function} yourToast -你自己实现的弹窗，在不支持api时会调用，如alert
     */
    doToast(message: string, yourToast?: Function): void;

    /**
     * 关闭活动页
     */
    doCloseWebView(): void;

    /**
     * 调用客户端检查更新功能
     */
    doCheckUpdate(): void;

    /**
    * 调起客户端分享组件
    * @returns {number} -分享是否成功 0： 失败 , 1： 成功 
    */
    doOpenShare(): Promise<number>;

    /**
     * 自定义分享参数
     * @param {string} title -分享标题
     * @param {string} content -分享内容
     * @param {string} iconUrl -分享图标地址
     * @param {string} url -分享页地址
     * @returns {number} -分享是否成功 0： 失败 , 1： 成功 
     */
    doCustomShare(title: string, content: string, iconUrl: string, url: string): Promise<number>;

    /**
     * 启动摇晃监听
     * @param {number} operate 1：开启 0 关闭 
     */
    doListenShake(operate: string | number): Promise<number>

    /**
     * 复制文本到剪贴板
     * @param {string} content 要复制的文本
     */
    doCopy(content): void

    /**
     * 保存base64图片到相册
     */
    doSavePic(name: string, base64: string): void

    /**
     * 保存图片到手机
     * @param base64 无前缀的base64字符串
     */
    doSharePic(base64: string): Promise<number>

    /**
     * 检查某个包是否安装
     * @param packageName 包名
     */
    doCheckAppInstalled(packageName): Promise<boolean>

    /**
     * 跳转登录
     */
    jumpLogin(): void;

    /**
    * 跳转热门视频
    * @requires Android
    * @param {string} id 视频id
    */
    jumpHotVideo(id: string): void;

    /**
     * 跳转视频集合页
     * @requires IOS
     * @param {string} id  -集合id
     * @param {string} name -集合名称
     */
    jumpVideoCollection(id: string, name: string): void;


    jumpVideoCategory(id: string): Promise<void>

    /** 
     *跳转上传视频页 
     * @param {string} channel -上传的来源标识字符串   
     */
    jumpUploadVideo(channel: string): void;

    /**
     * 跳转到反馈页
     */
    jumpFeedBack(): void;

    /**
     * 跳转到搜索页
     */
    jumpSearch(keyword: string): void;

    /**
     * 跳转直播页
     */
    jumpOpenLive(): void;

    /**
     * 跳转到个人主页
     * @param {string | number} id -用户id
     */
    jumpPersonalPage(id: string)

    /**
     * 跳转游拍直播列表页
     * @param {string} id -模块id
     * @param {string} type -模块类型
     * @param {string} name -标题
     */
    jumpLiveList(id: string, type: string, name: string): void;

    /**
     * 跳转SDK充值页
     * @param {string} type -页面类型：0充值页（充值首页），1充值页子页（立即充值页，选择充值金额）
     */
    jumpRecharge(type: string): void

    /**
     * 跳转直播间
     * @param {string} id:直播间id
     */
    jumpRoom(id: string): void

    /**
     * 第三方绑定弹窗
     * 成功有回调，失败无回调
     */
    doBind(): Promise<any>

    /**
     * 手机绑定页面
     * 成功有回调，失败无回调
     */
    doBindMobile(): Promise<any>
    /**
     * 判断是否到达某个版本号
     * @param {string} { android：要比较的安卓4位版本号, ios：要比较的ios版本号 } 
     * @returns {boolean} 是否到达传入版本号
     */
    isRequiredVersion(android: string, ios: string): Promise<boolean>

    /**
     * 设置webview标题
     * @param {string} 标题名
     */
    doSetTitle(title): void

}
interface loginInfo {
    cookie: string;
    uid: string;
    nick: string;
    sface: string;
}
interface videoInfo {
    id: string,
    title: string,
    videoSrc: string,
    pic: string,
    type: string
}
declare var yp: youPai;
export default yp;