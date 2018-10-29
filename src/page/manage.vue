<template>
  <div class="contains fillcontain">
    <div class="headerTop">
        <div class="headerName">
          <img src="../assets/logo.png" alt="">
          <span>SDK后台管理系统</span>
        </div>
        <div class="headerEsc" @click="quit">
          <img src="../assets/esc.png" alt="">
          <span>退出系统</span>
        </div>
    </div>
    <div class="manage_page fillcontain">
      <el-row style="height: 100%;">
        <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
          <ul class="sliderTab">
            <li>
              <router-link to="/manage">
                <i class="indexIcon ICON"></i>
                <span>首页</span>
                <i class="arrowRight"></i>
              </router-link>
            </li>
            <li>
             <router-link to="/userAdmin">
                <i class="userIcon ICON"></i>
                <span>用户管理</span>
                <i class="arrowRight"></i>
              </router-link>
            </li>
          </ul>
        </el-col>
        <el-col :span="20" style="height: 100%;overflow: auto;background: #f1f2f7">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
    export default {
      data(){
        return{
          a:'111'
        }
      },
      created(){
        let token = window.localStorage.getItem('token')
        if(token == undefined){
          this.$message.error('请登录~');
          this.$router.push('/')
        }
      },
      methods:{
          quit(){

            this.$confirm('您将退出系统, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                message: '退出成功~',
                type: 'success'
              });
              localStorage.clear();
              this.$router.push('/')
            })

          }
      }
    }
</script>

<style scoped>

</style>
