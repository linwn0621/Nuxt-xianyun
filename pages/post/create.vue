<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 左边 -->
      <el-col class="left">
        <div class="left-box">
          <h2>发表新攻略</h2>
          <p>分享你的个人游记，让更多人看到哦！</p>
          <!-- 表单 -->
          <el-form ref="form" :model="form">
            <!-- 标题 -->
            <el-form-item>
              <el-input v-model="form.name" placeholder="请输入标题"></el-input>
            </el-form-item>
            <!-- 富文本框 -->
            <el-form-item id="app">
              <VueEditor :config="config" ref="vueEditor" />
            </el-form-item>
            <!-- 选择城市 -->
            <el-form-item label="选择城市" label-width="80px" style="padding: 0 12px 0 0;text-align: left;">
              <el-input v-model="form.city" class="xzcs"></el-input>
            </el-form-item>
            <!-- 发布文章 -->
            <el-form-item>
          <el-button type="primary" style="font-size: 12px;padding: 9px 15px;
}">发布</el-button>
        </el-form-item>
          </el-form>
        </div>
      </el-col>
      <!-- 右边 -->
      <el-col class="right">
        <div class="right-box">
          <h4>草稿箱（0）</h4>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入富文本框
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  name: "app",
  data() {
    return {
      form: {
        name: "123",
        city: ""
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.url);
          }
        }
      }
    };
  },
  components: {
    VueEditor
  }
};
</script>

<style lang="less" scoped >
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  //   background-color: grey;
  .left {
    width: 750px;
    .left-box {
      h2 {
        font-weight: 400;
        font-size: 22px;
        margin-bottom: 10px;
      }
      p {
        font-size: 12px;
        color: #999;
        margin-bottom: 10px;
      }
      .xzcs{
width: 183px;


      }
    }
  }
  .right {
    width: 200px;
    .right-box {
      border: 1px solid #ddd;
      padding: 10px;
      h4 {
        margin-bottom: 10px;
        font-weight: 400;
        color: #666;
      }
    }
  }
}
</style>