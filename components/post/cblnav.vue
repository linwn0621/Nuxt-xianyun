<template>
  <div class="menus">
    <ul>
<li :class="[menu,{active:aa===index}]"  v-for="(item,index) in form" :key="index"  @mouseenter="enter(index)" @mouseleave="leave">
  {{item.type}}
</li>
    </ul>

  </div>
</template>

<script>
export default {
  
data () {
  return {
    form:[],
    aa:null,
    menu: "menu"
  }
},

mounted () {
  this.$axios({
    url:"/posts/cities"
  }).then(res=>{
    console.log(1,res)
    this.form=res.data.data
  })
},
methods: {
  enter(index){
console.log(index)
this.aa=index
  },
  leave(){
    this.aa=null
  }
}
}
</script>

<style lang="less" scoped>
.menu{
  line-height: 40px;
  border: 1px solid #ddd;
  border-bottom-width: 0px;
  border-right: 1px solid #ddd;
  padding: 0 20px;
  font-size: 14px;
}
.active{
  color: #ffa500;
  border-right-color:white;
}
</style>