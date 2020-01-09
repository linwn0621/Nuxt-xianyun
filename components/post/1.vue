<template>
  <div class="bind">
      <h1>这个文件主要说明v-bind的使用--重点内容哦</h1>
      <!-- <a href="/del?id=id">删除</a> -->
      <!-- <a v-bind:href="'/del?id='+id">删除</a> -->

      <!-- <p v-bind:style='"font-size:"+fontsize'>我有自己的字体大小</p> -->
      <!-- 简写方式： : -->
      <p :style='"font-size:"+fontsize'>我有自己的字体大小</p>
      <p v-bind:[userkey]='v'>为动态属性进行动态绑定</p>
      <p :class="{red:isred}">我是红色吗？</p>
      <!-- <div class="menu collepse"></div> -->
      <!-- <div :class="{menu:true, collepse:iscollepse}"></div> -->
      <div :class="[menu, {collepse:iscollepse}]"></div>
      <button @click='iscollepse=!iscollepse'>点击展开和折叠</button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            id:10,
            fontsize:"50px",
            userkey:'username',
            v:'hello',
            isred:false,
            iscollepse:false,
            menu:'menu'
        }
    }
}
</script>

<style>
.red{
    color: red;
}
.menu{
    width: 200px;
    height: 200px;
    background-color: #f00;
    transition: width 0.5s;
}
.collepse{
    width: 50px;
}
</style>