<template>
  <div class="home">
    <header-top></header-top>
    <div class="gameContent">
      <div class="gameContail">
        <div class="addGame">
          <h1 class="name">
            基本信息
            <span>修改基本信息</span>
          </h1>
          <div class="gameForm">
            <el-form v-loading="loading" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <div class="el-form-item" prop="iconUrl">
                <span class="picName el-form-item__label" style="width: 100px">ICON</span>
                <el-upload
                  class="avatar-uploader"
                  :action="((hostUrl) + 'game/icon/upload')"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :on-error="errorUpload"
                  :on-progress="progressUpload"
                >
                  <img v-if="ruleForm.iconUrl" :src="ruleForm.iconUrl" class="avatar">
                  <i v-else class="acatar-Icon">+</i>
                </el-upload>

              </div>
              <div class="el-form-item">
                <div class="tipText">
                  <img src="../assets/tip.png" alt="">
                  <span>仅支持JPG、PNG格式，文件小于1M(方形图)</span>
                </div>
              </div>
              <el-form-item  label="外链地址" prop="address">
                <el-input placeholder="请输入外链地址" v-model="ruleForm.iconUrl"></el-input>
              </el-form-item>
              <el-form-item label="游戏名字" prop="gameName">
                <el-input placeholder="请输入游戏名字" v-model="ruleForm.gameName"></el-input>
              </el-form-item>
              <el-form-item label="官网链接" prop="officialNetwork">
                <el-input placeholder="请输入官网链接" v-model="ruleForm.officialNetwork"></el-input>
              </el-form-item>
              <el-form-item label="Bundle ID" prop="gameKey">
                <el-input placeholder="请输入Bundle ID" v-model="ruleForm.gameKey"></el-input>
              </el-form-item>

              <el-form-item label="游戏状态" prop="state">
               <el-select @change = 'changeState' v-model="ruleForm.state" placeholder="请选择状态">
                 <el-option  label="上线" value="1"></el-option>
                 <el-option  label="下线" value="2"></el-option>
                 <el-option  label="删除" value="3"></el-option>
               </el-select>
             </el-form-item>
              <el-form-item label="备注" prop="gameRemark">
                <el-input placeholder="请填写备注" v-model="ruleForm.gameRemark"></el-input>
              </el-form-item>
              <el-form-item label="上线时间" required>

                <el-date-picker
                  v-model="ruleForm.onlineTime"
                  type="date"
                  @change="getSTime" format="yyyy-MM-dd"

                  placeholder="选择日期时间">
                </el-date-picker>

              </el-form-item>

              <el-form-item label="游戏介绍" prop="gameIntroduce">
                <el-input placeholder="请输入游戏介绍"  type="textarea" v-model="ruleForm.gameIntroduce"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import headerTop from '@/components/headerTop'
  import {gameEditor,gameDetails} from '@/api/getData'
  import {ERR_OK,OVERDUE} from "@/api/config";
  import {HOST_URL} from "@/api/hotsurl";

  export default {
    data() {
      return {
        hostUrl:HOST_URL,
        loading:false,
        ruleForm: {
          token:window.localStorage.getItem('token'),
          id:this.$route.query.id,
          gameName: '',
          officialNetwork:'',
          gameKey:'',
          gameRemark:'',
          onlineTime: null,
          gameIntroduce: '',
          iconUrl: '',
          state:''
        },
        rules: {
          gameName: [
            { required: true, message: '请输入游戏名字', trigger: 'blur' },
          ],
          gameKey: [

            { required: true, message: '请输入Bundle ID', trigger: 'blur' },
          ]

        },
        msgList:{}
      };
    },
    created(){
      this.getGameDesc()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid && this.ruleForm.iconUrl) {

            if(this.ruleForm.onlineTime == undefined){
              this.ruleForm.onlineTime = ''
            }

            switch (this.ruleForm.state){
              case '上线':
                this.ruleForm.state = 1
                break;
              case '下线':
                this.ruleForm.state = 2
                break;
              case '删除':
                this.ruleForm.state = 3
                break;
            }
            gameEditor(this.ruleForm).then((res)=>{
              if(res.data.code == ERR_OK){
                this.$message({
                  showClose: true,
                  message: '保存成功~',
                  type: 'success'
                });

                this.$router.push('/manage')

              }else if(res.data.code == OVERDUE ){
                this.$alert(res.data.errorMsg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    window.localStorage.clear()
                    this.$router.push('/')
                  }
                });
              }else {
                this.$message({
                  showClose: true,
                  message: res.data.errorMsg,
                  type: 'warning'
                });
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: '请输入必选项~',
              type: 'warning'
            });
            return false;
          }
        });
      },
      changeState(val){

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        if(res.code == ERR_OK){
          this.ruleForm.iconUrl =res.data.icon_url;
          this.loading = false
        }else {
          this.$message({
            showClose: true,
            message: res.data.errorMsg,
            type: 'warning'
          });
        }
      },
      beforeAvatarUpload(file) {
        const isMatch = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp'
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isMatch) {
          this.$message.error('图片格式不匹配!');
          return false;
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
          return false;
        }
      },
      getSTime(val) {

        this.ruleForm.onlineTime=val
      },
      errorUpload(){
        this.loading = false

      },
      progressUpload(file){
        this.loading = true
      },
      getGameDesc(){
        let gameKey = this.$route.query.gameKey
        gameDetails(gameKey).then((res)=>{

          if(res.data.code == ERR_OK){
            this.msgList = res.data.data
            this.ruleForm.gameIntroduce =  this.msgList.gameIntroduce
            this.ruleForm.gameKey = this.msgList.gameKey
            this.ruleForm.gameName = this.msgList.gameName
            this.ruleForm.gameRemark = this.msgList.gameRemark
            this.ruleForm.iconUrl = this.msgList.iconUrl
            this.ruleForm.officialNetwork= this.msgList.officialNetwork
            this.ruleForm.onlineTime= this.msgList.onlineTime
            switch (res.data.data.state){
              case 1:
                this.ruleForm.state = '上线'
                break;
              case 2:
                this.ruleForm.state = '下线'
                break;
              case 3:
                this.ruleForm.state = '删除'
                break;
            }
          }else if(res.data.code == OVERDUE ){
            this.$alert(res.data.errorMsg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                window.localStorage.clear()
                this.$router.push('/')
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
  .avatar-uploader .el-upload{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-form-item .picName{
    float: left;
  }
  .el-form-item .avatar-uploader{
    float: left;

  }

  .el-form-item .avatar-uploader img{
    border-radius: 25px;
  }
  .acatar-Icon{
    display:block;
    width: 115px;
    height: 115px;
    border-radius: 25px;
    background: #f1f2f7;
    text-align: center;
    line-height: 115px;
    color: #dce0f6;
    font-size: 40px;
  }

  .picName:before {
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }

  .tipText {
    display: flex;
    align-items: center;
    color: #666666;
    font-size: 16px;
    padding-left: 100px;
  }
  .tipText img{
    margin-right: 10px;
  }

  .el-upload img{
    width: 115px;
    height: 115px;
  }
</style>
