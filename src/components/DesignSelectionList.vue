<template>
  <div class="d-flex flex-column h-100">
    <perfect-scrollbar>
      <div class="design d-flex flex-wrap">
        <div
          class="design__item d-flex flex-column align-items-center justify-content-between"
          v-for="item in list"
          :key="item"
        >
          <div class="design__item-img d-flex justify-content-center align-items-center">
            <img src="../assets/3.png" alt />
          </div>
          <div class="design__item-title" :title="'long long long very lon name'">Rick and morty art</div>
          <div class="design__item-hover">
            <button class="baseBtn w-100" @click="select()">Добавить</button>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { MODALS } from "../consts";
import { eventBus } from "../main";

export default {
  props: ["list"],
  methods: {
    select() {
      // TODO: add design to state

      eventBus.$emit("hideModal", MODALS.DESIGNS);
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
      max-height: 125px;
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