<template>
  <div class="preview d-flex flex-column justify-content-between">
    <div class="preview__body">
      <div class="preview__view d-flex flex-column align-items-center">
        <img src="../assets/1.webp" />
        {{preview.side}}
      </div>
      <sides :sides="sides" :setActiveSide="setActiveSide" />
      <div class="preview__title d-flex justify-content-between">
        <div class="text-muted font-weight-bold">Mens long Sleeve By Next level</div>
        <div class="text-muted font-weight-bold">$23.99</div>
      </div>
      <color :colors="colors" :active="preview.color" :setActiveColor="setActiveColor" />
      <size :sizes="sizes" :active="preview.size" :setActiveSize="setActiveSize" />
      <product-info />
    </div>
    <div class="preview__footer d-flex flex-column">
      <b-button squared @click="onSelect()" variant="info">Select</b-button>
    </div>
  </div>
</template>

<script>
import Color from "./Color";
import Size from "./Size";
import ProductInfo from "./ProductInfo";
import Sides from "./Sides";

export default {
  components: {
    Color,
    Size,
    ProductInfo,
    Sides
  },
  data() {
    return {
      colors: ["tomato", "green", "gold", "gray"],
      sizes: ["XS", "XL", "S", "3XL", "4(26-28)", "One size"],
      sides: ["front", "back", "right", "left"]
    };
  },
  methods: {
    setActiveColor(color) {
      this.$store.commit("setPreviewColor", color);
    },
    setActiveSize(size) {
      this.$store.commit("setPreviewSize", size);
    },
    setActiveSide(side) {
      this.$store.commit("setPreviewSide", side);
    },
    onSelect() {
      this.$store.commit("setActiveSettings", "products");
      this.$store.commit("showFilterModal", false);
      this.$store.commit("setActiveProduct");
    }
  },
  computed: {
    preview() {
      return this.$store.state.productPreview;
    }
  }
};
</script>

<style lang="scss" scoped>
.preview {
  height: 100%;
  &__view {
    margin-bottom: 20px;
    img {
      width: 100%;
    }
  }
  &__title {
    margin-top: 15px;
    padding: 0 10px;
  }
  &__body {
    height: 100%;
    overflow-y: scroll;
  }
  &__footer {
    box-shadow: 0 -5px 3px lightgrey;
    padding: 15px;
  }
}
</style>