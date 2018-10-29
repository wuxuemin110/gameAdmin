<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>SDK游戏后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="name">
            <el-input v-model="loginForm.name" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input @keyup.enter.native="submitForm" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary"  @click="submitForm" class="submit_btn">登录</el-button>
          </el-form-item>
        </el-form>

      </section>
    </transition>
  </div>
</template>

<script>
  import {login} from "@/api/getData";
  import {ERR_OK} from "@/api/config";

  export default {
       data(){
         return{
           loginForm: {
             name: '',
             password: ''
           },
           rules: {
             name: [
               { required: true, message: '请输入用户名', trigger: 'blur' },
             ],
             password: [
               { required: true, message: '请输入密码', trigger: 'blur' }
             ],
           },
           showLogin: false
         }
       },
      mounted(){
        this.showLogin = true;
      },

      methods:{
        submitForm(){
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
              login(this.loginForm).then((res) => {
                if (res.data.code == ERR_OK) {
                  localStorage.setItem('userId', res.data.data.id);
                  localStorage.setItem('userName', res.data.data.name);
                  localStorage.setItem('iphone', res.data.data.phone);
                  localStorage.setItem('token', res.data.data.token)
                  this.$message({
                    message: '登录成功~',
                    type: 'success'
                  });
                  this.$router.push('/manage')
                } else {
                  this.$message.error(res.data.errorMsg);
                }
              })
            }
          })
        }
      }
    }
</script>

<style lang="less" scoped>

</style>
