import Vue from 'vue'
import vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(vuex)
//开发环境下使用，调试查看是否state是从mutation里面修改
const debug = process.env.NODE_ENV !== 'production'
export default new vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()]: []
})