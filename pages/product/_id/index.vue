<template>
  <div>
    <div class="goods__box">
      <div
        v-if="currentProduct"
        class="goods__item"
      >
        <a
          href="#"
          class="goods__image-wrapper"
        >
          <div class="goods__image-wrap">
            <img
              class="goods__image"
              :src="currentProduct.image"
              :alt="currentProduct.title"
            >
          </div>
        </a>
        <p class="goods__title">
          {{ currentProduct.title }}
        </p>
      
        <p class="goods__text goods__text-accent">
          {{ currentProduct.rating.rate }}
        </p>
      
        <p class="goods__text">
          {{ currentProduct.description }}
        </p>

        <p class="goods__text-accent">
          {{ currentProduct.price }} $
        </p>
      </div>


      <div v-else>
        Нет данных
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import type { productType } from "@/types/common"

export default Vue.extend({
  name: 'ProductComponent',

  data() {
    return {
      productId: this.$route.params.id,
    };
  },

  computed: {
    ...mapGetters({
      products: 'Products/products',
    }),

    id(): string {
      return this.$route.params.id;
    },

    currentProduct(): productType | null {
      const productFind = this.products.find(
        (product) => product.id === +this.productId
      );
      if (productFind) {
        return productFind;
      }
      return null;
    },
  },

  methods: {
    ...mapActions({
      setProducts: 'Products/setProducts',
    }),

    loadProducts() {
      const url = 'https://fakestoreapi.com/products';
      const params = {};
      axios.get(url, { params })
        .then(({ data }) => {
          this.setProducts(data);
        })
        .catch(error => {
          console.log(error);
        })
    },
  },

  mounted () {
    if (this.products.length === 0) {
      this.loadProducts();
    }
  }
})
</script>

<style lang="scss" scoped>
.goods {
  &__box {
    margin-top: 40px;
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    box-shadow: 0px 5px 7px -2px $border-color;
    border-radius: 18px;
    background-color: $background-item;
    padding: 32px 18px;
  }
  
  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
    &-wrapper {
      width: 160px;
    }
    &-wrap {
      position: relative;
      overflow: hidden;
      width: 100%;
      padding-bottom: 116%;
    }
  }
  &__title {
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    color: $color-text;
    margin-right: 18px;
    margin-left: 18px;
    text-align: center;
    @media (min-width: 748px) {
      text-align: left;
    }
  }
  &__text {
    font-size: 14px;
    font-weight: 400;
    color: $color-text;
    margin-right: 18px;
    margin-left: 18px;
    text-align: center;
    @media (min-width: 748px) {
      text-align: left;
    }
    &-accent {
      color: $accent-accent;
    }
  }
}
</style>