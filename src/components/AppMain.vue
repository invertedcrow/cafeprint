<template>
  <div class="main">
    <div class="constructor" :style="{backgroundColor: activeProduct.color}">test</div>
  </div>
</template>

<script>
export default {
  computed: {
    activeProduct() {
      return this.$store.state.activeProduct;
    }
  }
};
</script>

<style lang="scss" scoped>
.constructor {
  width: 200px;
  height: 400px;
  border: dashed 1px gray;
}
</style>