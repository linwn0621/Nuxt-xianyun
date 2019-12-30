export const state={
    userInfo:{

    }
};
// 同步修改state
export const mutations={
setname(state,data){
    // 第一个参数必须是state,第二个参数是传进来的数据
    state.userInfo=data
}
};
// 异步修改state数据
export const actions={

login(store,data){
    return this.$axios({
        url: "/accounts/login",
        method: "POST",
        data
      }).then(res => {
        // console.log(res.data);
        this.$router.back()
        store.commit('setname', res.data)
        return true
      })
}

};

