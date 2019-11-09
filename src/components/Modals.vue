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

export default {
  components: {
    ModalProducts,
    ModalDesign,
    ModalUpload,
    ModalInfo,
    ModalSizes
  },
  data() {
    return {
      MODALS
    };
  },
  mounted() {
    eventBus.$on("showModal", modalId => {
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