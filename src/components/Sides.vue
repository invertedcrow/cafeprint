<template>
  <div class="sides d-flex justify-content-center">
    <div
      class="sides__item d-flex flex-column"
      v-for="side in sides"
      :key="side"
      @click="setActiveSide(side)"
    >
      <img src="../assets/1.webp" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: ["sides", "setActiveSide"]
};
</script>

<style lang="scss" scoped>
.sides {
  padding-left: 10px;
  padding-right: 10px;
  &__item {
    width: 100%;
    height: 100%;
    max-width: 65px;
    max-height: 65px;
    border: 1px solid grey;
    margin: 2px;
    background-color: #fff;
    img {
      width: 100%;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>