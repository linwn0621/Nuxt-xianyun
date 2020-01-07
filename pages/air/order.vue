<template>
<!-- 订单首页布局 -->
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                  <OrderForm :data="infoData"></OrderForm> 
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                          
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
export default {
    data () {
        return {
            // 当前机票的详细信息
            infoData:{}
        }
    },
      components: {
        OrderForm
    },
   mounted(){
       console.log(this.$route.query)
    //    根据url中的id请求机票详细信息
       this.$axios({
           url:`/airs/${this.$route.query.id}`,
           params:{
               seat_xid: this.$route.query.seat_xid
           }
       }).then(res=>{
           console.log(res)
           this.infoData=res.data
       })
        // this.$axios({
        //     url: `airs/${query.id}`,
        //     params: {
        //         seat_xid: query.seat_xid
        //     }
        // }).then(res => {
        //     this.infoData = res.data;
        // })
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>