<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="内容标题" prop="title">
                <el-input v-model="ruleForm.title" style="width:410px;"></el-input>
            </el-form-item>
            <el-form-item label="副标题" prop="sub_title">
                <el-input v-model="ruleForm.sub_title" style="width:410px;"></el-input>
            </el-form-item>
            <el-form-item label="所属类别" style="margin-right:165px">
                <el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
                    <el-option v-for="item in categories" :key="item.category_id" :label="item.title" :value="item.category_id">
                        <span v-if="item.class_layer != 1">|-</span>
                        <span>{{item.title}}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否发布">
                <el-switch v-model="ruleForm.status" active-text="是"></el-switch>
            </el-form-item>
            <el-form-item label="推荐类型">
                <el-switch v-model="ruleForm.is_slide" active-text="轮播图"></el-switch>
                <el-switch v-model="ruleForm.is_top" active-text="置顶"></el-switch>
                <el-switch v-model="ruleForm.is_hot" active-text="推荐"></el-switch>
            </el-form-item>
            <!-- 封面上传 -->
            <el-form-item label="上传封面" prop="imgList" style="display:block">
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg"
                    :on-success="imgUpload" :on-remove="imgRemove" :file-list="ruleForm.imgList" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>            
            <!-- 附件上传 -->
            <el-form-item label="上传附件" style="display:block">
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile"
                    :on-success="fileUpload" :file-list="ruleForm.fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>           
            <el-form-item label="商品货号" prop="goods_no">
                <el-input v-model="ruleForm.goods_no" style="width:165px;"></el-input>
            </el-form-item>
            <el-form-item label="库存数量" prop="stock_quantity">
                <el-input v-model="ruleForm.stock_quantity" style="width:165px;"></el-input>
            </el-form-item>
            <el-form-item label="市场价格" prop="market_price">
                <el-input v-model="ruleForm.market_price" style="width:165px;"></el-input>
            </el-form-item>
            <el-form-item label="销售价格" prop="sell_price">
                <el-input v-model="ruleForm.sell_price" style="width:165px;"></el-input>
            </el-form-item>
            <el-form-item label="摘要" prop="zhaiyao" style="display:block">
                <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
            </el-form-item>
            <el-form-item label="详细内容" prop="content">
                <quill-editor v-model="ruleForm.content"></quill-editor>
            </el-form-item>
            <el-form-item style="display:block">
                <el-button type="primary" @click="submitForm('ruleForm')">提交保存</el-button>
                <el-button @click="resetForm('ruleForm')">返回上一页</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'
    export default {
        data() {
            return {
                id:null,
                ruleForm: {},
                rules: {
                    title: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    sub_title: [
                        { required: true, message: '请输入副标题', trigger: 'blur' },
                        { min: 5, max: 50, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                    ],
                    imgList: [
                        { required: true, message: '请选择一张封面图', trigger: 'submit' }
                    ],
                    goods_no: [
                        { required: true, message: '请输入商品编号', trigger: 'blur' }
                    ],
                    stock_quantity: [
                        { required: true, message: '请输入库存', trigger: 'blur' }
                    ],
                    market_price: [
                        { required: true, message: '请输入市场价', trigger: 'blur' }
                    ],
                    sell_price: [
                        { required: true, message: '请输入销售价', trigger: 'blur' }
                    ],
                    zhaiyao: [
                        { required: true, message: '请输入摘要', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入描述信息', trigger: 'blur' }
                    ]
                },
                categories:{}
            }
        },
        methods: {
            // 获取当前id商品的数据
            getGoods(){
                this.$http.get(this.$api.gsDetail + this.id).then(res=>{
                    this.ruleForm = res.data.message;
                    this.ruleForm.category_id = +this.ruleForm.category_id;
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.goodsModify();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getCategory(){
                this.$http.get(this.$api.ctList + "goods").then(res=>{
                    this.categories = res.data.message;
                })
            },
            imgUpload(response, file, fileList){
                this.ruleForm.imgList = [response];                
            },
            fileUpload(response, file, fileList){
                this.ruleForm.fileList.push(response);
            },
            goodsModify(){
                this.$http.post(this.$api.gsEdit + this.id,this.ruleForm).then(res=>{
                    if (res.data.status == 0) {
                        this.$alert("修改成功",{
                            confirmButtonText: '确定',
                            callback: action=>{
                                this.$router.push({name:'goodsCtList'});
                            }
                        })
                    }
                })
            },
            imgRemove(file, fileList){
                this.ruleForm.imgList = [];                
            }
        },
        created () {
            this.id = this.$route.params.id;
            this.getGoods();
            this.getCategory();
        },
         resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        components: {
            quillEditor
        }
    }
</script>

<style scoped>
.el-form-item {
    display: inline-block;
}
.el-form {
    padding-right: 34px;
}
.upload-demo {
    margin-bottom: 35px;
}
</style>