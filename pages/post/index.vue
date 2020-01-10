<template>
  <div class="container">
    <el-row type="flex" class="row-bg" justify="space-between" >
      <el-col :span="6" >
        <div class>
          <cblnav></cblnav>
        </div>
        <div class="tjcs">
          <h4>推荐城市</h4>
          <a href="#">
            <img src="../../images/pic_sea.jpeg" alt />
          </a>
        </div>
      </el-col>
      <el-col :span="17">
        <el-row>
          <div class>2</div>
        </el-row>
        <el-row>
          <div class>2</div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入侧边导航栏
import cblnav from "../../components/post/cblnav";
export default {
  components: {
    cblnav
  }
};
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
}
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}


.tjcs {
  margin-top: 20px;
  h4 {
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  img {
    width: 100%;
  }
}
</style>