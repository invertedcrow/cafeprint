<template>
  <div class="filter">
    <div
      class="filter__header"
      :aria-expanded="showCategories ? 'true' : 'false'"
      aria-controls="collapse-1"
      @click="showCategories = !showCategories"
    >
      <b>Categories</b>
    </div>
    <b-collapse id="collapse-1" v-model="showCategories" class="mt-2">
      <div class="filter__content">
        <div
          class="filter__category"
          v-for="category in categories"
          :key="category"
          :class="{ active: category === filter.category }"
          @click="setActiveCategory(category)"
        >{{category}}</div>
      </div>
    </b-collapse>
    <hr />
    <div
      class="filter__header"
      :aria-expanded="showProducts ? 'true' : 'false'"
      aria-controls="collapse-2"
      @click="showProducts = !showProducts"
    >
      <b>Products</b>
    </div>
    <b-collapse id="collapse-2" v-model="showProducts" class="mt-2">
      <div class="filter__content">
        <div
          class="filter__category"
          v-for="product in products"
          :key="product"
          :class="{ active: product === filter.product }"
          @click="setActiveproduct(product)"
        >{{product}}</div>
      </div>
    </b-collapse>
    <hr />
    <div
      class="filter__header"
      :aria-expanded="showColor ? 'true' : 'false'"
      aria-controls="collapse-3"
      @click="showColor = !showColor"
    >
      <b>Color</b>
    </div>
    <b-collapse id="collapse-3" v-model="showColor" class="mt-2">
      <color :colors="colors" :active="filter.color" :setActiveColor="setActiveColor" />
    </b-collapse>
    <hr />
    <div
      class="filter__header"
      :aria-expanded="showSize ? 'true' : 'false'"
      aria-controls="collapse-4"
      @click="showSize = !showSize"
    >
      <b>Size</b>
    </div>
    <b-collapse id="collapse-4" v-model="showSize" class="mt-2">
      <size :sizes="sizes" :active="filter.size" :setActiveSize="setActiveSize" />
    </b-collapse>
  </div>
</template>

<script>
import Color from "./Color";
import Size from "./Size";

export default {
  components: {
    Color,
    Size
  },
  data() {
    return {
      showCategories: true,
      showProducts: false,
      showColor: false,
      showSize: false,
      // TODO: resolve from server
      colors: ["tomato", "green", "gold", "gray"],
      sizes: ["XS", "XL", "S", "3XL", "4(26-28)", "One size"],
      categories: ["Men", "Women", "Kids", "Accessories"],
      products: ["T-Shorts", "Tank Tops", "Long Sleeve Shirts", "Polo shirts"]
    };
  },
  methods: {
    setActiveCategory(category) {
      this.$store.commit("setFilterCategory", category);
    },
    setActiveproduct(product) {
      this.$store.commit("setFilterProduct", product);
    },
    setActiveColor(color) {
      this.$store.commit("filterSetColor", color);
    },
    setActiveSize(size) {
      this.$store.commit("setFilterSize", size);
    }
  },
  computed: {
    filter() {
      return this.$store.state.filter;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  width: 100%;
  padding-right: 20px;
  padding-left: 15px;
  padding-top: 30px;
  &__header {
    margin-bottom: 20px;
  }
  &__category {
    margin-bottom: 8px;
    &.active {
      font-weight: 600;
      color: blue;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>