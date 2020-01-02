<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPass">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPass"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 验证两次密码是否相同
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkPass: ""
      },

      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, message: "请输入11位手机号码", trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入名字", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        papasswordss: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      // 判断手机号码是否为空
      if (!this.form.username) {
        this.$alert("手机号不能为空", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      // 判断手机号码是否为11位
      if (this.form.username.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // 调用接口发送验证码
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: this.form.username }
      }).then(res => {
        console.log(res);
      });
    },

    // 注册
    handleRegSubmit() {
      // 二次验证
      this.$refs.form.validate(valid => {
        if (valid) {
          // 提取出from中的checkPass
          const { checkPass, ...props } = this.form;
          console.log(props);
   this.$store.dispatch("user/register",props).then(res => {
            // 成功提示
            if (res === true) {
              this.$message({
                message: "注册成功，正在跳转",
                type: "success"
              });
            } else if (res === false) {
              this.$message({
                message: "注册失败",
                type: "error"
              });
            }
          });
          // this.$axios({
          //   url: `/accounts/register`,
          //   method: "POST",
          //   data: props
          // }).then(res => {
          //   console.log(11, res);
          //   if (res.data.token) {
          //     this.$message({
          //       message: "恭喜你，注册成功",
          //       type: "success"
          //     });
          //   }
          // });
        } else {
          this.$message({
            message: "请填写完整",
            type: "error"
          });
          return;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>