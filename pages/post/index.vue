<template>
  <div class="container">
    <el-row type="flex" class="row-bg" justify="space-between">
      <!-- 左边 -->
      <el-col class="leftcol">
        <!-- 侧边导航栏 -->
        <div class>
          <cblnav></cblnav>
        </div>
        <!-- 推荐城市 -->
        <div class="tjcs">
          <h4 class="tjcs-title">推荐城市</h4>
          <a href="#">
            <img src="../../images/pic_sea.jpeg" alt />
          </a>
        </div>
      </el-col>
      <!-- 右边 -->
      <el-col class="rightcol">
        <!-- 输入框 -->
        <el-row class="row-inp" type="flex" justify="space-between">
          <input type="text" placeholder="请输入想去的地方，比如：'广州'" v-model="input" />
          <i class="el-icon-search"></i>
        </el-row>
        <!-- 推荐 -->
        <el-row class="tj">
          <span class="tjcity">推荐:</span>
          <span class="tjcity" v-for="(item,index) in ['广州','上海','北京']" :key="index">{{item}}</span>
        </el-row>
        <!-- 写游记 -->
        <el-row class="xyj" type="flex" justify="space-between">
          <span>推荐攻略</span>
          <el-button type="primary" icon="el-icon-edit">写游记</el-button>
        </el-row>
        <!-- 文章内容 -->
        <el-row>
          <!-- 文章 -->
          <div class="post-list">
            <nuxt-link :to="`/post/detail?id=4`">
              <h4 class="post-title">塞班贵？一定是你的打开方式不对！6000块玩转塞班</h4>
              <p
                class="post-data"
              >大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最终花费远远超出预算，对预算的合理分配对控制我们旅行的花费就很重要了，如何只花6000块玩转塞班岛，对预算超支say no？下面从5个方面来为您一一解读：机票+酒店、岛上交通、玩乐项目、吃以及购买纪念品。1.怎样订机票+酒店性价比最高？机票和酒店的花销往往会占据我们旅行大半的花销，假设机票酒店为塞班行预算的一半，剩下的吃行玩购为预算的另一半，如果能在机票酒店这部分省下钱，也就意味着在塞班岛用来吃行玩购的钱就增加了怎样去塞班？可以转机也可以直飞，转机大多会从韩国转，提前蹲守能买到韩国飞塞班的特价机票，2000以下就能入手，加上国内飞韩国的机票来回塞班得5000+，还没算上在塞班的住宿费用，转机还有中途等待的时间，光花在路途上的时间就比直飞要多上一倍甚至更多，转乘奔波劳累，非联程票还要担心行李托运问题，所以建议大家有直飞还是尽量选择直飞。在酒店上，旅途中我们呆在酒店的时间远比在外游玩的时间少，酒店干净整洁基本就能满足我们休息的需求，塞班不是个享受酒店的地方而且还真不能跟国内星级酒店等位比较，所以不建议大家花过多的钱在塞班的酒店体验上。怎样在机票酒店上获得最高性价比的体验？ 直飞塞班的航班一般和酒店一起打包成机票+酒店套餐，价格要比单定机票、酒店要更加便捷实惠，往往3千多就能把机票和酒店一键搞定。</p>
              <el-row type="flex" justify="space-between" class="post-img">
                <img src="../../images/pic_sea.jpeg" />
                <img src="../../images/pic_sea.jpeg" />
                <img src="../../images/pic_sea.jpeg" />
              </el-row>
            </nuxt-link>
            <!-- 文章底部 -->
            <el-row type="flex" justify="space-between" class="post-info">
              <div class="post-info-left">
                <span>
                  <i class="el-icon-location-outline"></i>北京市
                </span>
                <div class="post-info-left-img">
                  by
                  <img
                    v-if="$store.state.user.userInfo.user"
                    :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar"
                  />
                </div>
                <span>
                  <i class="el-icon-view"></i>123456
                </span>
              </div>
              <span class="post-info-right">76赞</span>
            </el-row>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入侧边导航栏
import cblnav from "../../components/post/cblnav";
export default {
  data() {
    return {
      input: "北京"
    };
  },
  components: {
    cblnav
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .leftcol {
    width: 260px;
  }
  .rightcol {
    width: 700px;
  }
}
// 输入框
.row-inp {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  border: 3px solid orange;
  input {
    flex: 1;
    padding: 0 20px;
    outline: none;
    border: none;
    line-height: 40px;
    background: none;
    // flex: 1;
  }
}
// 搜索图标
.el-icon-search {
  font-size: 24px;
  color: orange;
  font-weight: 700;
  margin-right: 10px;
}
// 推荐城市
.tjcs {
  margin-top: 20px;
  .tjcs-title {
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  img {
    width: 100%;
  }
}
// 推荐
.tj {
  padding: 10px 0;
  .tjcity {
    margin-right: 5px;
    font-size: 12px;
    color: #666;
  }
}
// 写游记
.xyj {
  line-height: 40px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  position: relative;
  span {
    font-weight: 400;
    font-size: 18px;
    color: orange;
    &::after {
      display: block;
      content: "";
      width: 72px;
      height: 2px;
      background: orange;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
// 文章内容
.post-list {
  padding: 20px 0;
  .post-title {
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 15px;
    white-space: nowrap; //文本不换行
    overflow: hidden;
    text-overflow: ellipsis; //多出的文本省略号显示
    &:hover {
      color: orange;
    }
  }
  .post-data {
    font-size: 14px;
    height: 63px;
    line-height: 1.5;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis; //多出的文本省略号显示
    display: -webkit-box; //将对象作为弹性伸缩盒子模型显示
    -webkit-line-clamp: 3; //控制显示几行文字
    -webkit-box-orient: vertical; //设置伸缩盒对象的子元素排列方式
  }
  .post-img {
    margin: 15px 0;
    img {
      width: 220px;
      height: 150px;
    }
  }
  // 内容底部
  .post-info-left {
    display: flex;
    font-size: 12px;
    color: #999;
    // align-items: center;
    .post-info-left-img {
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>