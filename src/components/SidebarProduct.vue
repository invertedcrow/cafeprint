<template>
  <div class="sidebar-product">
    <div class="sidebar-product__sizes">
      <span
        class="sidebar-product__sizes-item"
        @click="showSizesModal()"
        v-if="size"
      >размер {{size.name}}</span>
      <span
        class="sidebar-product__sizes-current"
      >Текущий размер принта {{side.printSize ? '- ' + side.printSize.name : '' }}</span>
    </div>
    <hr />

    <div>
      <a @click="showInfoModal()">
        <svg
          xmlns:xlink="http://www.w3.org/1999/xlink"
          height="20"
          width="20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 330 330"
          style="enable-background:new 0 0 330 330;"
          xml:space="preserve"
        >
          <path
            d="M165,0C74.019,0,0,74.02,0,165.001C0,255.982,74.019,330,165,330s165-74.018,165-164.999C330,74.02,255.981,0,165,0z M165,300c-74.44,0-135-60.56-135-134.999C30,90.562,90.56,30,165,30s135,60.562,135,135.001C300,239.44,239.439,300,165,300z"
          />
          <path
            d="M164.998,70c-11.026,0-19.996,8.976-19.996,20.009c0,11.023,8.97,19.991,19.996,19.991
            c11.026,0,19.996-8.968,19.996-19.991C184.994,78.976,176.024,70,164.998,70z"
          />
          <path
            d="M165,140c-8.284,0-15,6.716-15,15v90c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15v-90C180,146.716,173.284,140,165,140z
            "
          />
        </svg>
        <span>Информация о товаре</span>
      </a>
    </div>
    <hr />

    <div class="sidebar-product__colors">
      <div class="sidebar-product__colors-title">Цвет:</div>
      <color :colors="base.colors" :active="color" :setActiveColor="setActiveColor" />
    </div>
    <hr class="sidebar-product__line-colors-bottom" />

    <div>
      <features v-if="base.features && base.features.length" />
    </div>
    <div class="sidebar-product__modal-controls">
      <div v-if="base.sizes && base.sizes.length">
        <a @click="showSizesModal()">
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
      </div>
      <hr />

      <div class="sidebar-product__layers">
        <a href="#" @click.prevent="selectSidebarLayers">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M16.04 0H7.63755C6.41703 0 5.42401 0.993018 5.42401 2.21354V2.48521H3.96C2.73948 2.48521 1.74646 3.47823 1.74646 4.69875V17.7866C1.74646 19.0071 2.73948 20.0001 3.96 20.0001H12.3625C13.583 20.0001 14.5759 19.0071 14.5759 17.7866V17.5149H16.0399C17.2605 17.5149 18.2535 16.5219 18.2535 15.3013V2.21354C18.2536 0.993018 17.2606 0 16.04 0ZM13.1482 17.7866C13.1482 18.2198 12.7957 18.5723 12.3626 18.5723H3.96C3.52679 18.5723 3.1743 18.2198 3.1743 17.7866V4.69865C3.1743 4.26545 3.52679 3.91296 3.96 3.91296H12.3625C12.7957 3.91296 13.1481 4.26545 13.1481 4.69865V17.7866H13.1482ZM16.8257 15.3013C16.8257 15.7346 16.4732 16.087 16.04 16.087H14.576V4.69865C14.576 3.47813 13.583 2.48511 12.3626 2.48511H6.85186V2.21344C6.85186 1.78024 7.20435 1.42775 7.63755 1.42775H16.04C16.4732 1.42775 16.8257 1.78024 16.8257 2.21344V15.3013Z"
                fill="#011129"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span>Управление слоями</span>
        </a>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import Color from "./Color";
import Features from "./Features";
import { Sidebar, MODALS } from "../consts";
import { eventBus } from "../main";
import { mapGetters, mapMutations } from "vuex";
import {
  CONSTRUCTOR_SET_COLOR,
  SIDEBAR_SET_ACTIVE,
  CONSTRUCTOR_SET_SELECTED_ITEM
} from "../store/mutations.type";
export default {
  components: {
    Color,
    Features
  },
  computed: {
    ...mapGetters(["base", "color", "size", "printSize", "side"])
  },
  methods: {
    ...mapMutations([
      CONSTRUCTOR_SET_COLOR,
      SIDEBAR_SET_ACTIVE,
      CONSTRUCTOR_SET_SELECTED_ITEM
    ]),
    setActiveColor(color) {
      this.$store.commit(CONSTRUCTOR_SET_COLOR, color);
    },
    selectSidebarLayers() {
      this.$store.commit(CONSTRUCTOR_SET_SELECTED_ITEM, null);
      this.$store.commit(SIDEBAR_SET_ACTIVE, Sidebar.LAYERS);
    },
    showInfoModal() {
      eventBus.$emit("showModal", MODALS.INFO);
    },
    showSizesModal() {
      eventBus.$emit("showModal", MODALS.SIZES);
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-product {
  color: #0f1f35;
  font-size: 16px;
  hr {
    border-color: #ebebeb;
  }

  &__line-colors-bottom {
    margin-top: 5px;
  }

  a {
    text-decoration: none;
    color: inherit;
    span {
      text-decoration: underline;
    }
    svg {
      margin-right: 13px;
      @media screen and (max-width: 380px) {
        margin-right: 8px;
      }
    }
    &:hover {
      cursor: pointer;
      svg path {
        fill: #72b425;
      }
      color: #72b425;
    }
  }

  &__sizes {
    font-size: 14px;
    margin-bottom: 17px;
    display: flex;
    align-items: center;
    &-item {
      display: inline-block;
      padding: 5px 14px;
      border: 1px solid #72b425;
      border-radius: 18px;
      font-weight: bold;
      cursor: pointer;
      flex-shrink: 0;
      &:not(:last-child) {
        margin-right: 23px;
      }
    }
    &-current {
      color: #9aa2af;
    }
    @media screen and (max-width: 992px) {
      flex-direction: column;
      align-items: start;
      &-item {
        margin-bottom: 15px;
      }
    }
    @media screen and (max-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      &-item {
        margin-bottom: 0;
      }
    }
  }

  &__colors {
    &-title {
      font-size: 14px;
      margin-bottom: 15px;
    }
  }
  &__modal-controls {
    @media screen and (max-width: 768px) {
      display: flex;
      justify-content: space-between;
      hr {
        display: none;
      }
    }
    @media screen and (max-width: 380px) {
      font-size: 15px;
    }
  }
}
</style>