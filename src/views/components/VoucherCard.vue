<template>
  <div class="card">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-0"> {{ $route.params.id ? "Sửa voucher id #" + $route.params.id : "Tạo voucher mới" }}</h6>
    </div>
    <div class="card-body pt-4 p-3">
      <div class="text-start">
        <form @submit.prevent="submitVoucherSession">
          <!-- ID (ẩn vì người dùng không cần phải nhập) -->
          <input type="hidden" v-model="voucherSession.id" />

          <div class="row">
            <div class="col-md-6">
              <!-- Tên voucher -->
              <label>Tên voucher</label>
              <input v-model="voucherSession.name" class="form-control" type="text" placeholder="Tên voucher"
                required />
            </div>
            <div class="col-md-6">
              <!-- Mã voucher -->
              <label>Mã voucher</label>
              <input v-model="voucherSession.code" class="form-control" type="text" placeholder="Mã voucher" required />

            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <!-- Ngày bắt đầu -->
              <label>Ngày bắt đầu</label>
              <input v-model="voucherSession.startDate" class="form-control" type="date" required />
            </div>
            <div class="col-md-6">
              <!-- Ngày kết thúc -->
              <label>Ngày kết thúc</label>
              <input v-model="voucherSession.endDate" class="form-control" type="date" required />
            </div>
          </div>

          <!-- Giá trị tối thiểu (nếu có) -->
          <label>Giá trị tối thiểu</label>
          <input v-model="voucherSession.minValue" class="form-control" type="number" placeholder="Giá trị tối thiểu" />

          <!-- Loại voucher (0 - giảm giá bằng số tiền, 1 - giảm giá bằng phần trăm) -->
          <label>Loại voucher</label>
          <select v-model="voucherSession.voucherType" class="form-control" required>
            <option :value="0">Giảm giá bằng số tiền</option>
            <option :value="1">Giảm giá bằng phần trăm</option>
          </select>

          <!-- Số tiền giảm (chỉ hiện nếu voucherType là 0) -->
          <div v-if="voucherSession.voucherType === 0">
            <label>Số tiền giảm</label>
            <input v-model="voucherSession.discountAmount" class="form-control" type="number"
              placeholder="Số tiền giảm" />
          </div>

          <!-- Phần trăm giảm giá (chỉ hiện nếu voucherType là 1) -->
          <div v-if="voucherSession.voucherType === 1">
            <label>Phần trăm giảm giá</label>
            <input v-model="voucherSession.discountPercentage" class="form-control" type="number"
              placeholder="Phần trăm giảm giá" />
          </div>

          <!-- Nút submit -->
          <div class="text-center">
            <soft-button class="my-4 mb-2" variant="gradient" color="success" full-width type="submit"
              @click="submitHandler">
              Xác nhận
            </soft-button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import SoftButton from "@/components/SoftButton.vue";
import { message } from 'ant-design-vue';
import axios from "axios";
import { headerAxios, port } from "../../store/env";


export default {
  name: "VoucherCard",
  components: {
    SoftButton
  },
  data() {
    return {
      voucherSession: {
        id: null,
        name: "",
        code: "",
        startDate: "",
        endDate: "",
        minValue: null,
        discountAmount: null,
        discountPercentage: null,
        voucherType: 0, // giá trị mặc định là 0 (giảm giá bằng số tiền)
      }
    };
  },
  mounted() {
    this.fetchVoucherDetail();
  },
  methods: {
    async fetchVoucherDetail() {
      const voucherId = this.$route?.params?.id;
      if (!voucherId) return;
      try {
        const response = await axios.get(
          `${port}/api/voucher-session/${voucherId}`,
          {
            headers: { ...headerAxios, 'Content-Type': 'application/json' },
            maxBodyLength: Infinity,
          }
        );
        if (response.status == 200) {
          const { code, discountAmount,
            discountPercentage,
            endDate,
            id,
            minValue,
            name,
            startDate,
            voucherType } = response.data;
          this.voucherSession = {
            code,
            discountAmount,
            discountPercentage,
            endDate,
            id,
            minValue,
            name,
            startDate,
            voucherType
          }
        }
      } catch (error) {
        console.error(error);
        message.error("Lấy thông tin voucher không thành công");
      }
    },

    async submitHandler() {
      console.log("submitHandler");
      if (this.$route?.params?.id) {
        return await this.updateVoucher();
      }
      try {
        const data = {
          name: this.voucherSession.name,
          startDate: this.voucherSession.startDate,
          endDate: this.voucherSession.endDate,
          minValue: this.voucherSession.minValue,
          discountAmount: this.voucherSession.discountAmount,
          discountPercentage: this.voucherSession.discountPercentage,
          voucherType: this.voucherSession.voucherType,
          code: this.voucherSession.code,
        };

        const response = await axios.post(
          `${port}/api/voucher-session`,
          data,
          {
            headers: {...headerAxios,  'Content-Type': 'application/json' },
            maxBodyLength: Infinity,
          }
        );

        if (response.status === 200) {
          message.success("Tạo voucher thành công");
          this.$router.push('/manager-voucher');
        } else {
          console.log(response);
          message.error("Tạo voucher không thành công");
        }
      } catch (error) {
        console.error(error);
        message.error("Tạo voucher không thành công");
      }
    },
    async updateVoucher() {
      try {
        const voucherId = this.$route?.params?.id;
        const data = {
          name: this.voucherSession.name,
          startDate: this.voucherSession.startDate,
          endDate: this.voucherSession.endDate,
          minValue: this.voucherSession.minValue,
          discountAmount: this.voucherSession.discountAmount,
          discountPercentage: this.voucherSession.discountPercentage,
          voucherType: this.voucherSession.voucherType,
          code: this.voucherSession.code,
        };

        const response = await axios.put(
          `${port}/api/voucher-session/${voucherId}`,
          data,
          {
            headers: { ...headerAxios, 'Content-Type': 'application/json' },
            maxBodyLength: Infinity,
          }
        );

        if (response.status === 200) {
          message.success("Cập nhập voucher thành công");
          this.$router.push('/manager-voucher');
        } else {
          console.log(response);
          message.error("Cập nhập voucher không thành công");
        }
      } catch (error) {
        console.error(error);
        message.error("Cập nhập voucher không thành công");
      }
    },

  }

};
</script>
