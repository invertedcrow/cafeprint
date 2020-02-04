<template>
  <div class="constructor-sidebar">
    <template v-if="activeSidebar === Sidebar.PRODUCT">
      <sidebar-product />
    </template>
    <template v-if="activeSidebar !== Sidebar.PRODUCT">
      <div class="sidebar-card">
        <div class="sidebar-card-body" v-bind:class="{ 'pb-0': activeSidebar === Sidebar.FONT }">
          <template v-if="activeSidebar === Sidebar.TEXT">
            <sidebar-text />
          </template>
          <template v-if="activeSidebar === Sidebar.FONT">
            <sidebar-font></sidebar-font>
          </template>
          <template v-if="activeSidebar === Sidebar.PRICE">
            <sidebar-price></sidebar-price>
          </template>
          <template v-if="activeSidebar === Sidebar.ARTICLE">
            <sidebar-article></sidebar-article>
          </template>
          <template v-if="activeSidebar === Sidebar.LAYERS">
            <sidebar-layers></sidebar-layers>
          </template>
        </div>
      </div>
    </template>

    <sidebar-buttons v-if="isValid" />
  </div>
</template>

<script>
import SidebarProduct from "./SidebarProduct";
import SidebarText from "./SidebarText";
import SidebarFont from "./SidebarFont";
import SidebarPrice from "./SidebarPrice";
import { TextAlignment, Sidebar } from "../consts";
import SidebarArticle from "./SidebarArticle";
import SidebarLayers from "./SidebarLayers";
import SidebarButtons from "./SidebarButtons";
import { mapGetters } from "vuex";
//import { eventBus } from "../main";

export default {
  components: {
    SidebarLayers,
    SidebarArticle,
    SidebarProduct,
    SidebarFont,
    SidebarText,
    SidebarPrice,
    SidebarButtons
  },
  data() {
    return {
      TextAlignment,
      Sidebar
    };
  },
  computed: {
    ...mapGetters(["isValid"]),
    activeSidebar() {
      return this.$store.state.activeSidebar;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>