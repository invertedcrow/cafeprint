<template>
  <div>
    <b-modal :id="MODALS.PRODUCTS" hide-footer hide-header modal-class="products-modal xl-modal">
      <modal-products />
    </b-modal>

    <!-- @hide="showFilterModal(false)" -->

    <b-modal :id="MODALS.DESIGNS" hide-footer hide-header modal-class="design-modal xl-modal">
      <modal-design />
    </b-modal>

    <b-modal :id="MODALS.UPLOAD" modal-class="upload-modal md-modal" hide-footer hide-header>
      <modal-upload />
    </b-modal>

    <b-modal :id="MODALS.INFO" modal-class="info-modal md-modal" hide-footer hide-header>
      <modal-info />
    </b-modal>

    <b-modal :id="MODALS.SIZES" modal-class="sizes-modal md-modal" hide-footer hide-header>
      <modal-sizes />
    </b-modal>

    <b-modal :id="MODALS.SIZES_READONLY" modal-class="sizes-modal md-modal" hide-footer hide-header>
      <modal-sizes :readonly="true" />
    </b-modal>

    <b-modal :id="MODALS.MESSAGE" modal-class="message-modal" hide-footer hide-header>
      <modal-message :message="message" />
    </b-modal>

    <b-modal :id="MODALS.CART_ADDED" modal-class="message-modal" hide-footer hide-header>
      <modal-message-cart />
    </b-modal>
  </div>
</template>

<script>
import { eventBus } from "../main";
import { MODALS } from "../consts";
import ModalProducts from "./ModalProducts";
import ModalDesign from "./ModalDesign";
import ModalUpload from "./ModalUpload";
import ModalInfo from "./ModalInfo";
import ModalSizes from "./ModalSizes";
import ModalMessage from "./ModalMessage";
import ModalMessageCart from "./ModalMessageCart";

export default {
  components: {
    ModalProducts,
    ModalDesign,
    ModalUpload,
    ModalInfo,
    ModalSizes,
    ModalMessage,
    ModalMessageCart
  },
  data() {
    return {
      MODALS,
      message: ""
    };
  },
  mounted() {
    eventBus.$on("showModal", (modalId, message) => {
      this.message = message ? message : "";
      this.$bvModal.show(modalId);
    });
    eventBus.$on("hideModal", modalId => {
      this.$bvModal.hide(modalId);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>