<template>
    <div class="header_container">
        <div class="Breadcrumb">

          <el-breadcrumb >
            <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>

            <el-breadcrumb-item v-if="$route.meta == '游戏详情页'">{{gameName}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta == '添加游戏'">添加游戏</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta == '编辑游戏'">{{gameName}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta == '用户管理'">用户管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="userName">
          <img src="../assets/user.png" alt="">
          <span>{{myDate}}好，{{name}}</span>
        </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          name: window.localStorage.getItem('userName'),
          gameName: this.$route.query.gameName,
          myDate: ''
        }
      },
      created() {
        this.getDate()
      },
      methods: {
        getDate() {
          const myData = new Date();
          const myHours = parseInt(myData.getHours());
          if (0 < myHours &&  myHours<12) {

            this.myDate = '早上'
          } else if (12 < myHours && myHours < 18) {

            this.myDate = '下午'
          }else {
            this.myDate = '晚上'
          }
        }
      }
    }
</script>

<style scoped>

</style>
