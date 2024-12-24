<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Danh sách đơn bán</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7  text-center">
                Id
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center ps-2">
                Tiêu đề
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center ps-2">
                Người bán
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center ps-2">
                Người mua
              </th> 
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center ps-2">
                Ngày đặt
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center ps-2">
                Phương thức
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center ps-2">
                Tổng tiền
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center ps-2">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(listing, index) in paginatedListings" :key="index">
              <td class="align-middle text-center">
                <p class="text-xs font-weight-light mb-0">{{ listing.id }}</p>
              </td>
              <td class="align-middle text-center">
                <h6 class="text-sm mb-0">{{ listing.title }}</h6>
              </td>
              <td class="align-middle text-center">
                <p class="text-sm font-weight-bold  mb-0">
                  {{ listing.salerName }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-sm font-weight-bold  mb-0">
                  {{ listing.buyerName }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ listing.orderDate }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ listing.method }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-semibold mb-0">
                  {{ listing.price }}
                </p>
              </td>
              <td class="align-middle text-center">
                <p class="text-xs font-weight-semibold mb-0">
                  {{ listing.total }}
                </p>
              </td>

              <td class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">
                  {{ listing.status }} 
                </p>
                <a-button class="mt-2" v-if="listing.status == listStatus[`ORDERED_PAYMENT_PENDING`]"
                  @click="handleMenuClick(listing.id, `PAYMENT_SUCCESS`)">Người mua đã trả tiền</a-button>
                <a-button class="mt-2" v-if="listing.status == listStatus[`DELIVERED`]"
                  @click="handleMenuClick(listing.id, `PAID_SELLER`)">Đã trả tiền người bán</a-button>
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
  Button
} from "ant-design-vue";
import axios from "axios";
import dayjs from "dayjs";
import {headerAxios, port} from "./../../store/env"

export default {
  name: "buy-order-table",
  components: {
    "a-pagination": AntPagination,
    "a-button": Button
  },
  data() {
    return {
      userId: 1,
      listings: [],
      currentPage: 1,
      itemsPerPage: 10,
      listStatus: {
        ORDERED_PAYMENT_PENDING: "1. Chờ người mua thanh toán",
        PAYMENT_SUCCESS: "2. Đã thanh toán",
        DELIVERED: "3. Người mua đã nhận sách",
        PAID_BUYER: "4. Đã trả tiền thừa cho người mua",
        PAID_SELLER: "4. Đã trả tiền cho người bán",
        CANCELED: "5. Người mua đã hủy",
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
        .get(`${port}/api/SaleOrder`,
          {
            headers: headerAxios
          })
        .then((response) => {
          this.listings = response?.data?.map((item) => {
            const { Seller, listing, saleOrder, Buyer } = item;
            return {
              id: saleOrder.id,
              title: listing.book.title,
              salerName: `${Seller.firstName} ${Seller.lastName}`,
              buyerName: `${Buyer.firstName} ${Buyer.lastName}`,
              orderDate: `${dayjs(saleOrder.createdDate).format("DD/MM/YYYY")}`,
              method: this.listPaymentMethod[saleOrder.paymentMethod],
              price: this.formatCurrency(listing.price),
              total: this.formatCurrency(saleOrder.totalPrice),
              status: this.listStatus[saleOrder.status],
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
    async handleMenuClick(id, status) {
      const token = JSON.parse(localStorage.getItem("token"));
      const config = {
        url: `${port}/api/SaleOrder/status`,
        params: { id, status },
        headers: {
          ...headerAxios,
          Authorization: `Bearer ${token}`,
        },
      }
      return await axios
        .request(config)
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
