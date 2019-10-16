<template>
  <div class="settings d-flex flex-column justify-content-between">
    <products-settings v-if="activeSettings === 'products'" />
    <text-edit v-if="activeSettings === 'text'" />
    <b-button squared variant="info">Get Price</b-button>
  </div>
</template>

<script>
import ProductsSettings from "./ProductsSettings";
import TextEdit from "./TextEdit";
export default {
  components: {
    ProductsSettings,
    TextEdit
  },
  computed: {
    activeSettings() {
      return this.$store.state.activeSettings;
    }
  }
};
</script>

<style lang="scss" scoped>
.settings {
  width: 340px;
  position: absolute;
  right: 20px;
  bottom: 10px;
}
</style>