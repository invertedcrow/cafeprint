<template>
  <div class="d-flex h-100 w-100 position-relative">
    <spinner v-if="isDesignListLoading" />
    <perfect-scrollbar @ps-y-reach-end="onReachEnd('inside')" v-if="list.length">
      <div class="design d-flex flex-wrap">
        <div
          class="design__item d-flex flex-column align-items-center justify-content-between"
          v-for="item in list"
          :key="item.id"
        >
          <div
            class="design__item-img d-flex justify-content-center align-items-center"
            :ref="'el' + item.id"
          >
            <!-- @load="getAverageColor(item)" -->
            <img :src="imgUrl(item)" :ref="item.id" />
          </div>
          <div class="design__item-title" :title="item.name">{{item.name}}</div>
          <div class="design__item-hover">
            <button class="baseBtn w-100" @click="select(item)">Добавить</button>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
    <div
      v-if="!list.length && !isDesignListLoading"
      class="h-100 w-100 d-flex flex-column justify-content-center align-items-center"
    >Не найдено</div>
  </div>
</template>

<script>
import { MODALS, API_URL } from "../consts";
import { eventBus } from "../main";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { GET_DESIGN, GET_DESIGN_ITEM } from "../store/actions.type";
import ColorThief from "color-thief";

import Spinner from "./Spinner";
export default {
  components: {
    Spinner
  },
  props: ["list", "reach"],
  data() {
    return {
      windowWidth: window.innerWidth
    };
  },
  methods: {
    ...mapMutations(["addImg"]),
    ...mapActions([GET_DESIGN_ITEM]),
    select(img) {
      this.$store.dispatch(GET_DESIGN_ITEM, img);
      eventBus.$emit("hideModal", MODALS.DESIGNS);
    },
    imgUrl(item) {
      if (!item || !item.preview_print) {
        return "";
      }
      if (item && item.preview_print && item.preview_print.startsWith("http")) {
        return item.preview_print;
      }

      let link =
        API_URL +
        (item.preview_print[0] == "/" ? "" : "/") +
        item.preview_print;
      return link;
    },
    onReachEnd(param) {
      if (param == "inside" && this.windowWidth < 768) return;
      if (param == "outside" && this.windowWidth > 768) return;

      let filter = { ...this.designFilter };
      if (
        !this.isDesignListLoading &&
        this.designList.length &&
        !(this.designList.length % filter.limit) &&
        !this.isBlockLoadPrints
      ) {
        filter.page++;
        this.$store.dispatch(GET_DESIGN, filter);
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
    // getAverageColor(item) {
    //   item.substrate = false;

    //   let colorThief = new ColorThief();
    //   let color = colorThief.getColor(this.$refs[item.id][0]);
    //   let current = 0;
    //   if (color && color.length) {
    //     color.forEach(value => {
    //       current += value;
    //     });
    //     if (current > 763) {
    //       this.$refs["el" + item.id][0].style.background = "#e9e9e9";
    //     }
    //   } else {
    //     this.$refs["el" + item.id][0].style.background = "#e9e9e9";
    //   }
    // }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  computed: {
    ...mapGetters([
      "designFilter",
      "designList",
      "isDesignListLoading",
      "isBlockLoadPrints"
    ])
  },
  watch: {
    reach(val) {
      if (val) {
        this.onReachEnd("outside");
      }
    },
    isDesignListLoading(val) {
      if (!val) {
        this.$emit("onLoadList", true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.design {
  padding-right: 10px;
  @media screen and (max-width: 768px) {
    padding-right: 15px;
  }
  &__item {
    margin-right: 5px;
    width: calc(25% - 3px);
    background-color: #fff;
    padding: 10px;
    padding-top: 20px;
    margin-bottom: 3px;
    margin-right: 3px;
    position: relative;
    @media screen and (max-width: 992px) {
      width: calc(33% - 3px);
    }
    @media screen and (max-width: 768px) {
      width: calc(50% - 3px);
    }
    &-img {
      width: 100%;
      height: 100%;
      height: 125px;
      margin-bottom: 20px;
      background-color: whitesmoke;
      .substrate {
        background-color: whitesmoke;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    &-title {
      padding-left: 15px;
      height: 25px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #000000;
      font-family: Oswald;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
    }
    &-hover {
      display: none;
      padding: 20px;
      padding-top: 0;
      position: absolute;
      width: 100%;
      background-color: #fff;
      bottom: -53px;
      z-index: 2;
      box-shadow: 0 50px 51px rgba(0, 0, 0, 0.15);
      .baseBtn {
        font-family: "MuseoSansCyrl", sans-serif;
        font-weight: 500;
      }
    }
    &:hover {
      cursor: pointer;
      box-shadow: 0 20px 51px rgba(0, 0, 0, 0.15);
      .design__item-hover {
        display: block;
      }
    }
  }
}
</style>