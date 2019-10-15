<template>
  <div class="app-menu d-flex flex-column">
    <b-button @click="showFilterModal" squared variant="outline-secondary">
      <div class="app-menu__item-name">Products</div>
    </b-button>
    <b-modal
      v-model="isShowModal"
      hide-backdrop
      hide-footer
      hide-header
      modal-class="selection-modal"
      size="xl"
    >
      <product-selection />
    </b-modal>

    <b-button squared variant="outline-secondary">
      <div class="app-menu__item-name">Designs</div>
    </b-button>
    <b-button @click="setMenuActive('text')" squared variant="outline-secondary">
      <div class="app-menu__item-name">Text</div>
    </b-button>
    <b-button squared variant="outline-secondary">
      <div class="app-menu__item-name">Upload</div>
    </b-button>
  </div>
</template>

<script>
import ProductSelection from "./ProductSelection";

export default {
  components: {
    ProductSelection
  },
  data() {
    return {
      // productModalShow: false
    };
  },
  methods: {
    setMenuActive(menuItem) {
      this.$store.commit("setActiveMenu", menuItem);
    },
    showFilterModal() {
      this.$store.commit("showFilterModal", true);
    }
  },
  computed: {
    isShowModal() {
      return this.$store.state.isShowProductFilter;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-menu {
  border: grey 1px solid;
  background-color: #fff;
  position: absolute;
  left: 20px;
  top: 10px;
}
</style>