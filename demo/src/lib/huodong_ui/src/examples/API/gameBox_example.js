import { box } from '../../API';

export default {
    getLoginInfo: {
        explain: '获取登录信息', 
        vertions: ``,
        demo: `

        `,
        run: function () {
            let loginInfo = box.getLoginInfo();
            box.doToast(JSON.stringify(loginInfo))
        }
    },
}