<template>
  <div class="container-fluid mt-4">
    <div class="row mt-4">
      <div class="col-md-10">
        <voucher-card
        />
      </div>
     
    </div>
  </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import VoucherCard from "./components/VoucherCard.vue";

export default {
  name: "CreateVoucher",
  components: {
    VoucherCard,
  },
  mounted() {
    setTooltip();
  },
};
</script>
