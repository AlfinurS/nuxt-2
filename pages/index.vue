<template>
  <div class="catalog">
    <div class="catalog__head">
      <input
        v-model="search"
        type="text"
        class="catalog__search-input input"
        placeholder="Поиск задачи"
        @input="filterProducts"
      >
      <div class="">
        <button
          class="btn btn-primary"
          @click="setGrid"
        >
          Списком
        </button>
      </div>
    </div>
    <div class="catalog__body">
      <ProductGrid v-if="isGrid" />
      <ProductList v-else />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'IndexPage',
  data () {
    return {
      isGrid: false,
      search: ''
    }
  },

  computed: {
    ...mapGetters({
      products: 'Products/products',
      filteredPoducts: 'Products/products'
    })
  },

  methods: {
    ...mapActions({
      setProducts: 'Products/setProducts',
      setFilteredProducts: 'Products/setFilteredProducts'
    }),

    loadProducts () {
      const url = 'https://fakestoreapi.com/products'
      const params = {}
      axios.get(url, { params })
        .then(({ data }) => {
          this.setProducts(data)
          this.setFilteredProducts(this.search)
        })
        .catch(error => {
          console.log(error)
        })
    },

    filterProducts () {
      this.setFilteredProducts(this.search)
    },

    setGrid () {
      this.isGrid = !this.isGrid
    }
  },

  mounted () {
    this.loadProducts()
  }
})
</script>

<style lang="scss" scoped>
.catalog {
  margin-left: 8px;
  margin-right: 8px;
  @media (min-width: 576px) {
    margin-left: 20px;
    margin-right: 20px;
  }
  &__head {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &__search {
    &-input {
      max-width: 280px;
      width: 100%;
      margin-right: 20px;
    }
  }
}
</style>
