import axios from "axios";
import api from "../js/api_config.js"
export default function(to,from,next){
    // 先获取用户要去的页面
    // 登录页
        // 判断用户是否登录 >> 登陆 >> 跳转到首页 // 未登录 >> 登录页
    // 非登录页
        // 判断用户是否登录 >> 登陆 >> 跳转到当前页 // 未登录 >> 跳转至登录页 >> 登陆后 >> 跳转回当前页
    
    var toPageName = to.name;
    console.log(toPageName);
    axios.get(api.islogin).then(res=>{
        let isLogin = false;
        if (res.data.code == 'logined') {
            isLogin = true;
        }
        if (toPageName == 'login' && isLogin) {
            next("/admin");
        }else if (toPageName != 'login' && !isLogin) {
            next({name:'login',query:{nextPage:to.fullPath}});
        }else {
            next();
        }
    });
}