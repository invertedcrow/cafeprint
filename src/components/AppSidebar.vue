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
      v-if="activeSidebar === Sidebar.PRICE && this.sidesElems.length"
      @click="onAddToCart"
      class="get-price"
    >Добавить в корзину</button>
    <button
      v-if="activeSidebar !== Sidebar.PRICE && this.sidesElems.length"
      @click="onGetPriceClicked"
      class="get-price"
    >Узнать стоимость</button>
    <button
      id="popover-select-side"
      class="get-price"
      v-show="this.sidesElems.length"
    >Сохранить себе</button>

    <b-popover
      ref="popover"
      custom-class="sides-popover"
      placement="top"
      target="popover-select-side"
      triggers="focus"
      title="Выберите сторону которую отображать на превью"
    >
      <div
        class="baseBtn secondary"
        v-for="(item, index) in renderSides"
        :key="index"
        @click="onSave(item)"
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
import {
  GET_PRICE,
  SAVE_SIDES_ELEMS_SAVE,
  SAVE_TO_CART
} from "../store/actions.type";
import {
  PRICE_SET_ITEM,
  PRICE_RESET,
  SAVE_SET_SIDES_LIST
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
      "renderSides",
      "sidesElems",
      "sizesList",
      "color"
    ]),
    activeSidebar() {
      return this.$store.state.activeSidebar;
    }
  },
  methods: {
    ...mapActions([SAVE_SIDES_ELEMS_SAVE, SAVE_TO_CART]),
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
      const params = {
        mainblank_id: item.mainblank_id,
        preview_side_id: item.id,
        sides: this.sidesElems
      };
      this.$refs.popover.$emit("close");
      this.$store.dispatch(SAVE_SIDES_ELEMS_SAVE, params);
    },
    onAddToCart() {
      const items = [];
      this.sizesList.forEach((size, i) => {
        let item = {};
        let print_sizes = [];
        this.base.sides.forEach(side => {
          print_sizes = [{ sideId: side.id, print_size_id: this.printSize.id }];
        });
        if (size.quantity) {
          item = {
            color_id: this.color.id,
            size_id: size.id,
            count: size.quantity,
            is_service: 0,
            svg: this.sidesElems,
            print_sizes,
            feature: this.base.features
          };
          items.push(item);
        }
      });
      this.$store.dispatch(SAVE_TO_CART, { items });
    }
  }
};
</script>

<style lang="scss" scoped>
.constructor-sidebar {
  margin-top: 50px;
  @media screen and (max-width: 992px) {
    margin-top: 0;
  }
  @media screen and (max-width: 768px) {
    margin-top: 50px;
  }
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