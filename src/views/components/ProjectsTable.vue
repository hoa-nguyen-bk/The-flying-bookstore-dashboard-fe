<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Quản lý voucher toàn sàn</h6>
      <router-link :to="{ name: 'Create Voucher' }"><a-button class="mt-2">Tạo voucher mới</a-button></router-link>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Id
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Tên voucher
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Mã code
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Loại voucher
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Giá trị tối thiểu
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Giá trị khuyến mãi
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Thời gian hiệu lực
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(voucher, index) in paginatedVoucher" :key="index">
              <td>
                <h6 class="px-3 my-auto text-xs font-weight-light">{{ voucher.id }}</h6>
              </td>
              <td>
                <h6 class=" my-auto text-sm">{{ voucher.name }}</h6>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0">{{ voucher.code }}</p>
              </td>
              <td>
                <span class="text-xs font-weight-bold">{{ voucher.voucherTypeDescription }}</span>
              </td>
              <td>
                <span class=" text-xs font-weight-bold">{{ voucher.minValue }}</span>
              </td>
              <td>
                <span class=" text-xs font-weight-bold">{{ voucher.voucherType == 1 ? voucher.discountPercentage :
                  voucher.discountAmount }}</span>
              </td>
              <td>
                <p class="text-xs mb-0 font-weight-semibold">{{ voucher.duration }}</p>
              </td>
              <td class="align-middle">
                <div class="ms-auto ">
                  <a class="btn btn-link text-danger text-gradient px-3 mb-0" @click="deleteVoucher(voucher.id)"
                    href="javascript:;">
                    <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Xóa
                  </a>
                  <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
                    <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Sửa
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Pagination -->
    <div class="d-flex justify-content-end my-3">
      <a-pagination v-model="currentPage" :total="totalItems" :show-less-items="true" :show-quick-jumper="false"
        :show-size-changer="false" @change="handlePageChange" />
    </div>
  </div>
</template>

<script>

import {
  Pagination as AntPagination,
  Button,
  message
} from "ant-design-vue";
import axios from "axios";
import dayjs from "dayjs";
import { port } from "../../store/env";
import { formatCurrency } from "../../utils/helper";

export default {
  name: "projects-table",
  components: {
    "a-pagination": AntPagination,
    "a-button": Button
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
      vouchers: []
    }
  },
  computed: {
    paginatedVoucher() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.vouchers.slice(startIndex, endIndex);
    },
    totalItems() {
      return this.vouchers.length;
    },
  },
  mounted() {
    this.fetchVouchers();
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage;
    },
    async deleteVoucher(voucherId) {
      try {
        const response = await axios.delete(`${port}/api/voucher-session/${voucherId}`, {
          maxBodyLength: Infinity,
        });
        if (response.status == 204) {
          message.success("Xóa voucher thành công");
          return await this.fetchVouchers();
        } else {
          message.error("Xóa voucher không thành công");
        }
      } catch (error) {
        console.error(error);
        message.error("Xóa voucher không thành công");
      }
    },

    async fetchVouchers() {
      return await axios
        .get(`${port}/api/voucher-session`)
        .then((response) => {
          this.vouchers = response?.data?.map((item) => {
            return {
              id:item.id,
              name: item.name,
              code: item.code,
              duration: `${dayjs(item.startDate).format("DD/MM/YYYY")} - ${dayjs(item.endDate).format("DD/MM/YYYY")}`,
              minValue: formatCurrency(item.minValue),
              discountAmount: formatCurrency(item.discountAmount),
              discountPercentage: item.discountPercentage + "%",
              voucherTypeDescription: item.voucherType == 1 ? "Giảm theo phần trăm" : "Giảm theo tiền",
              voucherType: item.voucherType
            };
          });
        })
        .catch((error) => {
          console.error("Error fetching listings:", error);
        });
    },
  }

};
</script>
