<template>
  <div class="menus" @mouseleave="leave">
    <div class="box">
      <!-- 侧边导航栏 -->
      <div
        :class="[menu,{active:current===index}]"
        v-for="(item,index) in form"
        :key="index"
        @mouseenter="enter(item,index)"
      >{{item.type}}</div>
    </div>
    <!-- 弹出框 -->
    <div class="sub-cat" v-if="isshow">
      <div v-for="(item,index) in citys.children" :key="index">
        <a href="#">
          <span class="num">{{index+1}}</span>
          <strong>{{item.city}}</strong>
          <span class="desc">{{item.desc}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: -1,
      menu: "menu",
      form: [], //导航菜单名
      citys: [], //导航菜单项内容
      isshow: false //弹出框显示隐藏
    };
  },

  mounted() {
    // 请求城市数据
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(1, res);
      this.form = res.data.data;
    });
  },
  methods: {
    // 鼠标移出
    enter(item, index) {
      this.citys = item;
      this.current = index;
      this.isshow = true;
    },
    // 鼠标移出
    leave() {
      this.current = -1;
      this.isshow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  border: 1px solid #ddd;
  border-bottom: none;
  border-right: none;
  width: 260px;
  .menu {
    line-height: 40px;
    padding: 0 20px;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    position: relative;
    z-index: 3;
    &::after {
      content: "";
      display: block;
      width: 10px;
      height: 10px;
      border-top: 1px solid #ddd;
      border-right: 1px solid #ddd;
      position: absolute;
      right: 20px;
      top: 15px;
      transform: rotate(45deg);
    }
  }
}
.sub-cat {
  width: 350px;
  position: absolute;
  padding: 10px 20px;
  left: 260px;
  top: 0;
  background: white;
  box-sizing: border-box;
  border: 1px solid #ddd;
  z-index: 2;
  color: #ffa500;
  font-size: 14px;
  .num {
    font-size: 24px;
    font-style: oblique;
  }
  strong {
    margin: 0 10px;
    &:hover {
      text-decoration: underline;
    }
  }

  .desc {
    color: #999;
    &:hover {
      text-decoration: underline;
    }
  }
}
.active {
  color: #ffa500;
  border-right-color: white !important;
  &::after {
    content: "";
    border-top-color: #ffa500 !important;
    border-right-color: #ffa500 !important;
  }
}
</style>