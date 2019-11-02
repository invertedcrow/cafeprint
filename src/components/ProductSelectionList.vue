<template>
  <div class="d-flex h-100">
    <perfect-scrollbar>
      <div class="list d-flex flex-wrap justify-content-start">
        <div
          class="list__item d-flex flex-column justify-content-between"
          v-for="item in bases"
          :key="item.id"
        >
          <div class="list__item-img">
            <img class="img-fluid" src="../assets/1.webp" alt />
          </div>
          <div class="list__item-info">
            <div class="list__item-title">Mens long Sleeve T-Short By Next level</div>
            <div class="list__item-price">500 uah</div>
          </div>
          <div class="list__item-hover">
            <button class="baseBtn w-100" @click="onChoose()">Выбрать</button>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { MODALS } from "../consts";
import { eventBus } from "../main";
import { mapGetters } from "vuex";

export default {
  methods: {
    onChoose() {
      // let filter = this.$store.state.filter;
      // this.$store.commit("setPreviewColor", filter.color);
      // this.$store.commit("setPreviewSize", filter.size);
      // this.$store.commit("showFilterPreview", true);
      // TODO: add product to constructor

      eventBus.$emit("hideModal", MODALS.PRODUCTS);
    }
  },
  computed: {
    ...mapGetters(["bases"])
  }
};
</script>

<style lang="scss" scoped>
.list {
  padding-right: 10px;
  width: 100%;
  height: 100%;
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
      width: calc(50% - 9px);
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