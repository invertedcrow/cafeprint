<template>
  <div class="app-menu d-flex flex-column">
    <div class="app-menu__item">
      <b-button @click="showFilterModal(true)" class="btn-circle">
        <div class="app-menu__item-name">P</div>
      </b-button>
      <div class="hint">
        <span class="hint__content">Products</span>
      </div>
    </div>

    <div class="app-menu__item">
      <b-button @click="showDesignModal(true)" class="btn-circle">
        <div class="app-menu__item-name">D</div>
      </b-button>
      <div class="hint">
        <span class="hint__content">Designs</span>
      </div>
    </div>

    <div class="app-menu__item">
      <b-button @click="onAddText()" class="btn-circle">
        <div class="app-menu__item-name">T</div>
      </b-button>
      <div class="hint">
        <span class="hint__content">Text</span>
      </div>
    </div>
    <div class="app-menu__item">
      <b-button class="btn-circle">
        <div class="app-menu__item-name">U</div>
      </b-button>
      <div class="hint">
        <span class="hint__content">Upload</span>
      </div>
    </div>


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

  </div>




  <!--<div class="menu-item">-->
    <!--<b-button class="btn-circle">D</b-button>-->
    <!--<div class="hint-wrapper">-->
      <!--<span class="hint-content">Designs</span>-->
    <!--</div>-->
  <!--</div>-->
  <!--<div class="menu-item">-->
    <!--<b-button @click="setMenuActive('text')" variant="outline-secondary" class="btn-circle">T</b-button>-->
    <!--<div class="hint-wrapper">-->
      <!--<span class="hint-content">Text</span>-->
    <!--</div>-->
  <!--</div>-->

  <!--<div class="menu-item">-->
    <!--<b-button class="btn-circle">U</b-button>-->
    <!--<div class="hint-wrapper">-->
      <!--<span class="hint-content">Upload</span>-->
    <!--</div>-->
  <!--</div>-->

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
    onAddText() {
      this.$store.commit("addText", true);
      this.$store.commit("setActiveSettings", "text");
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
  //border: grey 1px solid;
  //background-color: #fff;
  position: absolute;
  left: 20px;
  top: 10px;
  &__item {
    margin: 10px 0;
    position: relative;
  }

  .btn-circle {
    position: relative;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 0;
    color: #fff;
    background-color: #72B425;
    z-index: 2;
  }

  .btn-circle:hover + .hint {
    max-width: 500px;
  }

  .hint {
    position: absolute;
    left: 30px;
    top: 0;
    z-index: 1;
    max-width: 0;
    overflow: hidden;
    height: 100%;
    border: 1px solid #72B425;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    transition: all .5s ease;
    &__content {
      margin-left: 50px;
      margin-right: 25px;
      font-size: 14px;
      font-weight: 600;
      line-height: 60px;
    }
  }
}
</style>