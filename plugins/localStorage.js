// 使用vuex-persistedstate保存store到本地存储
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store", // 读取本地存储的数据到store
        })(store)
    })
}