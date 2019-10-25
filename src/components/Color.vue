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
  padding: 0 4px;
  display: flex;
  flex-wrap: wrap;
  &__item {
    width: 23px;
    height: 23px;
    border-radius: 50%;
    margin-right: 12px;
    margin-bottom: 15px;
    position: relative;
    &.active {
      &:after {
        position: absolute;
        display: block;
        content: "";
        border: 1px solid #a5cd75;
        width: 31px;
        height: 31px;
        top: -4px;
        left: -4px;
        border-radius: 50%;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>