<template>
    <el-dropdown class="header">
        <span class="el-dropdown-link">
            你好，{{uname}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>modify</el-dropdown-item>
            <el-dropdown-item @click.native="logout">loginout</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        data () {
            return {
                uname: 'admin'
            }
        },
        methods: {
            logout() {
                this.$http.get(this.$api.logout).then(res => {
                    if(res.data.status == 0) {
                        this.$router.push({ name: 'login' });
                    }else {
                        this.$alert(res.data.message);
                    }
                });
            }
        }
    }
</script>

<style scoped>
.header {
    text-align: right;
    width: 100%;
    line-height: 60px;
}
</style>