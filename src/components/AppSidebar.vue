<template>
  <div class="sidebar">
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

    <button @click="onGetPriceClicked" class="get-price">Узнать стоимость</button>
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
import { mapGetters } from "vuex";
import { GET_PRICE } from "../store/actions.type";

export default {
  components: {
    SidebarLayers,
    SidebarArticle,
    SidebarProduct,
    SidebarFont,
    SidebarText,
    SidebarPrice
  },
  data() {
    return {
      TextAlignment,
      Sidebar
    };
  },
  computed: {
    ...mapGetters(["base", "color", "size", "printSize"]),
    activeSidebar() {
      return this.$store.state.activeSidebar;
    }
  },
  methods: {
    onGetPriceClicked() {
      console.log("get price");

      let item = [
        { size_id: this.size.id },
        { printSizeId: this.printSize.id }
      ];

      const params = {
        id: this.base.id,
        color_id: this.color.id,
        full: 0,
        items: [[item]]
      };
      console.log(params);
      this.$store.dispatch(GET_PRICE, params);
      this.$store.commit("setActiveSidebar", Sidebar.PRICE);
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  margin-top: 50px;
}
button.get-price {
  padding: 8px 30px;
  border-radius: 30px;
  background-color: #72b425;
  color: #fff;
  border: 0;
  &:focus,
  &:active {
    outline: none;
  }
}
</style>