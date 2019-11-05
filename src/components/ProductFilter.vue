<template>
  <div class="filter d-flex flex-column h-100">
    <div class="modal-title">Категории товаров</div>
    <div class="divider"></div>
    <div class="filter__sub-title">Все товары</div>
    <perfect-scrollbar>
      <product-filter-collapse v-for="(item, index) in categories" :key="index" :category="item" />
    </perfect-scrollbar>
    <div class="divider"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductFilterCollapse from "./ProductFilterCollapse";

export default {
  components: {
    ProductFilterCollapse
  },
  computed: {
    ...mapGetters(["categories"])
  }
};
</script>

<style lang="scss" scoped>
.filter {
  padding-right: 3px;
  .modal-title {
    margin-bottom: 30px;
  }
  &__sub-title {
    color: #031127;
    font-family: "MuseoSansCyrl", sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.14px;
    margin-left: 16px;
    margin-bottom: 30px;
  }
  @media screen and (max-width: 768px) {
    padding-right: 22px;
    .modal-title {
      display: none;
    }
    &__sub-title {
      margin-bottom: 15px;
    }
  }
}

.divider {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
}
</style>