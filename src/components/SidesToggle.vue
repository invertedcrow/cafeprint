<template>
  <div class="sides-toggle justify-content-between">
    <div class="sides-toggle__item prev" @click="prevSide">
      <img src="../assets/icons/arrow_normal.png" alt />
    </div>
    <div class="sides-toggle__item next" @click="nextSide">
      <img src="../assets/icons/arrow_normal.png" alt />
    </div>
  </div>
</template>

<script>
import { CONSTRUCTOR_SET_SELECTED_SIDE } from "../store/mutations.type";
import { mapMutations, mapGetters } from "vuex";
export default {
  methods: {
    ...mapMutations([CONSTRUCTOR_SET_SELECTED_SIDE]),
    prevSide() {
      let side = null;
      let index = this.sidesList.findIndex(item => item.id == this.side.id);
      if (index) {
        side = this.sidesList[index - 1];
      } else {
        side = this.sidesList[this.sidesList.length - 1];
      }
      this.$store.commit(CONSTRUCTOR_SET_SELECTED_SIDE, side);
    },
    nextSide() {
      let side = null;
      let index = this.sidesList.findIndex(item => item.id == this.side.id);
      if (index == this.sidesList.length - 1) {
        side = this.sidesList[0];
      } else {
        side = this.sidesList[index + 1];
      }
      this.$store.commit(CONSTRUCTOR_SET_SELECTED_SIDE, side);
    }
  },
  computed: {
    ...mapGetters(["sidesList", "side"])
  }
};
</script>

<style lang="scss" scoped>
.sides-toggle {
  width: calc(100% - 30px);
  display: none;
  z-index: 1px;
  @media screen and (max-width: 1200px) {
    display: flex;
  }
  @media screen and (max-width: 768px) {
    position: absolute;
    top: 50%;
  }
  &__item {
    cursor: pointer;
    &.next {
      transform: rotate(180deg);
    }
  }
}
</style>