<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Listing table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Id
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Quantity
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Address
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Lease Rate
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Deposit Fee
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Penalty Rate
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(listing, index) in listings" :key="index">
              <td  class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">{{ listing.id }}</p>
              </td>
              <td  class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">{{ listing.quantity }}</p>
              </td>
              <td  class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">{{ listing.address }}</p>
              </td>
              <td  class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">{{ listing.leaseRate }}</p>
              </td>
              <td  class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">{{ listing.depositFee }}</p>
              </td>
              <td  class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">{{ listing.penaltyRate }}</p>
              </td>
              <td  class="align-middle text-center">
                <p class="text-xs font-weight-bold mb-0">{{ listing.description }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "authors-table",
  data() {
    return {
      listings: []
    };
  },
  components: {
  },
  mounted() {
    this.fetchListings();
  },
  methods: {
    fetchListings() {
      axios.get('http://localhost:8082/api/listing')
        .then(response => {
          this.listings = response.data.map(listing => ({
            id: listing.id,
            quantity: listing.quantity,
            address: listing.address,
            expiryDate: listing.expiryDate,
            leaseRate: listing.leaseRate,
            depositFee: listing.depositFee,
            penaltyRate: listing.penaltyRate,
            description: listing.description.substring(0, 50),
          }));
        })
        .catch(error => {
          console.error('Error fetching listings:', error);
        });
    }
  }
};
</script>
