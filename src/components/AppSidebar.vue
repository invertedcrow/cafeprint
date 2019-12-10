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

    <div class="constructor-sidebar__btns" v-if="isValid">
      <button
        v-if="activeSidebar !== Sidebar.PRICE && this.sidesElems.length && items.length && !editProfileProduct"
        @click.prevent="onGetPriceClicked"
        class="get-price"
      >Узнать стоимость</button>
      <button
        id="popover-select-side"
        class="get-price"
        v-show="this.sidesElems.length && userRole != USER_ROLE.guest && items.length "
      >Сохранить себе</button>
      <button
        id="popover-select-side-admin"
        class="get-price"
        v-show="(userRole == USER_ROLE.admin || userRole == USER_ROLE.printer) && items.length && editProduct && !editProfileProduct"
      >Сохранить</button>
      <button
        id="popover-select-side-product"
        class="get-price"
        v-show="(userRole == USER_ROLE.admin || userRole == USER_ROLE.printer) && items.length"
      >Добавить продукт</button>
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
      <b-popover
        ref="popover"
        custom-class="sides-popover"
        placement="top"
        target="popover-select-side-admin"
        triggers="focus"
        title="Выберите сторону которую отображать на превью"
      >
        <div
          class="baseBtn secondary"
          v-for="(item, index) in renderSides"
          :key="index"
          @click="onUpdatePrint(item)"
        >{{item.name}}</div>
      </b-popover>
      <b-popover
        ref="popover"
        custom-class="sides-popover"
        placement="top"
        target="popover-select-side-product"
        triggers="focus"
        title="Выберите сторону которую отображать на превью"
      >
        <div
          class="baseBtn secondary"
          v-for="(item, index) in renderSides"
          :key="index"
          @click="onCreateproduct(item)"
        >{{item.name}}</div>
      </b-popover>
      <!-- form send -->
      <form ref="form" action="/product/add-product" method="POST">
        <input type="hidden" name="_csrf" :value="csrf" />
        <input type="text" class="svgDataSubmit" hidden name="data" :value="formProductData" />
      </form>
    </div>
  </div>
</template>

<script>
import SidebarProduct from "./SidebarProduct";
import SidebarText from "./SidebarText";
import SidebarFont from "./SidebarFont";
import SidebarPrice from "./SidebarPrice";
import { TextAlignment, Sidebar, USER_ROLE } from "../consts";
import SidebarArticle from "./SidebarArticle";
import SidebarLayers from "./SidebarLayers";
import { mapGetters, mapActions } from "vuex";
import {
  GET_PRICE,
  SAVE_SIDES_ELEMS_SAVE,
  SAVE_TO_CART,
  SAVE_CHANGES,
  SAVE_ADD_PRODUCT
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
      Sidebar,
      USER_ROLE,
      csrf: null,
      formProductData: null
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
      "color",
      "maxPrintSize",
      "userRole",
      "items",
      "isValid",
      "editProduct",
      "features",
      "editProfileProduct"
    ]),
    activeSidebar() {
      return this.$store.state.activeSidebar;
    }
  },
  methods: {
    ...mapActions([
      SAVE_SIDES_ELEMS_SAVE,
      SAVE_TO_CART,
      SAVE_CHANGES,
      SAVE_ADD_PRODUCT
    ]),
    onGetPriceClicked() {
      let items = [];
      this.baseSizes.forEach(size => {
        let sides = [];
        this.base.sides.forEach(item => {
          if (this.maxPrintSize) {
            if (item.items.length && item.printSize) {
              sides.push({
                side_id: item.id,
                print_size_id: item.printSize.id
              });
            }
          } else {
            sides.push({ side_id: item.id });
          }
        });
        items.push({ size_id: size.id, sides });
      });

      if (this.activeSidebar !== Sidebar.PRICE) {
        // this.$store.commit(PRICE_RESET, "");
      }

      const params = {
        id: this.base.id,
        color_id: this.color.id,
        full: this.maxPrintSize ? 0 : 1,
        features: this.features,
        items
      };
      if (!this.size) {
        let size = {
          id: 0,
          quantity: 1
        };
        this.$store.commit(PRICE_SET_ITEM, size);
      } else {
        this.size.quantity = 1;
        this.$store.commit(PRICE_SET_ITEM, this.size);
      }
      this.$store.dispatch(GET_PRICE, params);
      this.$store.commit("setActiveSidebar", Sidebar.PRICE);
    },
    onSave(item) {
      let sides = this.sidesElems.slice();
      sides.forEach(side => {
        side.svg = side.svg
          .replace(/<mask.*mask>/, "")
          .replace(/mask="url\(\#mainMask\)"/g, "")
          .replace(/\<image.*?<\/image>/, "");
      });
      const params = {
        mainblankid: item.mainblank_id,
        preview_side_id: item.id,
        colormainblank_id: this.color.id,
        features: this.features,
        sides
      };
      this.$refs.popover.$emit("close");
      this.$store.dispatch(SAVE_SIDES_ELEMS_SAVE, params);
    },
    onUpdatePrint(item) {
      let sides = [];

      this.base.sides.forEach(side => {
        let svgSide = this.sidesElems.find(
          itemSide => itemSide.sideId == side.id
        );

        let svg = svgSide.svg
          .replace(/<mask.*mask>/, "")
          .replace(/mask="url\(\#mainMask\)"/g, "")
          //.replace(/\<image.*?<\/image>/, "");
          .replace(/.([^<]*)mainblanks(.*?)<\/image>/, "");
        if (side.items.length) {
          let itemSide = {
            svg: svg,
            //  size: this.size.id,
            sideId: side.id,
            isModify: true
          };

          if (this.base.printSizes && this.base.printSizes.length) {
            itemSide.print_size_id = side.printSize
              ? side.printSize.id
              : this.base.printSizes[0].id;
          }

          sides.push(itemSide);
        }
        // } else {
        //   sides.push({ side_id: item.id });
        // }
      });

      const params = {
        data: {
          mainblankid: item.mainblank_id,
          isConstructor: true,
          colormainblank_id: this.color.id,
          size_id: this.size.id,
          sides: sides,
          //  sides: this.sidesElems,
          previewSideId: item.id,
          productid: this.editProduct,
          // sizePrint: this.printSize.id,
          // size: this.size.id,

          preview: "",
          second_preview: null
        },
        selected_color: 85
      };

      this.$store.dispatch(SAVE_CHANGES, params);
    },
    onCreateproduct(item) {
      let sides = [];
      const tokenElement = document.querySelector('[name="csrf-token"]');
      this.csrf = tokenElement.getAttribute("content");
      this.base.sides.forEach(side => {
        let svgSide = this.sidesElems.find(
          itemSide => itemSide.sideId == side.id
        );

        let svg = svgSide.svg
          .replace(/<mask.*mask>/, "")
          .replace(/mask="url\(\#mainMask\)"/g, "")
          //.replace(/\<image.*?<\/image>/, "");
          .replace(/.([^<]*)mainblanks(.*?)<\/image>/, "");
        if (side.items.length && side.printSize) {
          sides.push({
            svg: svg,
            print_size_id: side.printSize.id,
            sideId: side.id,
            sizePrint: side.printSize.id,
            size: this.size.id
          });
        }
      });

      const params = {
        data: {
          mainblankid: item.mainblank_id,
          isConstructor: true,
          colormainblank_id: this.color.id,
          size_id: this.size.id,
          sides: sides,
          previewSideId: item.id,
          productid: this.editProduct,
          preview: "",
          second_preview: null
        },
        selected_color: 85
      };

      this.formProductData = JSON.stringify(params.data);
      setTimeout(() => {
        this.$refs.form.submit();
      });

      //this.$store.dispatch(SAVE_ADD_PRODUCT, params);
    }
  }
};
</script>

<style lang="scss" scoped>
.constructor-sidebar {
  //margin-top: 50px;
  &__btns {
    margin: -5px;
  }
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
  margin: 5px;
  &:focus,
  &:active {
    outline: none;
  }
}
</style>