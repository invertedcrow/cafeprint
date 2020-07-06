<template>
  <div class="d-flex h-100 position-relative w-100">
    <spinner v-if="isProductsListLoading" />
    <perfect-scrollbar
      @ps-y-reach-end="onReachEnd('inside')"
      :options="{suppressScrollY: windowWidth < 768}"
    >
      <div class="list d-flex flex-wrap justify-content-start">
        <div
          class="list__item d-flex flex-column justify-content-between"
          v-for="item in bases"
          :key="item.id"
        >
          <div class="list__item-img">
            <img class="img-fluid" :src="getUrl(item.preview_image)" alt />
          </div>
          <div class="list__item-info">
            <div class="list__item-title" :title="item.name">{{item.name}}</div>
            <div class="list__item-price">{{item.manufacture_price}} uah</div>
          </div>
          <div class="list__item-hover">
            <button class="baseBtn w-100" @click="onChoose(item.id)">Выбрать</button>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { MODALS, API_URL } from "../consts";
import { eventBus } from "../main";
import { mapGetters, mapActions } from "vuex";
import { GET_BASE, GET_BASES_LIST } from "../store/actions.type";
import Spinner from "./Spinner";
export default {
  components: {
    Spinner
  },
  props: ["reach"],
  data() {
    return {
      windowWidth: window.innerWidth
    };
  },
  methods: {
    ...mapActions([GET_BASE, GET_BASES_LIST]),
    onReachEnd(param) {
      if (param == "inside" && this.windowWidth < 768) return;
      if (param == "outside" && this.windowWidth > 768) return;

      const params = this.filterParams;

      if (
        !this.isProductsListLoading &&
        this.bases.length &&
        !(this.bases.length % params.limit)
      ) {
        params.page++;

        this.$store.dispatch(GET_BASES_LIST, params);
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    onChoose(id) {
      // let filter = this.$store.state.filter;
      // this.$store.commit("setPreviewColor", filter.color);
      // this.$store.commit("setPreviewSize", filter.size);
      // this.$store.commit("showFilterPreview", true);
      // TODO: add product to constructor
      this.$store.dispatch(GET_BASE, { id });
      eventBus.$emit("hideModal", MODALS.PRODUCTS);
    },
    getUrl(imgURL) {
      return API_URL + imgURL;
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  computed: {
    ...mapGetters(["bases", "filterParams", "isProductsListLoading"])
  },
  watch: {
    reach(val) {
      if (val) {
        this.onReachEnd("outside");
      }
    },
    isProductsListLoading(val) {
      if (!val) {
        this.$emit("onLoadList", true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  padding-right: 10px;
  width: 100%;
  //height: 100%;
  //overflow-y: scroll;
  &__item {
    padding: 15px 0;
    background-color: #fff;
    height: 335px;
    width: calc(25% - 6px);
    margin-right: 6px;
    margin-bottom: 6px;
    font-family: Oswald;
    position: relative;
    @media screen and (max-width: 992px) {
      width: calc(33% - 6px);
    }
    @media screen and (max-width: 768px) {
      width: calc(50% - 6px);
      height: 300px;
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
    }
    &:hover {
      cursor: pointer;
      box-shadow: 0 20px 51px rgba(0, 0, 0, 0.15);
      .list__item-hover {
        display: block;
      }
    }
    &-info {
      padding: 0 15px;
      margin-top: 20px;
    }
    &-title {
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      height: 42px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    &-price {
      color: #81b241;
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
}
</style>