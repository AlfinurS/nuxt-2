<template>
  <div>
    <div
      v-for="product in products"
      :key="product.id"
    >
      <p>{{ product.title }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProductList',

  computed: {
    ...mapGetters({
      products: 'Products/filteredPoducts',
    }),
  },
};
</script>
