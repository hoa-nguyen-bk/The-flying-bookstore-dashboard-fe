<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Danh sách đơn hàng</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Id
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Tiêu đề
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Chủ sách
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Người thuê
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Khoảng thời gian
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Phương thức
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Tiền cọc
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Tiền thuê
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Tổng tiền
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(listing, index) in paginatedListings" :key="index">
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">{{ listing.id }}</p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">{{ listing.title }}</p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ listing.leeseName }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ listing.leesorName }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ listing.duration }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ listing.method }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ listing.depositFee }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ listing.leaseFee }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">{{ listing.total }}</p>
              </td>
              <td class="align-middle text-center">
                <a-dropdown>
                  <a class="ant-dropdown-link" @click.prevent>
                    {{ listing.status }}
                    <a-icon />
                  </a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item  v-for="(value,key,index) in listStatus" :key="index"  @click="handleMenuClick(listing.id,key)">
                        <a href="javascript:;" >{{ value }}</a>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Pagination -->
    <div class="d-flex justify-content-end my-3">
      <a-pagination
        v-model="currentPage"
        :total="totalItems"
        :show-less-items="true"
        :show-quick-jumper="false"
        :show-size-changer="false"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import {
  Pagination as AntPagination,
  Dropdown,
  Menu,MenuItem,
} from "ant-design-vue";
import { DownOutlined } from "@ant-design/icons-vue";
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "listing-table",
  components: {
    "a-pagination": AntPagination,
    "a-icon": DownOutlined,
    "a-dropdown": Dropdown,
    "a-menu": Menu,
    "a-menu-item": MenuItem,
  },
  data() {
    return {
      userId: 1,
      listings: [],
      currentPage: 1,
      itemsPerPage: 10,
      listStatus: {
        ORDERED_PAYMENT_PENDING: "1. Chờ người thuê thanh toán",
        USER_PAID: "2. Admin xác nhận thanh toán",
        PAYMENT_SUCCESS: "3. Đã thanh toán",
        DELIVERED: "4. Người cho thuê đã giao sách",
        RETURNING: "5. Người thuê đã trả",
        RETURNED: "6. Người cho thuê đã nhận lại sách",
        DEPOSIT_RETURNED: "7. Đã trả tiền cọc lại cho người thuê",
        PAID_OWNER: "8. Đã trả tiền thuê lại cho người cho thuê",
        CANCELED: "9. Người thuê đã hủy",
        LATE_RETURN: "10. Người thuê trả trễ",
      },
      listPaymentMethod: {
        COD: "COD",
        BANK_TRANSFER: "Chuyển khoản",
        VNPAY: "VNPAY"
      }
    };
  },
  computed: {
    paginatedListings() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.listings.slice(startIndex, endIndex);
    },
    totalItems() {
      return this.listings.length;
    },
  },
  mounted() {
    this.fetchListings();
  },
  methods: {
    formatCurrency(amount) {
      if (!amount) return 0;
      // Chuyển số tiền thành chuỗi và thêm dấu chấm phẩy giữa các hàng nghìn
      const formattedAmount = amount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
      // Thêm ký tự đơn vị tiền tệ (VND)
      return formattedAmount + "đ";
    },
    async fetchListings() {
      return await axios
        .get(`http://localhost:8082/api/leaseOrder/search/lessee/${this.userId}`)
        .then((response) => {
          this.listings = response.data.map((item) => {
            const { lessee, listing, leaseOrder, lessor } = item;
            return {
              id: leaseOrder.id,
              title: listing.book.title,
              leeseName: `${lessee.firstName} ${lessee.lastName}`,
              leesorName: `${lessor.firstName} ${lessor.lastName}`,
              duration: `${dayjs(leaseOrder.fromDate).format("DD/MM")} - ${dayjs(leaseOrder.toDate).format("DD/MM/YYYY")}`,
              method: this.listPaymentMethod[leaseOrder.paymentMethod],
              depositFee: this.formatCurrency(leaseOrder.totalDeposit),
              leaseFee: this.formatCurrency(leaseOrder.totalLeaseFee),
              total: this.formatCurrency(leaseOrder.totalDeposit),
              status: this.listStatus[leaseOrder.status],
            };
          });
        })
        .catch((error) => {
          console.error("Error fetching listings:", error);
        });
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
    },
    async handleMenuClick (id,value) {
      console.log({value,id});
      return await axios.request({ url: `http://localhost:8082/api/leaseOrder/edit/status?status=${value}&id=${id}`})
        .then(async (response) => {
          console.log((response.data));
          return await this.fetchListings()
        })
        .catch((error) => {
          console.log(error);
        });

    },
  },
};
</script>
