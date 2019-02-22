/**
 * 混合，组件公共逻辑可以写在这里，默认混入state
 */
import {
    Component,
    Vue
} from "vue-property-decorator";

import state from './store/state'

declare module 'vue/types/vue' {
    interface Vue {
        $state: state
        when: (boolean: boolean, name: string, name2?: string) => boolean | string
        wait: (time: number) => Promise<any>
        /**关闭所有弹窗 */
        closeAllPop: () => void
        /**关闭最新的弹窗 */
        closePop: () => void
        /**新增一个弹窗，不关闭旧的弹窗 */
        pushPop: <T>(type: string, payload: T) => void
        /**新增一个弹窗，关闭所有旧弹窗 */
        showPop: <T>(type: string, payload: T) => void
    }
}

@Component
export default class globalMixin extends Vue {

    get $state() {
        return this.$store.state
    }

    when = (boolean: boolean, name: string, name2: string) => {
        return boolean ? name : name2 || '';
    }

    wait = (time: number) => {
        return new Promise(resolve => {
            setTimeout(resolve, time)
        })
    }
    /**pop相关 */
    closeAllPop = () => {
        this.$store.commit('updatePops', {
            type: '',
            payload: { isCloseAll: true }
        })
    }
    closePop = () => {
        this.$store.commit('updatePops', {
            type: '',
            payload: { isClose: true }
        })
    }
    pushPop = <T>(type: string, payload: T) => {
        this.$store.commit('updatePops', {
            type,
            payload: Object.assign({ isAdd: true }, payload)
        })
    }
    showPop = <T>(type: string, payload: T) => {
        this.$store.commit('updatePops', {
            type,
            payload
        })
    }
}