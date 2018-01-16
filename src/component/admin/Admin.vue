<template>
    <el-container class="admin">
        <el-aside width="200">
            <Aside></Aside>
        </el-aside>
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Aside from "./common/Aside.vue";
    import Header from "./common/Header.vue";
    export default {
        components: {
            Header,
            Aside
        }
    }
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    }
.el-aside {
    background-color: #D3DCE6;
    color: #333;
}
.el-main {
    background-color: #E9EEF3;
    color: #333;
}
.admin {
    height: 100%;
}
</style>