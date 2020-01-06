export const state=()=>({
history:[]
});
// 同步修改state
export const mutations={
setHistory(state,data){
    state.history.unshift(data)
}
};


