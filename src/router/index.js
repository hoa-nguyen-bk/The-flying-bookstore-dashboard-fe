import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import CreateVoucher from "@/views/CreateVoucher.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import ManagerBuyOrder from "@/views/ManagerBuyOrder.vue"
import ManagerVoucher from "@/views/OrderManagement.vue"

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/manager-rent-order",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/manager-rent-order",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/manager-buy-order",
    name: "ManagerBuyOrder",
    component: ManagerBuyOrder,
  },
  {
    path: "/manager-voucher",
    name: "ManagerVoucher",
    component: ManagerVoucher,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/create-voucher",
    name: "Create Voucher",
    component: CreateVoucher,
  },
  {
    path: "/edit-voucher/:id",
    name: "Edit Voucher",
    component: CreateVoucher,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
