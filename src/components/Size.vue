<template>
  <div class="sizes d-flex flex-wrap">
    <div
      class="sizes__item ml-2"
      v-for="size in sizes"
      :key="size"
      :class="{active: active === size}"
      @click="setActiveSize(size)"
    >{{size}}</div>
  </div>
</template>

<script>
export default {
  props: ["sizes", "active", "setActiveSize"]
};
</script>

<style lang="scss" scoped>
.sizes {
  .sizes__item {
    color: #000;
    border: 1px solid #000;
    padding: 5px 10px;
    margin-bottom: 15px;
    &:hover {
      cursor: pointer;
    }
    &.active {
      color: blue;
      border-color: blue;
    }
  }
}
</style>