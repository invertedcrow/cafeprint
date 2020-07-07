<template>
  <div class="d-flex flex-column">
    <div class="modal-title xsvisible">Категории товаров</div>
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
    <perfect-scrollbar @ps-y-reach-end="onReachEnd" ref="printsScrollRef">
      <div class="design d-flex justify-content-between">
        <div class="design__search-pane d-flex flex-column">
          <div class="modal-title">Категории товаров</div>
          <design-selection-search />
          <design-selection-categories />
        </div>
        <div class="design__list d-flex" ref="printsListRef">
          <design-selection-list
            :list="designList"
            :reach="reachEnd"
            @onLoadList="reachEnd = false"
          />
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DesignSelectionSearch from "./DesignSelectionSearch";
import DesignSelectionCategories from "./DesignSelectionCategories";
import DesignSelectionList from "./DesignSelectionList";
import { MODALS } from "../consts";
import { eventBus } from "../main";
export default {
  components: {
    DesignSelectionSearch,
    DesignSelectionCategories,
    DesignSelectionList
  },
  data() {
    return {
      reachEnd: false
    };
  },
  computed: {
    ...mapGetters(["designList", "designFilter"])
  },
  methods: {
    onHide() {
      eventBus.$emit("hideModal", MODALS.DESIGNS);
    },
    onReachEnd() {
      if (this.reachEnd) return;

      this.reachEnd = true;
    },
    scrollToList() {
      let scrollTop = this.$refs.printsListRef.offsetTop;
      this.$refs.printsScrollRef.$el.scrollTop = scrollTop;
    }
  },
  watch: {
    designList: function(val) {
      if (
        this.designFilter &&
        this.designFilter.category_ids &&
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
.modal-head__close {
  right: 15px;
  top: 15px;
}
.modal-title {
  &.xsvisible {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
    }
  }
}
.design {
  height: 750px;
  // overflow: hidden;
  max-height: 90vh;
  .modal-title {
    margin-bottom: 20px;
    &.xsvisible {
      display: none;
    }
  }
  &__search-pane {
    width: 200px;
    flex-shrink: 0;
    padding-right: 15px;
  }
  &__list {
    width: 100%;
  }
  &__back-btn {
    position: absolute;
    left: 0;
    top: 45%;
    height: 100px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 750px;
    max-height: calc(100vh - 200px);
    &__search-pane {
      width: 100%;
      padding-right: 18px;
      .modal-title {
        display: none;
      }
    }
    .xsvisible {
      display: block;
    }
  }
}
</style>