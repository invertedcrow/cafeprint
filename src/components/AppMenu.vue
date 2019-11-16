<template>
  <div class="app-menu">
    <div class="app-menu__item">
      <b-button @click="showModalProducts()" class="btn-circle">
        <div class="app-menu__item-name">
          <img src="../assets/icons/tshirt.png" />
        </div>
      </b-button>
      <div class="hint">
        <span class="hint__content">Тип изделия</span>
      </div>
      <div class="app-menu__item-title">Изделие</div>
    </div>

    <div class="app-menu__item">
      <b-button @click="showModalDesign()" class="btn-circle">
        <div class="app-menu__item-name">
          <img src="../assets/icons/image.svg" />
        </div>
      </b-button>
      <div class="hint">
        <span class="hint__content">Принты</span>
      </div>
      <div class="app-menu__item-title">Принт</div>
    </div>

    <div class="app-menu__item">
      <b-button @click="onAddText()" class="btn-circle">
        <div class="app-menu__item-name">
          <img src="../assets/icons/text.svg" />
        </div>
      </b-button>
      <div class="hint">
        <span class="hint__content">Добавить текст</span>
      </div>
      <div class="app-menu__item-title">Текст</div>
    </div>
    <div class="app-menu__item">
      <b-button @click="showModalUpload()" class="btn-circle">
        <div class="app-menu__item-name">
          <img src="../assets/icons/import.svg" />
        </div>
      </b-button>
      <div class="hint">
        <span class="hint__content">Загрузить</span>
      </div>
      <div class="app-menu__item-title">Импорт</div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import { MODALS } from "../consts.js";

export default {
  methods: {
    showModalProducts() {
      eventBus.$emit("showModal", MODALS.PRODUCTS);
    },
    showModalDesign() {
      eventBus.$emit("showModal", MODALS.DESIGNS);
    },
    showModalUpload() {
      eventBus.$emit("showModal", MODALS.UPLOAD);
    },
    onAddText() {
      this.$store.commit("addText", true);
      this.$store.commit("setActiveSidebar", "text");
    }
  }
};
</script>

<style lang="scss" scoped>
.app-menu {
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 992px) {
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    margin-bottom: 50px;
  }
  &__item {
    margin: 10px 0;
    position: relative;
    &-title {
      margin-top: 15px;
      font-size: 12px;
      font-weight: 700;
      opacity: 0.85;
      text-align: center;
      display: none;
    }
  }

  .btn-circle {
    position: relative;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 0;
    color: #fff;
    background-color: #72b425;
    z-index: 2;
  }

  .btn-circle:hover + .hint {
    max-width: 500px;
    position: absolute;
    width: 170px;
  }

  .hint {
    position: absolute;
    left: 30px;
    top: 0;
    z-index: 1;
    max-width: 0;
    overflow: hidden;
    height: 100%;
    border: 1px solid #72b425;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    transition: all 0.5s ease;
    &__content {
      margin-left: 40px;
      margin-right: 25px;
      font-size: 14px;
      font-weight: 600;
      line-height: 60px;
      position: absolute;
      width: 100%;
    }
  }
  @media screen and (max-width: 992px) {
    .hint {
      display: none;
    }
    .app-menu__item-title {
      display: block;
    }
  }
}
</style>