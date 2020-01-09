export const state=()=>({
  userInfo:{

  }
})
// 同步修改state
export const mutations={
setname(state,data){
    // 第一个参数必须是state,第二个参数是传进来的数据
    state.userInfo=data
}
};
// 异步修改state数据
export const actions={
// 登录
login(store,data){
    return this.$axios({               
        url: "/accounts/login",
        method: "POST",
        data
      }).then(res => {
        console.log(111,res);
        this.$router.back()
        store.commit('setname', res.data)
        return true
      }).catch(res => {
        console.log(222,res);
        return false
      })
},
// 注册
register(store,data){
  return this.$axios({
    url: `/accounts/register`,
    method: "POST",
    data
  }).then(res => {
    console.log(11, res);
    this.$router.back()
    store.commit('setname', res.data)
    return true
  }).catch(res => {
    return false
  });
}

};

