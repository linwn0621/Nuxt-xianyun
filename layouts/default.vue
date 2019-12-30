<template>
  <div>
    <!-- 头部组件 -->
    <Header/>
  
    <!-- 内容占位组件 -->
    <nuxt />
      <!-- 底部 -->
    <Footer/>
  </div>
</template>

<script>
// 导入头部组件
import Header from "@/components/header"
import Footer from "@/components/footer"

export default {
  // 注册组件
  components: {
    Header,
    Footer
  }
}
</script>

<style>
*{
  margin:0; 
  padding:0;
}
ul, li, ol{
  list-style:none;
}
a{
  text-decoration:none;
  color:inherit;
}
a:hover{
 color:inherit;
}
em,i{
  font-style: normal;
}
</style>