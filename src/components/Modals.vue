<template>
  <div>
    <b-modal :id="MODALS.PRODUCTS" hide-footer hide-header modal-class="products-modal xl-modal">
      <modal-products />
    </b-modal>

    <!-- @hide="showFilterModal(false)" -->

    <b-modal :id="MODALS.DESIGNS" hide-footer hide-header modal-class="design-modal xl-modal">
      <modal-design />
    </b-modal>

    <b-modal :id="MODALS.UPLOAD" modal-class="upload-modal" hide-footer hide-header>
      <modal-upload />
    </b-modal>
  </div>
</template>

<script>
import { eventBus } from "../main";
import { MODALS } from "../consts";
import ModalProducts from "./ModalProducts";
import ModalDesign from "./ModalDesign";
import ModalUpload from "./ModalUpload";

export default {
  components: {
    ModalProducts,
    ModalDesign,
    ModalUpload
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