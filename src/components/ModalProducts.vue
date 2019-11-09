<template>
  <div class="product">
    <div class="modal-title">Категории товаров</div>

    <div class="modal-head">
      <div class="modal-head__close" @click="onHide()">
        <svg
          data-v-0cb6d606
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="17px"
          height="17px"
          viewBox="0 0 357 357"
        >
          <polygon
            data-v-0cb6d606
            points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"
          />
        </svg>
      </div>
    </div>
    <perfect-scrollbar>
      <div class="product-selection">
        <div class="product-selection__filter-pane">
          <product-filter />
        </div>
        <div class="product-selection__center-block d-flex flex-column justify-content-between">
          <product-selection-list />
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import ProductFilter from "./ProductFilter";
import ProductSelectionList from "./ProductSelectionList";
import { MODALS } from "../consts";
import { eventBus } from "../main";

export default {
  components: {
    ProductFilter,
    ProductSelectionList
  },
  computed: {
    getActiveCategory() {
      return this.$store.state.filter.category;
    }
  },
  methods: {
    onHide() {
      eventBus.$emit("hideModal", MODALS.PRODUCTS);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-head {
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    margin-bottom: 0;
  }
  &__close {
    right: 17px;
    top: 18px;
  }
}

.product-selection {
  display: flex;
  justify-content: space-between;
  max-height: 750px;
  &__filter-pane {
    width: 190px;
    flex-shrink: 0;
  }
  &__center-block {
    padding-top: 5px;
    position: relative;
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    max-height: 1200px;
    &__filter-pane {
      width: 100%;
    }
  }
}
.modal-title {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
}
</style>