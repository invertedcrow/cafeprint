<template>
  <div class="app-menu d-flex flex-column">
    <b-button @click="showFilterModal(true)" squared variant="outline-secondary">
      <div class="app-menu__item-name">Products</div>
    </b-button>
    <b-modal
      v-model="isShowModal.filter"
      @hide="showFilterModal(false)"
      hide-backdrop
      hide-footer
      hide-header
      modal-class="selection-modal"
      size="xl"
    >
      <product-selection />
    </b-modal>

    <b-button @click="showDesignModal(true)" squared variant="outline-secondary">
      <div class="app-menu__item-name">Designs</div>
    </b-button>
    <b-modal
      v-model="isShowModal.design"
      @hide="showDesignModal(false)"
      hide-backdrop
      hide-footer
      hide-header
      modal-class="selection-modal"
      size="xl"
    >
      <design-selection />
    </b-modal>
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
import DesignSelection from "./DesignSelection";
export default {
  components: {
    ProductSelection,
    DesignSelection
  },
  data() {
    return {
      // productModalShow: false
    };
  },
  methods: {
    setMenuActive(menuItem) {
      this.$store.commit("setActiveSettings", menuItem);
    },
    showFilterModal(show) {
      this.$store.commit("showFilterModal", show);
    },
    showDesignModal(show) {
      this.$store.commit("showDesignModal", show);
    }
  },
  computed: {
    isShowModal() {
      return {
        filter: this.$store.state.isShowProductFilter,
        design: this.$store.state.isShowProductDesign
      };
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