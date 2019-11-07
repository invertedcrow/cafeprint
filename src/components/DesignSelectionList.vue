<template>
  <div class="d-flex h-100 w-100">
    <perfect-scrollbar @ps-y-reach-end="onReachEnd">
      <div class="design d-flex flex-wrap">
        <div
          class="design__item d-flex flex-column align-items-center justify-content-between"
          v-for="item in list"
          :key="item.id"
        >
          <div class="design__item-img d-flex justify-content-center align-items-center">
            <img :src="imgUrl(item)" />
          </div>
          <div class="design__item-title" :title="'long long long very lon name'">{{item.name}}</div>
          <div class="design__item-hover">
            <button class="baseBtn w-100" @click="select(item)">Добавить</button>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { MODALS, API_URL } from "../consts";
import { eventBus } from "../main";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { GET_DESIGN } from "../store/actions.type";
import { GET_DESIGN_ITEM } from "../store/actions.type";

export default {
  props: ["list"],
  methods: {
    ...mapMutations(["addImg"]),
    ...mapActions([GET_DESIGN_ITEM]),
    select(img) {
      this.$store.dispatch(GET_DESIGN_ITEM, img.id);
      eventBus.$emit("hideModal", MODALS.DESIGNS);
    },
    imgUrl(item) {
      return API_URL + "/" + item.preview_print;
    },
    onReachEnd() {
      let filter = { ...this.designFilter };
      if (filter.limit == this.designList.length) {
        filter.limit = +filter.limit + 10;
        this.$store.dispatch(GET_DESIGN, filter);
      }
    }
  },
  computed: {
    ...mapGetters(["designFilter", "designList"])
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