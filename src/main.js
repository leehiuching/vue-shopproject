import Vue from "../node_modules/vue/dist/vue.js";
import App from "./component/App.vue";

var vm = new Vue({
    el:"#app",
    render: function (createElement) {
        return createElement(App);
    }
})