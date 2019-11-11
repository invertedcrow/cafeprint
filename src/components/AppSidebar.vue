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

    <button
      v-if="activeSidebar === Sidebar.PRICE"
      @click="onAddToCart"
      class="get-price"
    >Добавить в корзину</button>
    <button v-else @click="onGetPriceClicked" class="get-price">Узнать стоимость</button>
    <button id="popover-select-side" class="get-price">Сохранить себе</button>

    <b-popover
      custom-class="picker-popover"
      placement="top"
      target="popover-select-side"
      triggers="focus"
    >
      <div
        class="baseBtn secondary"
        v-for="(item, index) in renderSides"
        :key="index"
        @click="onSave(item)"
        title="'Выберите сторону которую отображать на превью'"
      >{{item.name}}</div>
    </b-popover>
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
import { mapGetters, mapActions } from "vuex";
import { GET_PRICE, SAVE_SIDES_ELEMS_SAVE } from "../store/actions.type";
import {
  PRICE_SET_ITEM,
  PRICE_RESET,
  PRICE_SET_SIDES_LIST
} from "../store/mutations.type";
import { eventBus } from "../main";

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
    ...mapGetters([
      "base",
      "color",
      "size",
      "printSize",
      "baseSizes",
      "renderSides"
    ]),
    activeSidebar() {
      return this.$store.state.activeSidebar;
    }
  },
  methods: {
    ...mapActions([SAVE_SIDES_ELEMS_SAVE]),
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
    },
    onSave(item) {
      console.log("SAVE");
      console.log(this.$store.state);
      let sides = [];
      let elems = document.querySelectorAll(".sides__item");
      sides = this.renderSides.map((item, i) => {
        return {
          svg: elems[i].innerHTML,
          sideId: item.id
        };
      });
      const params = {
        mainblank_id: item.mainblank_id,
        preview_side_id: item.id,
        sides
      };
      console.log(params);
      this.$store.dispatch(SAVE_SIDES_ELEMS_SAVE, params);
    }
  }
};
</script>

<style lang="scss" scoped>
.constructor-sidebar {
  margin-top: 50px;
}
button.get-price {
  width: 200px;
  padding: 8px;
  border-radius: 30px;
  background-color: #72b425;
  color: #fff;
  border: 0;
  &:focus,
  &:active {
    outline: none;
  }
  &:last-child {
    margin-top: 10px;
  }
}
</style>