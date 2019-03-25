import { yp } from '../../API';

export default {
    //功能接口
        getDeviceId: {
            explain: '获取设备id',
            version: ``,
            demo: `
            async function () {
                let deviceId = await youPai.getDeviceId();
            }`,
            run: async function () {
                let deviceId = await youPai.getDeviceId();
                youPai.toast(deviceId)
            }
        },
        
        getLoginInfo: {
            explain: '获取用户信息',
            demo: `
            async function () {
                let loginInfo = await youPai.getLoginInfo();
            }`,
            run: async function () {
                let loginInfo = await youPai.getLoginInfo();
                youPai.toast(JSON.stringify(loginInfo))
            }
        },
    
        getVersion: {
            explain: '获取当前版本号',
            demo: `
            async function () {
                let version = await youPai.getVersion();
            }`,
            run: async function () {
                let version = await youPai.getVersion();
                youPai.toast(JSON.stringify(version))
            }
        },
    
        checkLogin: {
            explain: '检查是否登录，未登录则前往登录',
            demo: `
            async function () {
                let version = await youPai.getVersion();
            }`,
            run: async function () {
                let isLogin = await youPai.checkLogin();
                if (isLogin) {
                    youPai.toast('已登录')
                }
                
            }
        },
        
        playVideo: {
            explain: '播放视频',
            demo: `
                youPai.playVideo({
                    id: "215801",
                    title: "陈子豪：艰难的战斗",
                    videoSrc: 'http://sj.video.5054399.com/sjyx/youpaiyunyingshiping1/czhjndzd.mp4',
                    pic: 'http://t1.sj.img4399.com:8089/test_ma/ma~1_20150518102327_55594d1f8e44b.jpeg',
                    type: '电脑游戏'
                });
            `,
            run: async function () {
                youPai.playVideo({
                    id: "215801",
                    title: "陈子豪：艰难的战斗",
                    videoSrc: 'http://sj.video.5054399.com/sjyx/youpaiyunyingshiping1/czhjndzd.mp4',
                    pic: 'http://t1.sj.img4399.com:8089/test_ma/ma~1_20150518102327_55594d1f8e44b.jpeg',
                    type: '电脑游戏'
                });
                
            }
        },
    
        
        isRequiredVersion: {
            explain: '判断是否到达目标版本',
            demo: `
            async function () {
                let isRequired = await youPai.isRequiredVersion({android: '2.2.4.0',ios:'1.8.0'});
            }`,
            run: async function () {
                let isRequired = await youPai.isRequiredVersion({android: '2.2.4.0',ios:'1.8.0'});
                if (isRequired) {
                    youPai.toast('到达指定版本')
                } else {
                    youPai.toast('未到达指定版本')
                }
            }
        },
        
        
        toast:{
            explain: 'toast提示',
            demo: `
                youPai.toast('提示信息')
            `,
            run: async function () {
                youPai.toast('提示信息')
            }
    },
        
        closeWebView: {
            explain: '关闭当前webView',
            demo: `
                youPai.closeWebView();
            `,
            run: async function () {
                youPai.closeWebView();
            }
        },
    
        
        checkUpdate: {
            explain: '调用客户端检查更新功能',
            demo: `
                youPai.checkUpdate();
            `,
            run: async function () {
                youPai.checkUpdate();
            }
        },
    
       
        openShare: {
            explain: '调起客户端分享组件',
            demo: `
                youPai.openShare();
            `,
            run: async function () {
                youPai.openShare();
            }
        },
    
       
        customShare:{
            explain: '调起客户端分享组件，并自定义分享参数',
            demo: `
                youPai.openShare();
            `,
            run: async function () {
                youPai.customShare({
                    title: '自定义分享',
                    content: '自定义的分享内容',
                    iconUrl: 'http://f03.img4399.com/ma~448_20171121162841_5a13e3b941f31.png',
                    url: location.href
                });
            }
        },
    
    //跳转接口
    
        
        jumpLogin: {
            explain: '跳转登录',
            demo: `
                youPai.jumpLogin();
            `,
            run: async function () {
                youPai.jumpLogin();
            }  
        },
    
        
        jumpHotVideo: {
            explain: '跳转热门视频',
            limit: 'Android',
            demo: `
                youPai.jumpHotVideo({id:342});
            `,
            run: async function () {
                youPai.jumpHotVideo({id:342});
            }  
        },
    
       
        jumpVideoCollection: {
            explain: '跳转视频集合页',
            limit: 'IOS',
            demo: `
                youPai.jumpVideoCollection({id:'253',name:'测试的集合名'});
            `,
            run: async function () {
                youPai.jumpVideoCollection({id:'253',name:'测试的集合名'});
            }
        },
    
       
        jumpUploadVideo: {
            explain: '跳转到视频上传页',
            demo: `
                youPai.jumpUploadVideo({channel: 'huodong'});
            `,
            run: async function () {
                youPai.jumpUploadVideo({channel: 'huodong'});
            }
        },
    
       
        jumpFeedBack: {
            explain: '跳转到反馈页',
            demo: `
                youPai.jumpUploadVideo({channel: 'huodong'});
            `,
            run: async function () {
                youPai.jumpFeedBack();
            }
        },
    
        
        jumpSearch:{
            explain: '跳转到搜索页',
            demo: `
                youPai.jumpSearch({keyword:'关键词'});
            `,
            run: async function () {
                youPai.jumpSearch({keyword:'关键词'});
            }
        },
    
        
        jumpOpenLive: {
            explain: '跳转到直播页',
            demo: `
                youPai.jumpOpenLive();
            `,
            run: async function () {
                youPai.jumpOpenLive();
            }
        },
    
       
        jumpPersonalPage: {
            explain: '跳转到个人信息页',
            demo: `
                async function () {
                    let id = (await youPai.getLoginInfo()).uid
                    youPai.jumpPersonalPage({id});
                }
            `,
            run: async function () {
                let id = (await youPai.getLoginInfo()).uid
                youPai.jumpPersonalPage({id});
            }
        },
    
        
        jumpLiveList: {
            explain: '跳转到观看直播列表页',
            demo: `
            youPai.jumpLiveList({id:'1',type:'1',name:'推荐直播'});
            `,
            run: async function () {
                youPai.jumpLiveList({id:'1',type:'1',name:'推荐直播'});
            }
        },
    
        
        listenShake: {
            explain: '开启/关闭摇一摇监听',
            demo: `
                await youPai.listenShake({ operate: 1 });
                youPai.listenShake({ operate: 0 })
                youPai.toast('检测到摇晃')
            `,
            run: async function () {
                await youPai.listenShake({ operate: 1 });
                youPai.listenShake({ operate: 0 })
                youPai.toast('检测到摇晃')
            }
        },
    }