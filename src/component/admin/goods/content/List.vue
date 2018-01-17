<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>购物商城</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
            <el-button size="mini" plain icon="el-icon-plus">新增</el-button>
            <el-button size="mini" plain icon="el-icon-check" @click="seleAll">全选</el-button>
            <el-button size="mini" plain icon="el-icon-delete" @click="delListData">删除</el-button>
            <el-input
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="gsListQuery.input21" 
                size="mini"
                style="width:180px;float:right"
                @blur="getListData">
            </el-input>
        </div>
        <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%"
            :data="tableData3" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="标题">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">
                            <img :src="scope.row.imgurl" alt="" width="200">
                        </div>
                        <router-link :to="{name:'goodsCtEdit',params: {id: scope.row.id}}">{{scope.row.title}}</router-link>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="categoryname" label="所属类别" width="120"></el-table-column>
            <el-table-column prop="stock_quantity" label="库存" width="120"></el-table-column>
            <el-table-column prop="market_price" label="市场价" width="120"></el-table-column>
            <el-table-column prop="sell_price" label="销售价" width="120"></el-table-column>
            <el-table-column label="状态" width="120">
                <template slot-scope="scope">
                    <i :class="['el-icon-picture',scope.row.is_slide == 1?'active':'']" 
                    @click="changeStatus(scope.row.id,'is_slide',scope.row.is_slide == 1? false: true)"></i>
                    <i :class="['el-icon-upload2', scope.row.is_top == 1? 'active': '']"
                    @click="changeStatus(scope.row.id,'is_top',scope.row.is_top == 1? false: true)"></i>
                    <i :class="['el-icon-star-on', scope.row.is_hot == 1? 'active': '']"
                    @click="changeStatus(scope.row.id,'is_hot',scope.row.is_hot == 1? false: true)"></i>
                </template>
            </el-table-column>
            <el-table-column label="日期" width="120">
                <template slot-scope="scope">
                    <router-link :to="{name: 'goodsCtEdit',params:{id: scope.row.id}}">修改</router-link>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="gsListQuery.pageIndex"
            :page-sizes="page.pageSizes"
            :page-size="gsListQuery.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tableData3: [
                    {
                        id: 103,        
                        title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
                        is_top: 1,
                        is_hot: 1,
                        is_slide: 1,      
                        categoryname: "男装",
                        img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
                        imgurl:"http://139.199.192.48:6060/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
                        goods_no: "NZ0000000002",
                        stock_quantity: 200,
                        market_price: 1000,
                        sell_price: 800   
                    }
                ],
                gsListQuery: {
                    pageIndex: 1,
                    pageSize: 10,
                    input21:''
                },
                page: {
                    pageSizes: [10,20,30,40],
                    total:100
                },
                selections:[]
            }
        },
        methods: {
            getListData(){
                this.$http.get(this.$api.gsList,{params:this.gsListQuery}).then(res=>{
                    this.tableData3 = res.data.message;
                    this.page.total = res.data.totalcount;
                })
            },
            changeStatus(id,type,status){
                this.tableData3.filter(goods=>goods.id == id)[0][type] = status?1:0;
            },
            handleSizeChange(val){
                this.gsListQuery.pageSize = val;
                this.getListData();
            },
            handleCurrentChange(val){
                this.gsListQuery.pageIndex = val;
                this.getListData();
            },
            handleSelectionChange(selection){
                this.selections = selection;               
            },
            del(){
                // 获取到删除的id
                let ids = this.selections.map(v=>v.id).join(',');
                this.$http.get(this.$api.gsDel + ids).then(res=>{
                    if (res.data.status == 0) {
                        this.getListData();
                        this.selections = [];
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                })
            },
            delListData(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.del();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    }
                )              
            },
            seleAll(){
                document.querySelector(".el-checkbox__inner").click();
            }
        },
        created () {
            this.getListData();
        }
    }
</script>

<style scoped lang="less">
[class^="el-icon"] {
    color: rgba(0, 0, 0, 0.3);
    &.active {
        color: black;
    }
}
.btns {
    margin: 10px 0;
}
.cell {
    a {
        text-decoration: none;
    }
}
</style>