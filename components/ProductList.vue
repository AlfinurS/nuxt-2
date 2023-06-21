<template>
  <div class="catalog__list">
    <div
      v-for="product in products"
      :key="product.id"
      class="catalog__item"
    >
      <a
        href="#"
        class="catalog__image-wrapper"
      >
        <div class="catalog__image-wrap">
          <img
            class="catalog__image"
            :src="product.image"
            :alt="product.title"
          >
        </div>
      </a>
      <p class="catalog__title">
        {{ product.title }}
      </p>
      <p class="catalog__price">
        {{ product.price }} $
      </p>
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

<style lang="scss" scoped>
.catalog {
  &__list {
    margin-top: 40px;
  }
  &__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px;
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
      width: 60px;
    }
    &-wrap {
      position: relative;
      overflow: hidden;
      width: 100%;
      padding-bottom: 116%;
    }
  }
  &__title {
    width: 100%;
    max-width: 480px;
    font-size: 13px;
    font-weight: 400;
    text-transform: uppercase;
    color: $disabled-text;
    margin-left: 30px;
  }
  &__price {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-transform: uppercase;
    color: $el-color-red;
    margin-left: 30px;
  }
}
</style>