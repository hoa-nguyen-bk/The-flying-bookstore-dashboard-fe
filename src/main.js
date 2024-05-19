/**
=========================================================
* Vue The Flying Bookstore dashboard - v3.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-soft-ui-dashboard
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Antd from 'ant-design-vue';
import dayjs from 'dayjs'
import { Button } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.config.globalProperties.$dayjs = dayjs
appInstance.use(Button);
appInstance.use(Antd);
appInstance.use(SoftUIDashboard);
appInstance.mount("#app");
