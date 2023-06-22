<template>
  <div>
    product
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProductComponent',

  computed: {
    ...mapGetters({
      products: 'Products/filteredPoducts',
    }),
  },
};
</script>
