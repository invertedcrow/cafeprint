<template>
  <div class="breadcrumbs pt-1 pb-3">
    <b-button class="breadcrumbs__item" squared @click="filterReset">Reset X</b-button>
    <b-button
      class="ml-3 breadcrumbs__item"
      squared
      variant="outline-secondary"
      v-if="filter.category"
      @click="filterReset"
    >{{filter.category}} X</b-button>
    <b-button
      class="ml-3 breadcrumbs__item"
      squared
      variant="outline-secondary"
      v-if="filter.product"
      @click="setActiveProduct"
    >{{filter.product}} X</b-button>
    <b-button
      class="ml-3 breadcrumbs__item"
      squared
      variant="outline-secondary"
      v-if="filter.color"
      @click="setActiveColor"
    >{{filter.color}} X</b-button>
    <b-button
      class="ml-3 breadcrumbs__item"
      squared
      variant="outline-secondary"
      v-if="filter.size"
      @click="setActiveSize"
    >{{filter.size}} X</b-button>
  </div>
</template>

<script>
export default {
  computed: {
    filter() {
      return this.$store.state.productFilter;
    }
  },
  methods: {
    filterReset() {
      this.$store.commit("filterReset", "");
    },
    setActiveProduct() {
      this.$store.commit("setFilterProduct", "");
    },
    setActiveColor() {
      this.$store.commit("filterSetColor", "");
    },
    setActiveSize() {
      this.$store.commit("setFilterSize", "");
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  padding-left: 3px;
  &__item {
    font-size: 14px;
  }
}
</style>