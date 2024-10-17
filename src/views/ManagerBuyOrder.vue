<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <buy-order-table />
      </div>
    </div>
  </div>
</template>

<script>
import BuyOrderTable from './components/BuyOrderTable.vue';
export default {
  name: "manager-buy-order",
  components: {
    BuyOrderTable,
  },
};
</script>
