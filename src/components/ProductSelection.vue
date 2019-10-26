<template>
  <div class="product-selection">
    <div class="product-selection__filter-pane" v-if="!showPreview">
      <product-selection-filter />
    </div>
    <div class="product-selection__center-block d-flex flex-column justify-content-between">
      <product-selection-breadcrumbs v-if="getActiveCategory" />
      <product-selection-list />
      <b-button
        class="product-selection__back-btn"
        squared
        variant="info"
        @click="resetPreview"
        v-if="showPreview"
      >Back</b-button>
    </div>
    <div class="product-selection__product-block" v-if="showPreview">
      <product-selection-preview />
    </div>
  </div>
</template>

<script>
import ProductSelectionFilter from "./ProductSelectionFilter";
import ProductSelectionList from "./ProductSelectionList";
import ProductSelectionBreadcrumbs from "./ProductSelectionBreadcrumbs";
import ProductSelectionPreview from "./ProductSelectionPreview";

export default {
  components: {
    ProductSelectionFilter,
    ProductSelectionList,
    ProductSelectionBreadcrumbs,
    ProductSelectionPreview
  },
  computed: {
    getActiveCategory() {
      return this.$store.state.filter.category;
    },
    showPreview() {
      return this.$store.state.filter.showPreview;
    }
  },
  methods: {
    resetPreview() {
      this.$store.commit("showFilterPreview", false);
      this.$store.commit("filterResetPreview");
    }
  }
};
</script>

<style lang="scss" scoped>
.product-selection {
  display: flex;
  justify-content: space-between;
  max-height: 750px;
  &__back-btn {
    position: absolute;
    left: 0;
    top: 45%;
    height: 100px;
  }
  &__filter-pane {
    width: 296px;
    overflow-y: scroll;
    flex-shrink: 0;
  }
  &__product-block {
    width: 296px;
    flex-shrink: 0;
  }
  &__center-block {
    padding-top: 5px;
    position: relative;
    width: 100%;
  }
}
</style>