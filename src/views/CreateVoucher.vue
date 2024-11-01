<template>
  <div class="container-fluid mt-4">
    <div class="row mt-4">
      <div class="col-md-10">
        <billing-card
          title="Billing Information"
          :bills="[
            {
              name: 'Oliver Liam',
              company: 'Viking Burrito',
              email: 'oliver@burrito.com',
              id: 'FRB1235476',
            },
            {
              name: 'Lucas Harper',
              company: 'Stone Tech Zone',
              email: 'lucas@stone-tech.com',
              id: 'FRB1235476',
            },
            {
              name: 'Ethan James',
              company: 'Fiber Notion',
              email: 'ethan@fiber.com',
              id: 'FRB1235476',
            },
          ]"
        />
      </div>
     
    </div>
  </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import BillingCard from "./components/BillingCard.vue";

export default {
  name: "CreateVoucher",
  components: {
    BillingCard,
  },
  mounted() {
    setTooltip();
  },
};
</script>
