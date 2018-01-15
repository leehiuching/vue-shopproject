import "normalize.css";
import "./less/index.less"

import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter);
Vue.use(ElementUI);

import App from "./component/App.vue";

import routerConfig from "./router/index.js";

import axios from "axios";
axios.defaults.baseURL = "http://157.122.54.189:9095";
Vue.prototype.$http = axios;

import api from "./js/api_config.js";
Vue.prototype.$api = api;

var vm = new Vue({
    el:"#app",
    router:new VueRouter(routerConfig),
    render: function (createElement) {
        return createElement(App);
    }
})