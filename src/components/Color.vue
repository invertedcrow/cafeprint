<template>
  <div class="color-list">
    <div
      class="color-list__item"
      v-for="color in colors"
      :key="color"
      @click="setActiveColor(color)"
      :style="{backgroundColor: color }"
      :class="{active: active === color}"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["colors", "active", "setActiveColor"]
};
</script>

<style lang="scss" scoped>
.color-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  &__item {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
    &.active {
      &:after {
        position: absolute;
        display: block;
        content: "";
        border: 2px solid blue;
        width: 36px;
        height: 36px;
        top: -3px;
        left: -3px;
        border-radius: 50%;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>