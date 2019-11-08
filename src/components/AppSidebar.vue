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

    <button
      v-if="activeSidebar === Sidebar.PRICE"
      @click="onAddToCart"
      class="get-price"
    >Добавить в корзину</button>
    <button v-else @click="onGetPriceClicked" class="get-price">Узнать стоимость</button>
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
import { PRICE_SET_ITEM, PRICE_RESET } from "../store/mutations.type";

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
    ...mapGetters(["base", "color", "size", "printSize", "baseSizes"]),
    activeSidebar() {
      return this.$store.state.activeSidebar;
    }
  },
  methods: {
    onGetPriceClicked() {
      let items = [];
      this.baseSizes.forEach(item => {
        items.push({ size_id: item.id, printSizeId: this.printSize.id });
      });
      if (this.activeSidebar !== Sidebar.PRICE) {
        this.$store.commit(PRICE_RESET, "");
      }
      const params = {
        id: this.base.id,
        color_id: this.color.id,
        full: this.printSize.id ? 0 : 1,
        items
      };
      this.size.quantity = 1;
      this.$store.commit(PRICE_SET_ITEM, this.size);
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