<template>
  <div class="design d-flex justify-content-between">
    <div class="design__search-pane d-flex flex-column">
      <design-selection-search />
      <design-selection-categories />
    </div>
    <div class="design__list d-flex flex-wrap">
      <div
        class="design__item d-flex flex-column align-items-center"
        v-for="item in list"
        :key="item"
      >
        <div class="design__item-img d-flex flex-column align-items-center">
          <img src="../assets/2.webp" alt />
        </div>
        <div class="design__item-info d-flex justify-content-between">
          <div class="design__item-title text-muted mr-2">Mens long Sleeve T-Short By</div>
          <div class="design__item-price">$23.99</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DesignSelectionSearch from "./DesignSelectionSearch";
import DesignSelectionCategories from "./DesignSelectionCategories";

export default {
  components: {
    DesignSelectionSearch,
    DesignSelectionCategories
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 19, 23, 34, 45, 56, 67, 78]
    };
  }
};
</script>

<style lang="scss" scoped>
.design {
  max-height: 750px;
  overflow: hidden;
  &__search-pane {
    padding: 15px;
    width: 320px;
  }
  &__list {
    width: 100%;
    overflow-y: scroll;
  }
  &__item {
    margin-right: 5px;
    width: calc(20% - 10px);
    &:hover {
      cursor: pointer;
    }
    &-img {
      width: 100%;
      padding: 0 15px;
      background-color: whitesmoke;
      img {
        width: 150px;
        height: 150px;
      }
    }
    &-info {
      width: 100%;
      font-size: 12px;
      line-height: 25px;
    }
    &-title {
      flex: 1;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>