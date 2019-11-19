<template>
  <div class="constructor-loading">
    <b-spinner label="Loading..."></b-spinner>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.constructor-loading {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  background-color: #fff;
  opacity: 0.8;
}
</style>