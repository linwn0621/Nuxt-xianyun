<template>
  <div class="search-form">
    <h1></h1>
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" :model="form" label-width="80px">
      <el-form-item label="出发城市" prop="departCity">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          @blur="handleblurDepart"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市" prop="destCity">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          @blur="handleblurDest"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间" prop="departDate">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          v-model="form.departDate"
          :picker-options="pickerOptions1"
          style="width: 100%;"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
// 引入时间格式化插件
import moment from "moment";
export default {
  data() {
    return {
      form: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "", // 到达城市
        destCode: "", // 到达城市代码
        departDate: "" // 日期字符串
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      depart: [],
      dest: [],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      // this.currentTab = index;
      if (index === 1) {
        this.$confirm("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },
    // 输入出发城市失去焦点时默认选中第一项建议
    handleblurDepart() {
      if (this.depart.length > 0) {
        this.form.departCode = this.depart[0].sort;
      }
    },
    // 输入到达城市失去焦点时默认选中第一项建议
    handleblurDest() {
      if (this.dest.length > 0) {
        this.form.destCode = this.dest[0].sort;
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      // 如果输入为空不弹出建议框
      if (value.trim() === "") {
        cb([]);
        return;
      } else {
        // console.log(value, cb)
        this.$axios({
          url: "/airs/city",
          params: {
            name: value
          }
        }).then(res => {
          const { data } = res.data;

          this.depart = data.map(item => {
            item.value = item.name.replace("市", "");
            return item;
          });
          // console.log(1, this.depart);
          // console.log(2, data);
          cb(this.depart);
        });
      }
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      // cb([{ value: 88 }, { value: 2 }, { value: 3 }]);
      // 如果输入为空不弹出建议框
      if (value.trim() === "") {
        cb([]);
        return;
      } else {
        this.$axios({
          url: "/airs/city",
          params: {
            name: value
          }
        }).then(res => {
          const { data } = res.data;

          this.dest = data.map(item => {
            item.value = item.name.replace("市", "");
            return item;
          });
          // console.log( this.dest);
          cb(this.dest);
        });
      }
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(item);
      this.form.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      // 取出数据
      const { departCity, departCode, destCity, destCode } = this.form;

      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      // 表单验证
      const rules = {
        depart: {
          value: this.form.departCity,
          message: "请选择出发城市"
        },
        dest: {
          value: this.form.destCity,
          message: "请选择到达城市"
        },
        departDate: {
          value: this.form.departDate,
          message: "请选择出发时间"
        }
      };
      console.log(Object.keys(rules));
      let valid = true;
      Object.keys(rules).forEach(v => {
        console.log(v);
        if (!rules[v].value) {
          valid = false;
          this.$confirm(rules[v].message, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        }
      });
      if (!valid) {
        return;
      }
      // 跳转到机票页
      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
      // console.log(11, this.form);
      // 保存到store
      this.$store.commit("air/setHistory", this.form);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>