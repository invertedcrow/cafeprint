<template>
  <div class="constructor-sidebar__btns">
    <button
      v-if="activeSidebar !== Sidebar.PRICE && activeSidebar !== Sidebar.ARTICLE && this.sidesElems.length && items.length && !editOrderProduct"
      @click.prevent="onGetPriceClicked"
      class="get-price"
    >Узнать стоимость</button>
    <button
      id="popover-select-side"
      class="get-price"
      v-show="this.sidesElems.length && userRole != USER_ROLE.guest && items.length && !editCartProduct && !editOrderProduct"
    >Сохранить себе</button>
    <button
      id="popover-select-side"
      class="get-price"
      @click="saveChangesToCartItem"
      v-show="editCartProduct && !editOrderProduct"
    >Сохранить изменения</button>
    <button
      id="popover-select-side-admin"
      class="get-price"
      v-show="editOrderProduct"
    >Сохранить изменения</button>
    <button
      id="popover-select-side-admin-save"
      class="get-price"
      v-show="(userRole == USER_ROLE.admin || userRole == USER_ROLE.printer) && items.length && editProduct && !editProfileProduct && !editCartProduct && !editOrderProduct"
    >Сохранить</button>
    <button
      id="popover-select-side-product"
      class="get-price"
      v-show="(userRole == USER_ROLE.admin || userRole == USER_ROLE.printer) && items.length && !editCartProduct && !editOrderProduct"
    >Добавить продукт</button>
    <b-popover
      ref="popover"
      custom-class="sides-popover"
      placement="top"
      target="popover-select-side"
      triggers="focus click touchstart"
      title="Выберите сторону которую отображать на превью"
    >
      <div
        class="baseBtn secondary"
        v-for="(item, index) in renderSides"
        :key="index"
        @click="onSaveToProfile(item)"
      >{{item.name}}</div>
    </b-popover>
    <b-popover
      ref="popover"
      custom-class="sides-popover"
      placement="top"
      target="popover-select-side-admin"
      triggers="focus click touchstart"
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
      target="popover-select-side-admin-save"
      triggers="focus click touchstart"
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
      triggers="focus click touchstart"
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  GET_PRICE,
  SAVE_ITEM_TO_PROFILE,
  SAVE_TO_CART,
  SAVE_CHANGES,
  SAVE_ADD_PRODUCT,
  SAVE_UPDATE_CART_ITEM,
  SAVE_UPDATE_ORDER_ITEM
} from "../store/actions.type";

import { PRICE_SET_ITEM, PRICE_RESET } from "../store/mutations.type";

import { Sidebar, USER_ROLE } from "../consts";

import clearSvg from "../utils/clearSvg";

export default {
  data() {
    return {
      USER_ROLE,
      csrf: null,
      formProductData: null,
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
      "color",
      "maxPrintSize",
      "userRole",
      "items",
      "isValid",
      "editProduct",
      "features",
      "editProfileProduct",
      "editCartProduct",
      "editOrderProduct"
    ]),
    activeSidebar() {
      return this.$store.state.activeSidebar;
    }
  },
  methods: {
    ...mapActions([
      SAVE_ITEM_TO_PROFILE,
      SAVE_TO_CART,
      SAVE_CHANGES,
      SAVE_ADD_PRODUCT
    ]),
    saveChangesToCartItem() {
      let printSizes = [];
      let svg = [];
      let savedSize = this.sizesList.find(s => s.quantity);
      this.base.sides.forEach(side => {
        if (side.items && side.items.length) {
          if (this.base.printSizes && this.base.printSizes.length) {
            printSizes.push({
              sideId: side.id,
              print_size_id: side.printSize
                ? side.printSize.id
                : this.base.printSizes[0].id
            });
          }

          let svgItem = this.sidesElems.find(item => item.sideId == side.id);
          let isNeedPrintsizeMask = savedSize
            ? this.size.id == savedSize.id
              ? false
              : true
            : false;
          svgItem.svg = clearSvg(svgItem.svg, isNeedPrintsizeMask);

          // svgItem.svg
          //   .replace(/.([^<]*)mainblanks(.*?)<\/image>/, "")
          //   .replace(/<mask.*mask>/, "")
          //   .replace(/mask="url\(#mainMask\)"/g, "");
          svg.push(svgItem);
        }
      });

      if (!savedSize) {
        return;
      }
      let params = {
        color_id: this.color.id,
        size_id: savedSize.id, //this.size.id,
        count: savedSize.quantity,
        is_service: false,
        svg,
        printSizes,
        features: this.features
      };
      let id = this.editCartProduct;

      this.$store.dispatch(SAVE_UPDATE_CART_ITEM, { params, id });
    },
    onGetPriceClicked() {
      this.$store.commit(PRICE_RESET);
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
    onSaveToProfile(item) {
      let sides = this.sidesElems.slice();
      let id = this.editProfileProduct;
      sides.forEach(side => {
        side.svg = clearSvg(side.svg);

        // side.svg
        //   .replace(/<mask.*mask>/, "")
        //   .replace(/mask="url\(#mainMask\)"/g, "")
        //   .replace(/<image.*?<\/image>/, "");
        if (id) {
          side.isModify = true;
        }
      });
      const params = {
        mainblankid: item.mainblank_id,
        preview_side_id: item.id,
        colormainblank_id: this.color.id,
        features: this.features,
        sides
      };
      this.$refs.popover.$emit("close");

      this.$store.dispatch(SAVE_ITEM_TO_PROFILE, { params, id });
    },
    onUpdatePrint(item) {
      let sides = [];

      this.base.sides.forEach(side => {
        let svgSide = this.sidesElems.find(
          itemSide => itemSide.sideId == side.id
        );

        let svg = clearSvg(svgSide.svg);
        // svgSide.svg
        //   .replace(/<mask.*mask>/, "")
        //   .replace(/mask="url\(#mainMask\)"/g, "")
        //   //.replace(/\<image.*?<\/image>/, "");
        //   .replace(/.([^<]*)mainblanks(.*?)<\/image>/, "");
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
          } else {
            itemSide.print_size_id = "";
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
          size_id: this.size.id || null,
          sides: sides,
          //  sides: this.sidesElems,
          previewSideId: item.id,
          productid: this.editProduct || this.editOrderProduct,
          // sizePrint: this.printSize.id,
          // size: this.size.id,

          preview: "",
          second_preview: null
        }
        // selected_color: 85
      };
      if (this.editOrderProduct) {
        params.id = this.editOrderProduct;
        params.data.features = this.features;
        this.$store.dispatch(SAVE_UPDATE_ORDER_ITEM, params);
      } else {
        this.$store.dispatch(SAVE_CHANGES, params);
      }
    },
    onCreateproduct(item) {
      let sides = [];
      const tokenElement = document.querySelector('[name="csrf-token"]');
      this.csrf = tokenElement.getAttribute("content");
      this.base.sides.forEach(side => {
        let svgSide = this.sidesElems.find(
          itemSide => itemSide.sideId == side.id
        );

        let svg = clearSvg(svgSide.svg);

        // svgSide.svg
        //   .replace(/<mask.*mask>/, "")
        //   .replace(/mask="url\(#mainMask\)"/g, "")
        //   //.replace(/\<image.*?<\/image>/, "");
        //   .replace(/.([^<]*)mainblanks(.*?)<\/image>/, "");
        if (
          (side.items.length && side.printSize) ||
          (side.items.length &&
            this.base.printSizeMainblanks &&
            !this.base.printSizeMainblanks.length)
        ) {
          sides.push({
            svg: svg,
            print_size_id: side.printSize ? side.printSize.id : "",
            sideId: side.id,
            sizePrint: side.printSize ? side.printSize.id : "",
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
  z-index: 5;
  //margin-top: 50px;
  &__btns {
    margin: -5px;
    @media screen and (max-width: 440px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }
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