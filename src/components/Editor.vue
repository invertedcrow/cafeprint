<template>
  <div>
    <app-menu/>
    <app-main/>
    <app-settings/>        
    <sides :sides="selectedProduct.sides" :setActiveSide="setActiveSide"/>    
  </div>
</template>

<script>
import AppMenu from "./AppMenu";
import AppSettings from "./AppSettings";
import AppMain from "./AppMain";
import Sides from "./Sides";

export default {
  components: {
    AppMenu,
    AppSettings,
    AppMain,
    Sides
  },
  computed: {
    selectedProduct() {
      return this.$store.state.selectedProduct;
    }
  },
  methods: {
    setActiveSide(side) {
      this.$store.commit('setSelectedSide', side.key);
      this.$store.commit('setSelectedElement', null);
    }
  }  
};
</script>

<style lang="scss" scoped></style>