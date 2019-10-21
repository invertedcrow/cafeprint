<template>
  <div class="products-settings">
    <div class="products-settings__title">Kids' Premium Long Sleeve T-Shirt</div>
    <div class="products-settings__color">Product color: {{selectedProduct.color}}</div>
    <color :colors="colors" :active="selectedProduct.color" :setActiveColor="setActiveColor" />
    <b-list-group>
      <b-list-group-item button v-b-toggle.product-info>Product info</b-list-group-item>
      <b-collapse id="product-info" accordion="my-accordion" class="mt-2">
        <product-info />
      </b-collapse>

      <b-list-group-item button v-b-toggle.size-info>Size table</b-list-group-item>
      <b-collapse id="size-info" accordion="my-accordion" class="mt-2">
        <size-table />
      </b-collapse>

      <b-list-group-item button v-b-toggle.arrange-info>Arrange design layers</b-list-group-item>
      <b-collapse id="arrange-info" accordion="my-accordion" class="mt-2">
        <design-layers />
      </b-collapse>
    </b-list-group>
  </div>
</template>

<script>
import Color from "./Color";
import ProductInfo from "./ProductInfo";
import SizeTable from "./SizeTable";
import DesignLayers from "./DesignLayers";

export default {
  components: {
    Color,
    ProductInfo,
    SizeTable,
    DesignLayers
  },
  data() {
    return {
      colors: ["tomato", "green", "gold", "gray"]
    };
  },
  computed: {
    selectedProduct() {
      return this.$store.state.selectedProduct;
    }
  },
  methods: {
    setActiveColor(color) {
      this.$store.commit("setActiveColor", color);
    }
  }
};
</script>

<style lang="scss" scoped>
.products-settings {
  height: 100%;
  margin-bottom: 15px;
  border: 1px lightgrey solid;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__title {
    padding: 10px;
    font-size: 20px;
    font-weight: 600;
  }
  &__color {
    padding: 10px;
    font-weight: 600;
  }
}
</style>