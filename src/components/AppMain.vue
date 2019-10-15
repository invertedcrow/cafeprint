<template>
  <div class="main">
    <div class="constructor" :style="{backgroundColor: getColor}">test</div>
  </div>
</template>

<script>
export default {
  computed: {
    getColor() {
      return this.$store.state.activeColor;
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