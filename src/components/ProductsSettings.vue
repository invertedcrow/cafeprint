<template>
  <div class="products-settings">

    <div class="sizes">
      <span class="sizes__item">размер M</span>
      <span class="current-size">Текущий размер принта - A4</span>
    </div>
    <hr>
    <div>
      <a>Информация о товаре</a>
    </div>

    <div class="products-settings__color">Цвет:</div>
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
  hr {
    border-top: 1px solid #dcdcdc;
    width: 100%;
  }
  .sizes {
    font-size: 14px;

    &__item {
      display: inline-block;
      padding: 5px 14px;
      border: 1px solid #72b425;
      border-radius: 18px;
      font-weight: bold;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
    .current-size {
      color: #9aa2af;
      margin-left: 18px;
    }
  }

  height: 100%;
  margin-bottom: 15px;
  /*border: 1px lightgrey solid;*/
  /*background-color: #fff;*/
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