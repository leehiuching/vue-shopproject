<template>
  <div class="login">
    <h1>后台管理系统</h1>
    <el-form label-position="left" :rules="rules" label-width="80px" :model="formLabelAlign" ref='ruleForm2'>
      <el-form-item label="用户名" prop="uname">
        <el-input v-model="formLabelAlign.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="upwd">
        <el-input v-model="formLabelAlign.upwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    function unameFn(rule, value, callback) {
      if (value == '') {
        callback(new Error('账号不能为空'));
      }else {
        callback();
      }
    }
    function upwdFn(rule, value, callback) {
      if (value == '') {
        callback(new Error('密码不能为空'));
      }else {
        callback();
      }
    }
    return {
      formLabelAlign:{
        uname:'',
        upwd:''
      },
      rules:{
        uname: [
          {required: true,message: '请填写账号', trigger: 'blur'},
          {min: 5,max: 18,message: '账号在6~18位',trigger: 'blur'},
          {validator:unameFn,trigger:'blur'}
        ],
        upwd: [
          {validator:upwdFn,trigger: 'blur'},
          { pattern:/^\w{6,18}$/, message: '密码在6~18位', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    login(){
      this.$http.post(this.$api.login,this.formLabelAlign).then(res=>{
        if (res.data.status == 0) {
          // this.$router.push({name:"admin"});
          let nextPage = this.$route.query.nextPage;
          this.$router.push({path: nextPage ? nextPage:'/admin'});
        }else {
          this.$alert(res.data.message);
        }
      })
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) =>{
        if (valid) {
          this.login();
        }else {
          alert('不能登陆');
        }
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped lang=less>
.login {
  height: 200px;
  width: 500px;
  border: 1px solid #fff;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding: 20px;
  h1 {
    font-size: 20px;
    position: absolute;
    top: -50px;
    width: 100%;
    text-align: center;
    color: #fff;
  }
}
</style>


