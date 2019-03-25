export interface tuEr {
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
     * 获取udid
     * @returns 获取udid
     */
    getUdid(): Promise<string>;

    /**
     * 获取登录信息
     * 未登录跳转登录
     * @returns  -{cookie,uid,nick,sface}
     */
    doCheckLogin(): void | Promise<loginInfo>;

    /**
     * toast提示
     * @param {string} message -要弹出的文本 
     */
    doToast(message: string): void;


    /**
     * 调用客户端检查更新功能
     */
    doUpdate(): void;

    /**
     * 自定义分享参数
     * @param {string} title -分享标题
     * @param {string} content -分享内容
     * @param {string} iconUrl -分享图标地址
     * @param {string} url -分享页地址
     */
    doShare(title: string, content: string, iconUrl: string, url: string): void;


    /**
     * 跳转登录
     */
    jumpLogin(): void;

    /**
    * 跳转分类详情
    * @param {string} title 视频标题
    * @param {string} id 视频id
    */
    jumpCategoryDetail(title: string, is: string): void;

    /**
     * 跳转听故事
     */
    jumpListenStoryBigCategory(): void;


    /**
     * 跳转听绘本
     */
    jumpBookStoryBigCategory(): void

    /** 
     *跳转完善宝贝信息 
     */
    jumpEditBabyInfo(): void;


    /**
     * 判断是否到达某个版本号
     * @param {string} { android：要比较的安卓4位版本号, ios：要比较的ios版本号 } 
     * @returns {boolean} 是否到达传入版本号
     */
    isRequiredVersion(android: string, ios: string): Promise<boolean>


}
interface loginInfo {
    mPauth
}
declare var tuer: tuEr;
export default tuer;