<template>
  <div class="home">
    <header-top></header-top>
    <div class="gameContent" v-loading="loading">
      <div class="gameContail">
        <div class="searchContent">
          <div class="addBtn" @click="addGamePush">添加游戏</div>
          <div class="search">
            <i></i>
            <input v-model="searchText" type="text" placeholder="搜索游戏">
            <button @click="search" class="searchBtn">搜索</button>
          </div>
        </div>
        <div class="gameList">
          <img class="noData" v-if="gameList.length == 0" src="../assets/nodata.png" alt="">
          <ul>
            <li v-for="item in gameList">
              <div class="state" v-show="item.state == 2">已下线</div>
              <div class="gametop">
                <img :src="item.iconUrl" alt="">
                <div class="topText">
                  <h1>{{item.gameName}}</h1>
                  <span>上线时间：{{item.onlineTime}}</span>
                </div>
              </div>
              <div class="ganmePerson">
                <div class="regNum">注册人数：{{item.registerCount}}</div>
                <div class="activeNum">活跃人数：{{item.activeCount}}</div>
              </div>
              <div class="ganmeBtn">
                <div class="btn detaBtn">
                  <router-link :to="{ path: 'gameDetails', query: { gameKey: item.gameKey,gameName: item.gameName }}">
                    <i></i>
                    <span>详情</span>
                  </router-link>
                </div>
                <div class="btn bianjiBtn">
                  <router-link :to="{ path: 'gameEditor', query: { id: item.id,gameKey: item.gameKey,gameName: item.gameName }}">
                    <i></i>
                    <span>编辑</span>
                  </router-link>
                </div>
              </div>
            </li>

          </ul>
        </div>
        <div class="Pagination">

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="data.count"
            layout="total,prev, pager, next, jumper"
            :total="totalPage">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import headerTop from '@/components/headerTop'
  import {gameList, search} from "@/api/getData";
  import {ERR_OK,OVERDUE} from "@/api/config";

  export default {

    methods: {
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        this.data.pageNumber = val
        if (this.data.keyName) {
          this.search()
        } else {
          this._gameList()
        }
      },
      addGamePush() {
        this.$router.push('/addGame')
      },
      _gameList() {
        this.loading = true
        gameList(this.data).then((res) => {
          this.loading = false
          if (res.data.code == ERR_OK) {
            this.gameList = res.data.data.gameCumulative
            this.totalPage = res.data.data.allGameCount
          }else if(res.data.code == OVERDUE){
            this.$alert(res.data.errorMsg, '警告', {
              confirmButtonText: '确定',
              callback: action => {
                localStorage.clear();
                this.$router.push('/')
                this.$message({
                  message: '退出成功~',
                  type: 'success'
                });
              }
            });
          }else {
            this.$message.error(res.data.errorMsg);
          }

        })
      },
      search() {
        this.data.keyName = this.searchText
        this.loading = true
        search(this.data).then((res) => {
          this.loading = false
          if (res.data.code == ERR_OK) {
            this.gameList = res.data.data.gameInfoList
            this.totalPage = res.data.data.allGameCount
          }
        })
      }
    },
    data() {
      return {
        imgFlag:false,
        searchText: '',
        currentPage: 1,
        gameList: [],
        data: {
          token: window.localStorage.getItem('token'),
          pageNumber: 1,
          count: 8

        },
        loading: false,
        totalPage: 0,

      };
    },
    created() {
      this._gameList()
    },
    components: {
      headerTop
    }
  }
</script>

<style scoped>

</style>
