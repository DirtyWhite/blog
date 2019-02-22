import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';


Vue.use(Vuex)


interface response {
    data: {
        code: number
        message: string
        result: any
    }
    code: number
    message: string
    result: any
}


export default new Vuex.Store<state>({
    state: new state(),
    actions: {
        async getBaseInfo({ commit }, args) {

        },
    },
    mutations: {
        updateUserInfo(state, data) {

        },
        updatePops(state, data) {
            if (data.payload.isCloseAll) {
                state.pops = []
                return
            }
            if (data.payload.isClose) {
                state.pops.pop()
                return
            }
            if (data.payload.isAdd) {
                state.pops.push(data)
                return
            }
            let newPopData = state.pops
            if (newPopData.length <= 0) {
                newPopData = [data]
            } else {
                newPopData.pop()
                newPopData.push(data)
            }
            state.pops = newPopData;
        },
        updateLoading(state, boolean) {
            state.isLoading = boolean
        }
    }
})