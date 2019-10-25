<template>
  <div class="app-menu d-flex flex-column">
    <div class="app-menu__item">
      <b-button @click="showModalProducts()" class="btn-circle">
        <div class="app-menu__item-name">
            <img src="../assets/icons/product.svg">
        </div>
      </b-button>
      <div class="hint">
        <span class="hint__content">Products</span>
      </div>
    </div>

    <div class="app-menu__item">
      <b-button @click="showModalDesign()" class="btn-circle">
        <div class="app-menu__item-name">
          <img src="../assets/icons/image.svg">
        </div>
      </b-button>
      <div class="hint">
        <span class="hint__content">Designs</span>
      </div>
    </div>

    <div class="app-menu__item">
      <b-button @click="onAddText()" class="btn-circle">
        <div class="app-menu__item-name">
          <img src="../assets/icons/text.svg">
        </div>
      </b-button>
      <div class="hint">
        <span class="hint__content">Text</span>
      </div>
    </div>
    <div class="app-menu__item">
      <b-button @click="showModalUpload()" class="btn-circle">
        <div class="app-menu__item-name">
          <img src="../assets/icons/import.svg">
        </div>
      </b-button>
      <div class="hint">
        <span class="hint__content">Upload</span>
      </div>
    </div>
  </div>
</template>

<script>

import {eventBus} from "../main.js";
import {MODALS} from "../consts.js";

export default {
  methods: {
    showModalProducts() {
      eventBus.$emit('showModal', MODALS.PRODUCTS);
    },
    showModalDesign() {
      eventBus.$emit('showModal', MODALS.DESIGNS);
    },
    showModalUpload() {
      eventBus.$emit('showModal', MODALS.UPLOAD);
    },    
    onAddText() {
      this.$store.commit("addText", true);
      this.$store.commit("setActiveSettings", "text");
    }
  }
};
</script>

<style lang="scss" scoped>
.app-menu {
  //border: grey 1px solid;
  //background-color: #fff;
  /*position: absolute;*/
  /*left: 20px;*/
  /*top: 10px;*/
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