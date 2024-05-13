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
                Tên sách
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Tên người thuê
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Tên người cho thuê
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Thời gian thuê
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
                    {{ listStatus[listing.status] }}
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
        :show-quick-jumper="true"
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
      userId: 1000,
      listings: [],
      currentPage: 1,
      itemsPerPage: 10,
      listStatus: {
        ORDERED_PAYMENT_PENDING: "Chờ người thuê thanh toán",
        CANCELED: "Người thuê đã hủy",
        PAYMENT_SUCCESS: "Người thuê thanh toán thành công",
        DELIVERED: "Người cho thuê đã giao sách",
        LATE_RETURN: "Người thuê trả trễ",
        RETURNING: "Người thuê đã trả",
        RETURNED: "Người cho thuê đã nhận lại sách",
        DEPOSIT_RETURNED: "Đã trả tiền cọc lại cho người thuê",
        USER_PAID: "Chờ xác nhận thanh toán",
        PAID_OWNER: "Đã trả tiền thuê lại cho người cho thuê",
      },
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
              duration: `${leaseOrder.fromDate} - ${leaseOrder.toDate} `,
              method: leaseOrder.paymentMethod,
              depositFee: leaseOrder.totalDeposit,
              leaseFee: leaseOrder.totalLeaseFee,
              total: leaseOrder.totalDeposit,
              status: leaseOrder.status,
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
