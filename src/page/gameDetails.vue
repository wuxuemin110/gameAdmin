<template>
  <div class="home">
    <header-top></header-top>
    <div class="gameContent">
      <div class="detailsContail">
        <div class="dataAll">
          <h1 class="name">数据统计</h1>
          <ul>
            <li>
              <div class="dataText">
                <p>今日注册人数</p>
                <h1>{{Alldata.todayRegister}}</h1>
              </div>
              <img src="../assets/zcrs.jpg" alt="">
            </li>
            <li>
              <div class="dataText">
                <p>今日活跃人数</p>

                <h1>{{Alldata.todayActive}}</h1>
              </div>
              <img src="../assets/hyrs.jpg" alt="">
            </li>
            <li>
              <div class="dataText">
                <p>注册总人数</p>
                <h1>{{Alldata.cumulativeRegister}}</h1>
              </div>
              <img src="../assets/zrs.jpg" alt="">
            </li>
          </ul>
        </div>
        <div class="dataRight">
          <div class="userSearch">
            <h1 class="name">用户查询</h1>
            <el-form ref="form" :model="parmData" label-width="80px">
              <div class="userItem">
                <div class="date">
                  <el-form-item label="注册时间">
                    <el-col :span="11">
                      <el-date-picker
                        type="date"
                        placeholder="开始注册时间 "
                        v-model="parmData.startRegisterDate"
                        style="width: 100%;"
                        @change="getStartTime"
                        >


                      </el-date-picker>

                    </el-col>
                    <el-col style="text-align: center" class="line" :span="2">-</el-col>
                   <el-col :span="11">
                      <el-date-picker
                        type="date"
                        placeholder="	截至注册时间 "
                        v-model="parmData.endRegisterDate"
                        style="width: 100%;"
                        @change="getEndTime"
                      ></el-date-picker>
                    </el-col>
                  </el-form-item>
                </div>
                <div class="date">
                  <el-form-item label="注册渠道">
                    <el-select v-model="parmData.registerChannel" placeholder="请选择注册渠道">
                      <el-option  :label="this.$route.query.gameName" :value="this.$route.query.gameKey"></el-option>

                    </el-select>
                  </el-form-item>
                </div>
                <div class="date">
                  <el-form-item label="账号状态">
                    <el-select v-model="parmData.playerState" placeholder="请选择账号状态">
                      <el-option label="用户正常" value="1"></el-option>
                      <el-option label="状态异常" value="2"></el-option>
                      <el-option label="禁止登录(永久)" value="3"></el-option>
                      <el-option label="禁止登录(7天)" value="4"></el-option>
                      <el-option label="禁止登录(15天)" value="5"></el-option>
                      <el-option label="禁止登录(30天)" value="6"></el-option>
                      <el-option label="已注销" value="7"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="userItem">
                <div class="date">
                  <el-form-item label="玩家ID">
                    <el-input class="ipt" v-model="parmData.playerId" placeholder="请输入玩家ID"></el-input>
                  </el-form-item>
                </div>
                <div class="date">
                  <el-form-item label="游戏账号">
                    <el-input class="ipt" v-model="parmData.playerName" placeholder="请输入游戏账号"></el-input>
                  </el-form-item>
                </div>
                <div class="date">
                  <el-form-item label="手机号">
                    <el-input class="ipt" v-model="parmData.playerPhone" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                </div>


                <div class="date">
                  <el-button @click="searchUserList" class="searchBtn" type="primary" icon="el-icon-search">查询</el-button>
                </div>
              </div>
            </el-form>
          </div>
          <div class="userList">
            <h1 class="name">用户列表

              <div @click="addVisible=true" class="addBtn">
                添加用户
              </div>
            </h1>
            <div class="table" v-loading="loading">
              <el-table
                :data="tableData"

                style="width: 100%">
                <el-table-column
                  label="玩家ID"
                  >

                  <template slot-scope="scope">

                    <span>{{ scope.row.id }}</span>
                  </template>
                </el-table-column>
                <el-table-column

                  label="游戏账号"
                  >
                  <template slot-scope="scope">

                    <span>{{ scope.row.loginName }}</span>
                  </template>

                </el-table-column>
                <el-table-column

                  label="注册手机号">


                  <template slot-scope="scope">

                    <span>{{ scope.row.phone }}</span>
                  </template>
                </el-table-column>
                <el-table-column

                  label="注册时间">

                  <template slot-scope="scope">

                    <span >{{ scope.row.registerTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column

                  label="最后登录">

                  <template slot-scope="scope">

                    <span>{{ scope.row.latestTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column

                  label="注册渠道">
                  <template slot-scope="scope">

                    <span >{{ scope.row.gameName }}</span>
                  </template>
                </el-table-column>
                <el-table-column

                  label="登录IP">
                  <template slot-scope="scope">

                    <span >{{ scope.row.registerIp }}</span>
                  </template>
                </el-table-column>
                <el-table-column


                  label="账号状态">
                  <template slot-scope="scope">

                    <span v-show="scope.row.state == 1" >正常</span>
                    <span class="pink" v-show="scope.row.state == 2" >状态异常</span>
                    <span class="pink" v-show="scope.row.state == 3" >禁止登录(永久)</span>
                    <span class="pink" v-show="scope.row.state == 4" >禁止登录(7天)</span>
                    <span class="pink" v-show="scope.row.state == 5" >禁止登录(15天)</span>
                    <span class="pink" v-show="scope.row.state == 6" >禁止登录(30天)</span>
                    <span class="pink" v-show="scope.row.state == 7" >已注销</span>
                  </template>

                </el-table-column>
                <el-table-column

                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="Pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="parmData.count"
              layout="total, prev, pager, next, jumper"
              :total="allUserCount">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--信息修改-->
    <el-dialog
      title="信息修改"
      :visible.sync="dialogVisible"
      width="20%"

    >

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="游戏账号" prop="name">
          <el-input disabled v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="注册手机号" prop="phone">
          <el-input disabled v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item  label="注册时间" prop="registerTime">
          <el-date-picker
            disabled
            v-model="ruleForm.registerTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="注册渠道" prop="registerChannelGameKey">
          <el-input disabled v-model="ruleForm.registerChannelGameName"></el-input>
        </el-form-item>

        <el-form-item label="账号状态" prop="accountState">
          <el-select v-model="ruleForm.accountState" placeholder="请选择账号状态">
            <el-option  label="用户正常" value="1"></el-option>
            <el-option  label="状态异常" value="2"></el-option>
            <el-option  label="禁止登录(永久)" value="3"></el-option>
            <el-option  label="禁止登录(7天)" value="4"></el-option>
            <el-option  label="禁止登录(15天)" value="5"></el-option>
            <el-option  label="禁止登录(30天)" value="6"></el-option>
            <el-option  label="已注销" value="7"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!--添加用户-->
    <el-dialog
      title="添加用户"
      :visible.sync="addVisible"
      width="20%"

    >

      <el-form :model="addform" :rules="rules" ref="addform" label-width="100px" class="demo-ruleForm">
        <el-form-item label="游戏账号" prop="name">
          <el-input  v-model="addform.name"></el-input>
        </el-form-item>
        <el-form-item label="游戏密码" prop="password">
          <el-input  v-model="addform.password"></el-input>
        </el-form-item>
        <el-form-item label="注册手机号" prop="phone">
          <el-input  v-model="addform.phone"></el-input>
        </el-form-item>
        <el-form-item  label="注册时间" prop="registerTime">
          <el-date-picker

            v-model="addform.registerTime"
            type="date"
            @change="getAddTime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="注册渠道" prop="registerChannelGameName">
          <el-input disabled  v-model="addform.registerChannelGameName"></el-input>
        </el-form-item>

        <el-form-item label="账号状态" prop="accountState">
          <el-select v-model="addform.accountState" placeholder="请选择账号状态">
            <el-option  label="用户正常" value="1"></el-option>
            <el-option  label="状态异常" value="2"></el-option>
            <el-option  label="禁止登录(永久)" value="3"></el-option>
            <el-option  label="禁止登录(7天)" value="4"></el-option>
            <el-option  label="禁止登录(15天)" value="5"></el-option>
            <el-option  label="禁止登录(30天)" value="6"></el-option>
            <el-option  label="已注销" value="7"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(addform)">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import headerTop from '@/components/headerTop'
  import {getAllData,userList,getChannel,submitEdit,addUser} from '@/api/getData'
  import {ERR_OK,OVERDUE} from "../api/config";


  export default {
    data() {
      return {

        tableData: [],
        Alldata:{},
        currentPage:1,
        parmData:{
          pageNumber:1,
          count:6,
          playerId:null,
          playerName:null,
          playerPhone:null,
          registerChannel:this.$route.query.gameKey,
          playerState:null,
          startRegisterDate:null,
          endRegisterDate:null,

        },
        allUserCount:0,
        loading: false,
        channelList:[],
        dialogVisible: false,
        ruleForm: {
          name: '',
          password: '',
          phone:'',
          registerTime:'',
          registerChannelGameName:'',
          accountState:'',
          userId:''
        },
        addVisible:false,
        rules: {
          name: [
            { required: true, message: '请输入游戏账号', trigger: 'blur' },

          ],
          password: [
            { required: true, message: '请输入游戏密码', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入注册手机号', trigger: 'blur' },

          ],
          accountState: [
            {  required: true, message: '请至少选择一个账号状态', trigger: 'change' }
          ]
        },
        addform:{
          token:window.localStorage.getItem('token'),
          name: '',
          password: '',
          phone:'',
          registerTime:'',
          registerChannelGameKey:this.$route.query.gameKey,
          accountState:'',
          registerChannelGameName:this.$route.query.gameName
        }

      }
    },
    created(){
      this.getAllData()
      this.userList()
      //this.getChannel()
    },


    methods: {
      submitEdit(){
        switch (this.ruleForm.accountState){
          case '用户正常':
            this.ruleForm.accountState =1
            break;
          case  '状态异常':
            this.ruleForm.accountState =2
            break;
          case '禁止登录(永久)':
            this.ruleForm.accountState =3
            break;
          case  '禁止登录(7天)':
            this.ruleForm.accountState =4
            break;
          case '禁止登录(15天)':
            this.ruleForm.accountState =5
            break;
          case '禁止登录(30天)':
            this.ruleForm.accountState =6
            break;
          case  '已注销':
            this.ruleForm.accountState =7
            break;
        }


        let editData = {
          token:window.localStorage.getItem('token'),
          userId:this.ruleForm.userId,
          accountState:this.ruleForm.accountState
        }
        submitEdit(editData).then((res)=>{
          if(res.data.code == ERR_OK){
            this.dialogVisible = false
            this.$message({
              message: res.data.successMsg,
              type: 'success'
            });

            setTimeout((res)=>{
              window.location.reload()
            },1000)

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
      submitForm(addform) {
        console.log(addform)
        this.$refs.addform.validate((valid) => {
          if (valid) {
            this.addUser();
          } else {
            this.$message.error('请填写必选项~');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      handleEdit(index, row) {
        console.log(row);
        this.dialogVisible = true;
        this.ruleForm.name = row.loginName
        this.ruleForm.password = row.loginName
        this.ruleForm.phone = row.phone
        this.ruleForm.registerTime = row.registerTime
        this.ruleForm.registerChannelGameName = row.gameName
        this.ruleForm.userId = row.id
        switch (row.state){
          case 1:
            this.ruleForm.accountState =   '用户正常'
            break;
          case 2:
            this.ruleForm.accountState =   '状态异常'
            break;
          case 3:
            this.ruleForm.accountState =   '禁止登录(永久)'
            break;
          case 4:
            this.ruleForm.accountState =   '禁止登录(7天)'
            break;
          case 5:
            this.ruleForm.accountState =   '禁止登录(15天)'
            break;
          case 6:
            this.ruleForm.accountState =   '禁止登录(30天)'
            break;
          case 7:
            this.ruleForm.accountState =   '已注销'
            break;
        }
        //this.ruleForm.accountState = row.state


      },
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        this.parmData.pageNumber = val
        this.userList()

      },
      getAllData(){
        const gameKey = this.$route.query.gameKey
        getAllData(gameKey).then((res)=>{
          if(res.data.code == ERR_OK){
            this.Alldata = res.data.data

          }
        })
      },
      userList(){
        this.loading = true
        userList(this.parmData).then((res)=>{
          this.loading = false
          if(res.data.code == ERR_OK){
              this.tableData = res.data.data.gameUserList

              this.allUserCount = res.data.data.allUserCount
          }
        })
      },
      searchUserList(){

        if(this.parmData.startRegisterDate !== undefined && this.parmData.startRegisterDate !== '' ){
          this.parmData.startRegisterDate = this.parmData.startRegisterDate  + ' ' + '00:00:00'
        }

        if(this.parmData.endRegisterDate !== undefined &&  this.parmData.endRegisterDate !== ''){
          this.parmData.endRegisterDate=this.parmData.endRegisterDate  + ' ' + '23:59:59'
        }
        this.parmData.pageNumber = 1
        this.userList()

      },
      /*注册渠道*/
      getChannel(){
        getChannel().then((res)=>{
          if(res.data.code == ERR_OK){
            this.channelList = res.data.data

          }
        })
      },
      getStartTime(val) {
        this.parmData.startRegisterDate=val
      },
      getEndTime(val){
        this.parmData.endRegisterDate=val
      },
      getAddTime(val){
        this.addform.registerTime = val
      },
      addUser(){

        addUser(this.addform).then((res)=>{
          if(res.data.code == ERR_OK){
            this.$message({
              message: res.data.successMsg,
              type: 'success'
            });
            this.addVisible = true

            setTimeout((res)=>{
              window.location.reload()
            },1000)
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
      }
    },

    components: {
      headerTop
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0;
  }
  .ipt{
    width: 140px;
  }
  .searchBtn{
    margin-left: 50px;
    background-color: #00c4c2;
    border-color: #00c4c2;
  }
/*
  .el-button:focus, .el-button:hover {
    color: #00c4c2;
    border-color: #00c4c2;
  }*/

  .searchBtn:hover{
    color: #FFF;
  }
  .searchBtn:focus{
    color: #FFF;
  }

  .el-form-item{
    margin-bottom: 20px;
  }

</style>
