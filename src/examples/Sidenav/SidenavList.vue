<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">

      <li class="nav-item">
        <sidenav-collapse navText="Quản lý đơn thuê" :to="{ name: 'Tables' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Quản lý đơn bán" :to="{ name: 'ManagerBuyOrder' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Quản lý voucher" :to="{ name: 'ManagerVoucher' }">
          <template #icon>
            <credit-card />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Tạo voucher mới" :to="{ name: 'Create Voucher' }">
          <template #icon>
            <credit-card />
          </template>
        </sidenav-collapse>
      </li>
     
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          Tài khoản
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Đăng xuất" v-on:click="logout" :to="{ name: 'Sign In' }">
          <template #icon>
            <spaceship />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
  
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
import Office from "../../components/Icon/Office.vue";
import Spaceship from "../../components/Icon/Spaceship.vue";
import CreditCard from "../../components/Icon/CreditCard.vue";
import { message } from "ant-design-vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "The Flying Bookstore dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
    Office,
    Spaceship,
    CreditCard,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    logout(){
      localStorage.clear();
      message.success("Đăng xuất thành công")
    }
  },
};
</script>
