<template>
  <div class="catalog">
    <div class="catalog__head">
      <input
        v-model="search"
        type="text"
        class="catalog__search-input input"
        placeholder="Поиск товара"
        @input="searchProducts"
      >
      <div class="catalog__head-btns">
        <Pagination
          :params="paginationData"
          class="catalog__pagination"
          @setPage="handleCurrentChange"
        />
        <div class="">
          <button
            v-if="isGrid"
            class="btn btn-primary"
            @click="setGrid"
          >
            Список
          </button>
          
          <button
            v-else
            class="btn btn-primary"
            @click="setGrid"
          > 
            Плитка
          </button>
        </div>
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
import Pagination from '~/components/Pagination.vue'
import type { paginationType } from "@/types/common"

const initPaginationData = (): paginationType => ({
  page: 1,
  page_size: 10,
  count: 0,
});

export default Vue.extend({
  components: { Pagination },
  name: 'IndexPage',
  data () {
    return {
      isGrid: false,
      search: '',
      paginationData: initPaginationData() as paginationType,
    }
  },

  computed: {
    ...mapGetters({
      products: 'Products/products',
      filteredPoducts: 'Products/filteredPoducts'
    })
  },

  methods: {
    ...mapActions({
      setProducts: 'Products/setProducts',
      setFilteredProducts: 'Products/setFilteredProducts',
    }),

    loadProducts() {
      const url = 'https://fakestoreapi.com/products';
      const params = {};
      axios.get(url, { params })
        .then(({ data }) => {
          this.setProducts(data);
          this.paginationData.count = data.length;
          this.filterProducts();
        })
        .catch(error => {
          console.log(error);
        })
    },

    searchProducts() {
      this.filterProducts();
    },

    filterProducts() {
      this.setFilteredProducts({search: this.search, params: this.paginationData});
    },

    setGrid() {
      this.isGrid = !this.isGrid;
    },

    // пагинация смена страницы
    handleCurrentChange(val: number) {
      this.paginationData.page = val;
      this.filterProducts();
    },
  },

  mounted () {
    this.loadProducts();
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
    &-btns {
      display: flex;
    }
  }
  &__search {
    &-input {
      max-width: 280px;
      width: 100%;
      margin-right: 20px;
    }
  }
  &__pagination {
    margin-right: 20px;
  }
}
</style>
