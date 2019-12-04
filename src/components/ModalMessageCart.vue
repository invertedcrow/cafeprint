<template>
  <div class="d-flex flex-column">
    <div class="modal-head">
      <!-- <div class="modal-head__icon">
        <img src="../assets/icons/information2.png" alt />
      </div>-->
      <div class="modal-head__title">ТОВАР ДОБАВЛЕН В КОРЗИНУ!</div>
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
    <div class="modal-footer__controls d-flex justify-content-between">
      <button class="baseBtn w-100" @click="onRedirectToCart">В корзину</button>
      <button class="baseBtn secondary w-100" @click="onHide">Продолжить</button>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";
import { MODALS } from "../consts";

export default {
  props: ["message"],
  methods: {
    onHide() {
      eventBus.$emit("hideModal", MODALS.CART_ADDED);
    },
    onRedirectToCart() {
      window.location.replace("/cart");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-footer__controls {
  .secondary {
    margin-left: 15px;
  }
}
</style>