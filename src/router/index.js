import Login from "../component/Login.vue";
import Register from "../component/Register.vue";
export default {
    routes:[
        {name:"login",path: "/login", component: Login},
        {name: "register",path: "/register", component: Register}
    ]
}