<template>
  <navbar btn-background="bg-gradient-primary" />
  <div
    class="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg"
    :style="{
      backgroundImage:
        'url(' + require('@/assets/img/curved-images/curved6.jpg') + ')',
    }"
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="mx-auto text-center col-lg-5">
          <h1 class="mt-5 mb-2 text-white">Chào mừng bạn!</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-lg-n24 mt-md-n11 mt-n10 justify-content-center">
      <div class="mx-auto col-xl-4 col-lg-5 col-md-7">
        <div class="card z-index-0">
          <div class="pt-4 text-center card-header">
            <h5>Đăng ký</h5>
          </div>
          <div class="card-body">
            <form id="signUp" novalidate @submit.prevent="onSubmit">
              <div class="mb-3">
                <soft-input
                  id="username"
                  type="text"
                  placeholder="Tên đăng nhập"
                />
              </div>
              <div class="mb-3">
                <soft-input
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div class="mb-3">
                <soft-input
                  id="password"
                  type="password"
                  placeholder="Mật khẩu"
                />
              </div>
              <div class="mb-3">
                <soft-input
                  id="repear-password"
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                />
              </div>
              <soft-checkbox
                id="flexCheckDefault"
                name="flexCheckDefault"
                class="font-weight-light"
                checked
              >
                Tôi đồng ý với
                <a href="javascript:;" class="text-dark font-weight-bolder"
                  >Điều khoản và Điều kiện</a
                >
              </soft-checkbox>

              <div class="text-center">
                <soft-button
                  color="dark"
                  full-width
                  variant="gradient"
                  class="my-4 mb-2"
                  >Đăng ký</soft-button
                >
              </div>
              <p class="text-sm mt-3 mb-0">
                Đã có tài khoản rồi?
                <router-link
                  :to="{ name: 'Sign In' }"
                  class="text-dark font-weight-bolder"
                >
                  Đăng nhập
                </router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import SoftInput from "@/components/SoftInput.vue";
import SoftCheckbox from "@/components/SoftCheckbox.vue";
import SoftButton from "@/components/SoftButton.vue";
import axios from "axios";
import { message } from "ant-design-vue";
import { mapMutations } from "vuex";

export default {
  name: "SignupBasic",
  data() {
    return {
      errors: [],
      username: null,
      password: null,
      email: null,
    };
  },
  components: {
    Navbar,
    AppFooter,
    SoftInput,
    SoftCheckbox,
    SoftButton,
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },

  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    onSubmit() {
      console.log({
        username: this.username,
        password: this.password,
        email: this.email,
      });
      if (this.name && this.password) return true;
      this.errors = [];
      if (!this.name) this.errors.push("Name required.");
      if (!this.password) this.errors.push("password required.");
      this.signUp()
    },
    async signUp() {
      try {
        const response = await axios.post(
          "http://localhost:8082/api/user/register",
          {
            username: "thaoAdmin" + Math.random() * 100,
            password: "1XyseXWk",
            email: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthDate: "",
          }
        );
        console.log({ response });
        this.success();
        this.$router.push('/sign-in');
      } catch (error) {
        console.log(error);
      }
    },
    success: () => {
      message.success({
        content: () => "Đăng ký thành công",
        class: "custom-class",
        style: {
          marginTop: "15vh",
        },
      });
    },
  },
};
</script>
