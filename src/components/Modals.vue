<template>
  <div>
    <b-modal
      :id="MODALS.PRODUCTS"
      hide-backdrop
      hide-footer
      hide-header
      modal-class="selection-modal"
      size="xl"
    >
      <product-selection />
    </b-modal>

    <!-- @hide="showFilterModal(false)" -->

    <b-modal
      :id="MODALS.DESIGNS"
      hide-backdrop
      hide-footer
      hide-header
      modal-class="selection-modal"
      size="xl"
    >
      <design-selection />
    </b-modal>

    <b-modal :id="MODALS.UPLOAD" modal-class="upload-modal" hide-footer hide-header>
      <modal-upload />
    </b-modal>
  </div>
</template>

<script>
import { eventBus } from "../main";
import { MODALS } from "../consts";
import ProductSelection from "./ProductSelection";
import DesignSelection from "./DesignSelection";
import ModalUpload from "./ModalUpload";

export default {
  components: {
    ProductSelection,
    DesignSelection,
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