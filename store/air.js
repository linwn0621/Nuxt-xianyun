export const state=()=>({
history:[],
money:0
});
// 同步修改state
export const mutations={
setHistory(state,data){
    state.history.unshift(data)
    
},
setmoney(state,airmoney){
    state.money=airmoney
}
};


