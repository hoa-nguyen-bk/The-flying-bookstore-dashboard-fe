<template>
  <navbar btn-background="bg-gradient-primary" />
  <div class="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg" :style="{
    backgroundImage:
      'url(' + require('@/assets/img/curved-images/curved6.jpg') + ')',
  }">
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
                <input v-model="username" class="form-control" type="text" placeholder="Tên đăng nhập" />
                <p v-if="errors.username" class="text-danger small mt-1">{{ errors.username }}</p>
              </div>
              <div class="mb-3">
                <input class="form-control" v-model="email" type="email" placeholder="Email" />
                <p v-if="errors.email" class="text-danger small mt-1">{{ errors.email }}</p>
              </div>
              <div class="mb-3">
                <input class="form-control" v-model="password" type="password" placeholder="Mật khẩu" />
                <p v-if="errors.password" class="text-danger small mt-1">{{ errors.password }}</p>
              </div>
              <div class="mb-3">
                <input class="form-control" id="repeatPassword" v-model="repeatPassword" type="password"
                  placeholder="Xác nhận mật khẩu" />
                <p v-if="errors.repeatPassword" class="text-danger small mt-1">{{ errors.repeatPassword }}</p>
              </div>
              <soft-checkbox id="flexCheckDefault" name="flexCheckDefault" class="font-weight-light" checked>
                Tôi đồng ý với
                <a href="javascript:;" class="text-dark font-weight-bolder">Điều khoản và Điều kiện</a>
              </soft-checkbox>

              <div class="text-center">
                <soft-button type="submit" color="dark" full-width variant="gradient" class="my-4 mb-2">Đăng
                  ký</soft-button>
              </div>
              <p v-if="errors"></p>
              <p class="text-sm mt-3 mb-0">
                Đã có tài khoản rồi?
                <router-link :to="{ name: 'Sign In' }" class="text-dark font-weight-bolder">
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
import SoftCheckbox from "@/components/SoftCheckbox.vue";
import SoftButton from "@/components/SoftButton.vue";
import axios from "axios";
import { message } from "ant-design-vue";
import { mapMutations } from "vuex";
import { headerAxios, port } from "../store/env";

export default {
  name: "SignupBasic",
  data() {
    return {
      errors: {
      },
      username: '',
      password: '',
      email: '',
      repeatPassword: ''
    };
  },
  components: {
    Navbar,
    AppFooter,
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
    async onSubmit() {
      // Xóa các lỗi cũ trước khi kiểm tra lại
      this.errors = {
      };

      // Kiểm tra từng trường và lưu lỗi
      if (!this.username) {
        this.errors.username = "Vui lòng nhập tên đăng nhập.";
      }
      if (!this.email) {
        this.errors.email = "Vui lòng nhập email.";
      } else if (!this.isValidEmail(this.email)) {
        this.errors.email = "Định dạng email không hợp lệ.";
      }
      if (!this.password) {
        this.errors.password = "Vui lòng nhập mật khẩu.";
      }
      if (!this.repeatPassword) {
        this.errors.repeatPassword = "Vui lòng nhập xác nhận mật khẩu.";
      } else if (this.password != this.repeatPassword) {
        this.errors.repeatPassword = "Mật khẩu không trùng khớp.";
      }
      // Trả về true nếu không có lỗi
      if (Object.keys(this.errors).length === 0) {
        return await this.signUp()
      }
      return console.error("Vui lòng điền lại")
    },
    async signUp() {
      try {
        const response = await axios.post(
          `${port}/api/user/register`,
          {
            username: this.username,
            password: this.password,
            email: this.email,
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthDate: "",
          },
          {
            headers: headerAxios
          }
        );
        console.log({ response });
        if (response.status == 200) {
          this.success();
          this.$router.push('/sign-in');
        } else {
          console.log(response);
          message.error("Đăng ký không thành công")
        }
      } catch (error) {
        console.error(error);
        message.error("Đăng ký không thành công")

      }
    },
    isValidEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
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
