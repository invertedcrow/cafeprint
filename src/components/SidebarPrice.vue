<template>
  <div class="sidebar-price d-flex flex-column">
    <div class="sidebar-card-header">
      <div class="sidebar-card-header__с-icon">
        <svg
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 294.133 294.133"
          style="enable-background:new 0 0 294.133 294.133;"
          xml:space="preserve"
        >
          <path
            d="M283.224,10.909L178.977,0L0,178.977l115.156,115.156l178.977-178.977L283.224,10.909z M115.651,240.102l-61.62-61.62  l14.143-14.143l61.62,61.62L115.651,240.102z M232.661,96.827c-9.762,9.763-25.591,9.763-35.355,0  c-9.762-9.763-9.762-25.592,0-35.354c9.764-9.764,25.592-9.765,35.355,0C242.425,71.235,242.424,87.064,232.661,96.827z"
          />
        </svg>
      </div>
      <div class="sidebar-card-header__title">Стоимость изделия</div>
      <div @click="close" class="sidebar-card-header__close">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="17px"
          height="17px"
          viewBox="0 0 357 357"
        >
          <polygon
            points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"
          />
        </svg>
      </div>
    </div>
    <spinner v-if="isPriceLoading" />
    <perfect-scrollbar>
      <div class="sidebar-price__sizes">
        <div class="sidebar-price__sizes-label">Выберите размеры:</div>
        <ul class="sidebar-price__sizes-list">
          <li :key="index" v-for="(size, index) in sizesList">
            <span>{{size.name}}</span>
            <number-input :size="size" @input="changeQuantity" :value="size.quantity || 0" :min="0"></number-input>
          </li>
        </ul>
      </div>

      <div>
        <a @click="showSizesModal" style="cursor: pointer">
          <svg
            width="20"
            height="20"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.94267 6.42499C6.46496 6.42499 5.36545 7.03321 5.26882 7.90405C5.26435 7.94449 5.26205 7.98543 5.26205 8.02562C5.26205 8.90196 6.27428 9.55821 7.72377 9.62154C7.79707 9.62474 7.87073 9.62634 7.94267 9.62634C9.49593 9.62634 10.6233 8.95315 10.6233 8.02566C10.6233 7.09818 9.49593 6.42499 7.94267 6.42499ZM7.94267 8.3407C7.88927 8.3407 7.83447 8.33952 7.7798 8.3371C7.1532 8.3097 6.76511 8.13719 6.60753 8.02505C6.78755 7.89655 7.2525 7.71075 7.94267 7.71075C8.63403 7.71075 9.09948 7.89724 9.27884 8.02575C9.09948 8.15425 8.63403 8.3407 7.94267 8.3407Z"
              fill="#011129"
            />
            <path
              d="M15.8854 10.8141V8.02574C15.8854 6.84601 14.9949 5.77776 13.3779 5.01774C11.9154 4.33028 9.98509 3.95166 7.94268 3.95166C5.97159 3.95166 4.09102 4.30747 2.64739 4.95359C1.07289 5.6582 0.137689 6.65955 0.0141094 7.77317C0.00475781 7.85746 0 7.94244 0 8.0257V12.9743C0 14.088 0.804686 15.1141 2.26583 15.8635C3.57443 16.5347 5.33761 16.9499 7.2306 17.0327C7.46948 17.0431 7.70909 17.0484 7.94268 17.0484H21V10.8141H15.8854ZM1.29195 7.91496C1.43542 6.62186 4.14213 5.23738 7.94263 5.23738C11.8657 5.23738 14.5996 6.70689 14.5996 8.02574C14.5996 9.3446 11.8657 10.8141 7.94263 10.8141C7.72751 10.8141 7.5068 10.8092 7.28667 10.7995C7.19303 10.7955 7.09968 10.7904 7.00674 10.7845C7.00186 10.7842 6.99694 10.7839 6.99202 10.7836C5.54855 10.6909 4.19397 10.3853 3.15049 9.91406C3.11428 9.8977 3.07855 9.88121 3.04324 9.86451C3.03967 9.86279 3.03614 9.86107 3.03257 9.85943C3.00243 9.84515 2.97269 9.83076 2.94324 9.81632C2.92622 9.80791 2.90944 9.79942 2.89259 9.79093C2.87643 9.78277 2.86018 9.77469 2.84423 9.76649C2.82032 9.75418 2.79665 9.74175 2.77327 9.72933C2.76794 9.7265 2.76265 9.72371 2.75736 9.72092C1.88204 9.25195 1.35774 8.68486 1.29265 8.14014C1.29199 8.1346 1.29162 8.12906 1.29105 8.12356C1.2897 8.11036 1.28834 8.09715 1.28752 8.08403C1.28637 8.06458 1.28568 8.04514 1.28568 8.02574C1.28572 7.98961 1.28781 7.95232 1.29195 7.91496ZM14.5996 10.2973V10.8141H13.8096C14.1025 10.6527 14.366 10.4798 14.5996 10.2973ZM19.7143 15.7626H18.3653V14.0679H17.0796V15.7626H15.4857V13.025H14.2V15.7626H12.6368V14.0679H11.3511V15.7626H9.75713V13.025H8.47141V15.7626H7.94268C7.72771 15.7626 7.50705 15.7578 7.28671 15.7482C7.15973 15.7426 7.03356 15.7352 6.90818 15.7266V14.0678H5.62246V15.5773C5.05706 15.484 4.52132 15.3568 4.02855 15.1985V12.475H2.74284V14.6616C1.81511 14.1611 1.28568 13.5502 1.28568 12.9742V10.2983C1.46188 10.4357 1.65588 10.5674 1.86605 10.6931C1.86838 10.6945 1.87068 10.696 1.87302 10.6974C1.89952 10.7132 1.92659 10.7288 1.95357 10.7443C1.98003 10.7596 2.00669 10.7749 2.0336 10.79C2.0548 10.8019 2.07605 10.8137 2.09754 10.8254C2.13835 10.8477 2.17973 10.8698 2.22161 10.8916C2.23203 10.897 2.2422 10.9025 2.2527 10.908C2.25713 10.9102 2.26131 10.9125 2.26574 10.9148C2.31689 10.941 2.36898 10.9667 2.42148 10.9922C2.42915 10.9959 2.43694 10.9996 2.44465 11.0033C2.49994 11.0299 2.55593 11.0561 2.61265 11.0818C2.61557 11.0831 2.61831 11.0845 2.62127 11.0858C2.62233 11.0862 2.62344 11.0867 2.62455 11.0872C2.69391 11.1185 2.76449 11.149 2.8359 11.1789C2.84977 11.1847 2.86355 11.1905 2.87745 11.1963C2.93988 11.2221 3.00304 11.2475 3.06698 11.2723C3.09619 11.2836 3.12564 11.2947 3.15513 11.3058C3.18765 11.3181 3.22046 11.3301 3.2534 11.3421C4.16514 11.6756 5.20361 11.9043 6.31915 12.0174C6.33597 12.0191 6.35271 12.0209 6.36952 12.0226C6.41792 12.0273 6.46632 12.032 6.515 12.0363C6.58588 12.0426 6.65704 12.0485 6.72841 12.0538C6.75622 12.0559 6.78411 12.0579 6.81204 12.0598C6.89768 12.0658 6.98357 12.0713 7.06982 12.076C7.07335 12.0761 7.07679 12.0764 7.08032 12.0766L7.12249 12.0996H19.7142V15.7626H19.7143Z"
              fill="#011129"
            />
          </svg>
          <span>Размеры основы</span>
        </a>
        <hr />
      </div>

      <div class="sidebar-price__info">
        <div
          v-if="productMinPrice"
          class="sidebar-price__info-item"
        >Минимальная стоимость изделия: {{productMinPrice.item_total}} UAH</div>
        <!-- <div class="sidebar-price__info-discount">скидка от 10 единиц -10%</div> -->
        <button @click="onDetailsClicked" class="sidebar-price__info-details">Подробнее</button>
      </div>
    </perfect-scrollbar>
    <hr />
    <div class="sidebar-price__summary d-flex justify-content-between" v-if="!isPriceLoading">
      <div>
        <div class="sidebar-price__summary-count">выбрано {{quantity}} позиций</div>
        <div class="sidebar-price__summary-sum">Итого: {{totalPrice}} UAH</div>
      </div>

      <div class="d-flex align-items-end">
        <button @click="onAddToCart" class="get-price">Добавить в корзину</button>
      </div>
    </div>
  </div>
</template>

<script>
import NumberInput from "./NumberInput";
import { Sidebar, MODALS } from "../consts";
import { mapGetters } from "vuex";
import { eventBus } from "../main";
import { PRICE_SET_ITEM } from "../store/mutations.type";
import { SAVE_TO_CART } from "../store/actions.type";
import Spinner from "./Spinner";

export default {
  name: "SidebarPrice",
  filters: {
    groupSumNumber: function(value) {
      if (!value) {
        return "";
      }
      value = value.toString();
      for (let i = value.length; i >= 0; i -= 3) {
        value = value.slice(0, i) + " " + value.slice(i);
      }
      return value;
    }
  },
  methods: {
    showSizesModal() {
      eventBus.$emit("showModal", MODALS.SIZES_READONLY);
    },
    onDetailsClicked() {
      this.$store.commit("setActiveSidebar", Sidebar.ARTICLE);
    },
    close() {
      this.$store.commit("setActiveSidebar", Sidebar.PRODUCT);
    },
    changeQuantity(size) {
      this.$store.commit(PRICE_SET_ITEM, size);
    },
    onAddToCart() {
      const items = [];
      this.sizesList.forEach((size, i) => {
        let item = {};
        let print_sizes = [];
        let svg = [];
        this.base.sides.forEach(side => {
          if (side.items && side.items.length) {
            if (this.base.printSizes && this.base.printSizes.length) {
              print_sizes.push({
                sideId: side.id,
                print_size_id: side.printSize
                  ? side.printSize.id
                  : this.base.printSizes[0].id
              });
            }

            let svgItem = this.sidesElems.find(item => item.sideId == side.id);
            svgItem.svg = svgItem.svg
              .replace(/.([^<]*)mainblanks(.*?)<\/image>/, "")
              .replace(/<mask.*mask>/, "")
              .replace(/mask="url\(\#mainMask\)"/g, "");
            svg.push(svgItem);
          }
        });

        // if(!svg.length) {
        //   svg.push(this.sidesElems[0]);
        // }
        if (size.quantity) {
          item = {
            color_id: this.color.id,
            size_id: size.id,
            count: size.quantity,
            is_service: 0,
            svg,
            print_sizes,
            features: this.features
          };
          items.push(item);
        }
      });
      this.$store.dispatch(SAVE_TO_CART, { items });
    }
  },
  computed: {
    ...mapGetters([
      "sizesList",
      "quantity",
      "totalPrice",
      "productMinPrice",
      "isPriceLoading",
      "base",
      "sidesElems",
      "color"
    ])
  },
  components: {
    NumberInput,
    Spinner
  }
};
</script>

<style lang="scss" scoped>
.sidebar-price {
  font-size: 14px;
  height: 500px;
  position: relative;
  a {
    font-size: 16px;
    text-decoration: none;
    color: inherit;
    span {
      text-decoration: underline;
    }
    svg {
      margin-right: 13px;
    }
    &:hover {
      svg path {
        fill: #72b425;
      }
      color: #72b425;
    }
  }

  &__sizes {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-right: 15px;
    &-label {
      margin-bottom: 15px;
    }

    &-list {
      border-top: 1px solid #e3e3e3;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        padding: 8px 0;
        border-bottom: 1px solid #e3e3e3;
        text-transform: uppercase;
      }
    }
  }

  &__info {
    padding-right: 15px;
    &-item {
      font-size: 16px;
      font-weight: 600;
    }
    &-discount {
      margin-top: 5px;
      font-size: 12px;
      font-weight: 600;
      color: #eb4626;
    }
    &-details {
      margin-top: 15px;
      width: 100%;
      padding: 8px 30px;
      border-radius: 30px;
      color: #939aa6;
      background-color: transparent;
      border: 1px solid #e1e1e1;
      &:focus,
      &:active {
        outline: none;
      }
    }
  }

  &__summary {
    &-count {
      font-size: 12px;
      margin-bottom: 5px;
    }
    &-sum {
      font-size: 18px;
      font-weight: 600;
    }
  }
  button.get-price {
    width: 200px;
    padding: 8px;
    border-radius: 30px;
    background-color: #72b425;
    color: #fff;
    border: 0;
    height: 40px;
    &:focus,
    &:active {
      outline: none;
    }
  }
}
</style>