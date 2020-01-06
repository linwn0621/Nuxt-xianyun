<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) in airlist" :key="index" :data="item"></FlightsItem>
        </div>
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightsData.total"
          ></el-pagination>
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
  <FlightsAside/>
      </div>
    </el-row>
  </section>
</template>

<script>
// 引入头部组件
import FlightsListHead from "@/components/air/flightsListHead.vue";
// 引入列表组件
import FlightsItem from "@/components/air/flightsItem.vue";
// 引入过滤布局
import FlightsFilters from "@/components/air/FlightsFilters.vue";
// 引入历史记录侧边栏
import FlightsAside from "@/components/air/flightsAside.vue"
import moment from "moment";

export default {
  data() {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 创建缓存数据筛选时不会被修改
      cacheFlightsData: {
        // 缓存一份数据，只会修改一次
        flights: [],
        info: {},
        options: {}
      },
      //  机票列表
      // airlist: [],
      // 分页
      pageIndex: 1, // 当前页数
      pageSize: 5 // 显示条数
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  computed: {
    // 计算属性可以一次监控多个this依赖项变化
    airlist() {
      if (!this.flightsData.flights) return [];
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },
  methods: {
    // 切换每页条数时
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      console.log(this.flightsData);
      this.pageSize = val;
      this.pageIndex = 1;
      // this.fgjp();
    },
    // 切换页码时
    handleCurrentChange(val) {
      this.pageIndex = val;
      //   // console.log(`当前页: ${val}`);
      // this.fgjp();
    },
    // 获取机票列表数据
    getairdata() {
      this.$axios({
        url: "/airs",
        params:
          // 获取到url中的数据
          this.$route.query
      }).then(res => {
        console.log("机票列表数据", res);
        // 取出数据
        this.flightsData = res.data;
        // ...可以复制一份新数据赋值给缓存
        this.cacheFlightsData = { ...res.data };
        // 取出机票列表数据
        // 默认页面加载时显示5条数据
        // this.airlist = this.flightsData.flights.slice(0, 5);
        // console.log(this.airlist);
     
      });
    },
    setDataList(arr) {
      console.log(arr)
      if(arr){ 
      //  筛选后默认现在第一页
      this.pageIndex = 1;
      //  筛选后的总条数
      this.flightsData.total = arr.length;
      // 筛选后机票数据
       this.flightsData.flights=arr
      }
       
    }
    // 分割机票数据显示条数
    // fgjp() {
    //   // 重新获取机票列表数据
    //   this.airlist = this.flightsData.flights.slice(
    //     (this.pageIndex - 1) * this.pageSize,
    //     this.pageIndex * this.pageSize
    //   );
    // }
  },
  mounted() {
    this.getairdata();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>