<template>
  <div class="product d-flex flex-column">
    <div class="modal-title">Категории товаров</div>

    <div class="modal-head">
      <div class="modal-head__close" @click="onHide()">
        <svg
          data-v-0cb6d606
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="17px"
          height="17px"
          viewBox="0 0 357 357"
        >
          <polygon
            data-v-0cb6d606
            points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"
          />
        </svg>
      </div>
    </div>
    <perfect-scrollbar @ps-y-reach-end="onReachEnd" ref="basesScrollRef">
      <div class="product-selection">
        <div class="product-selection__filter-pane d-flex flex-column">
          <product-filter />
        </div>
        <div class="product-selection__center-block d-flex" ref="basesListRef">
          <product-selection-list :reach="reachEnd" @onLoadList="reachEnd = false" />
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import ProductFilter from "./ProductFilter";
import ProductSelectionList from "./ProductSelectionList";
import { MODALS } from "../consts";
import { eventBus } from "../main";
import { mapGetters } from "vuex";

export default {
  components: {
    ProductFilter,
    ProductSelectionList
  },
  data() {
    return {
      hideScroll: window.innerWidth > 768 ? true : false,
      reachEnd: false
    };
  },
  computed: {
    ...mapGetters(["bases", "filterParams"]),
    getActiveCategory() {
      return this.$store.state.filter.category;
    }
  },
  methods: {
    onHide() {
      eventBus.$emit("hideModal", MODALS.PRODUCTS);
    },
    onReachEnd() {
      if (this.reachEnd) return;

      this.reachEnd = true;
    },
    scrollToList() {
      let scrollTop = this.$refs.basesListRef.offsetTop;
      this.$refs.basesScrollRef.$el.scrollTop = scrollTop;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.hideScroll = window.innerWidth > 768 ? true : false;
      });
    });
  },
  watch: {
    bases: function(val) {
      if (
        this.filterParams &&
        this.filterParams.category_ids &&
        window.innerWidth < 768
      ) {
        this.$nextTick(() => {
          this.scrollToList();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-head {
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    margin-bottom: 0;
  }
  &__close {
    right: 17px;
    top: 18px;
  }
}

.product-selection {
  display: flex;
  justify-content: space-between;
  height: 750px;
  max-height: 90vh;
  &__filter-pane {
    width: 190px;
    flex-shrink: 0;
  }
  &__center-block {
    padding-top: 5px;
    position: relative;
    width: 100%;
  }
  @media screen and (max-width: 992px) {
    max-height: calc(100vh - 150px);
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 750px;
    max-height: calc(100vh - 200px);
    &__filter-pane {
      width: 100%;
    }
  }
}
.modal-title {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
}
</style>