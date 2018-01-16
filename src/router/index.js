import Login from "../component/login/Login.vue";
import Admin from "../component/admin/Admin.vue";
import GoodsCtList from '../component/admin/goods/content/List.vue';
import GoodsCtEdit from '../component/admin/goods/content/Edit.vue';
import GoodsCgList from '../component/admin/goods/category/List.vue';
import GoodsCgEdit from '../component/admin/goods/category/Edit.vue';

let childrenRouter = [
    { name: 'goodsCtList', path: 'goods/content/list', component: GoodsCtList },
    { name: 'goodsCtEdit', path: 'goods/content/edit/:id', component: GoodsCtEdit },
    { name: 'goodsCtAdd', path: 'goods/content/add', component: GoodsCtEdit },
    // 商品模块 => 商品分类
    { name: 'goodsCgList', path: 'goods/category/list', component: GoodsCgList },
    { name: 'goodsCgEdit', path: 'goods/category/edit/:id', component: GoodsCgEdit },
    { name: 'goodsCgAdd', path: 'goods/category/add', component: GoodsCgEdit },
]
export default {
    routes:[
        {name: "login",path: "/login", component: Login},
        {path: "/",redirect: Admin},
        {name: "admin",path: "/admin",component: Admin,children: childrenRouter}
    ]
}