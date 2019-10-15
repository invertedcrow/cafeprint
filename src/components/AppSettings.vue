<template>
  <div class="settings d-flex flex-column justify-content-between">
    <products-settings v-if="activeMenu === 'products'" />
    <div v-if="activeMenu === 'text'">TEXT here</div>
    <b-button squared variant="info">Get Price</b-button>
  </div>
</template>

<script>
import ProductsSettings from "./ProductsSettings";

export default {
  components: {
    ProductsSettings
  },
  computed: {
    activeMenu() {
      return this.$store.state.activeMenu;
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