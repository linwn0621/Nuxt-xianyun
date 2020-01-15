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
          <nuxt-link :to="`/post?city=青岛`">
            <img src="../../images/pic_sea.jpeg" alt />
          </nuxt-link>
        </div>
      </el-col>
      <!-- 右边 -->
      <el-col class="rightcol">
        <!-- 输入框 -->
        <el-row class="row-inp" type="flex" justify="space-between">
          <input type="text" placeholder="请输入想去的地方，比如：'广州'" v-model="input" />
          <i class="el-icon-search" @click="searchcity"></i>
        </el-row>
        <!-- 推荐 -->
        <el-row class="tj">
          <span class="tjcity">推荐:</span>
          <span class="tjcity" v-for="(item,index) in ['广州','上海','北京']" :key="index">
            <nuxt-link :to="`/post?city=${item}`">{{item}}</nuxt-link>
          </span>
        </el-row>
        <!-- 写游记 -->
        <el-row class="xyj" type="flex" justify="space-between">
          <span>推荐攻略</span>
          <el-button type="primary" icon="el-icon-edit" @click="xyj">写游记</el-button>
        </el-row>
        <!-- 文章 -->
        <el-row type="flex" justify="space-between" v-for="(item,index) in article" :key="index">
          <!-- 文章内容样式1 -->
          <div class="post-list" v-if="item.images.length>1">
            <nuxt-link :to="`/post/detail?id=4`">
              <h4 class="post-title">{{item.title}}</h4>
              <p class="post-data" v-html="item.summary"></p>
              <el-row type="flex" justify="space-between" class="post-img">
                <img
                  :src="item1"
                  v-for="(item1,index1) in item.images"
                  :key="index1"
                  v-show="index1<3"
                />
              </el-row>
            </nuxt-link>
            <!-- 文章底部 -->
            <el-row type="flex" justify="space-between" class="post-info">
              <div class="post-info-left">
                <span style="margin-right: 10px">
                  <i class="el-icon-location-outline"></i>
                  {{item.cityName}}
                </span>
                <el-row class="post-info-left-img" type="flex">
                  by
                  <a href="#" style="color: orange">
                    <img
                      v-if="$store.state.user.userInfo.user"
                      :src="$axios.defaults.baseURL+item.account.defaultAvatar"
                    />
                    <span>{{item.account.nickname}}</span>
                  </a>
                </el-row>
                <span>
                  <i class="el-icon-view"></i>
                  {{item.watch}}
                </span>
              </div>
              <span class="post-info-right" style="margin-right: 10px;color:orange;">{{item.like}}赞</span>
            </el-row>
          </div>
          <!-- 文章内容样式2 -->
          <div class="post-list2" v-else>
            <el-col style="width:220px">
              <a href="#">
                <img class="post-list2-img" src="../../images/pic_sea.jpeg" />
              </a>
            </el-col>
            <el-col style="width:470px">
              <nuxt-link :to="`/post/detail?id=4`">
                <h4 class="post-title">{{item.title}}</h4>
                <p class="post-data" v-html="item.summary"></p>
              </nuxt-link>
              <!-- 文章底部 -->
              <el-row type="flex" justify="space-between" class="post-info">
                <div class="post-info-left">
                  <span style="margin-right: 10px">
                    <i class="el-icon-location-outline"></i>
                    {{item.cityName}}
                  </span>
                  <el-row class="post-info-left-img" type="flex">
                    by
                    <a href="#" style="color: orange">
                      <img
                        v-if="$store.state.user.userInfo.user"
                        :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar"
                      />
                      <span>{{item.account.nickname}}</span>
                    </a>
                  </el-row>
                  <span>
                    <i class="el-icon-view"></i>
                    {{item.watch}}
                  </span>
                </div>
                <span
                  class="post-info-right"
                  style="margin-right: 10px;color:orange;"
                >{{item.like}}赞</span>
              </el-row>
            </el-col>
          </div>
        </el-row>
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin-top: 10px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
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
      input: "",
      pageIndex: 0, // 当前页数
      pageSize: 2, // 显示条数
      // 文章数据
      article: [],
      total: 0
    };
  },
  components: {
    cblnav
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.articleData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.articleData();
    },
    // 封装获取文章请求
    articleData(city) {
      // console.log(city)
      this.$axios({
        url: "/posts",
        params: {
          city: city,
          _start: (this.pageIndex - 1) * this.pageSize,
          _limit: this.pageSize
        }
      }).then(res => {
        this.article = res.data.data;
        this.total = res.data.total;
        // console.log( 2,res);
      });
    },
    // 搜索城市
    searchcity() {
      this.articleData(this.input);
    },
    // 写游记
    xyj(){
      this.$router.push("/post/create")
    }
  },
  mounted() {
    // console.log(this.$route);
    this.articleData();

    // console.log(2, this.article);
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      console.log(to, from);
      this.input = to.query.city;
      // this.$axios({
      //   url: "/posts",
      //   params: {
      //     city: to.query.city
      //   }
      // }).then(res => {
      //   this.article = res.data.data;
      // });
      this.articleData(to.query.city);
    }
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
    a {
      &:hover {
        color: orange;
        text-decoration: underline;
      }
    }
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
// 文章内容1
.post-list {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  .post-img {
    margin: 15px 0;
    width: 700px;
    // box-sizing: border-box;
    img {
      width: 220px;
      height: 150px;
      object-fit: cover;
    }
  }
}
// 标题
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
// 内容
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
// 内容底部
.post-info-left {
  display: flex;
  font-size: 12px;
  color: #999;
  // align-items: center;
  .post-info-left-img {
    margin-right: 10px;
    img {
      width: 16px;
      height: 16px;
    }
  }
}
// 文章内容2
.post-list2 {
  width: 700px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;

  .post-list2-img {
    width: 100%;
    height: 100%;
  }
  .post-data {
    margin-bottom: 15px;
  }
}
</style>