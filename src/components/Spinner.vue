<template>
  <div class="constructor-loading">
    <div class="img-preloader is-active"></div>
    <div class="constructor-loading__layer"></div>
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
  &__layer {
    background-color: #fff;
    opacity: 0.8;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 99;
  }
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

.img-preloader {
  z-index: 100;
  display: none;
  width: 50px;
  height: 50px;
  border: 3px solid rgba($color: #72b425, $alpha: 0.3);
  border-radius: 50%;
  border-top-color: #72b425;
  animation: spin 1s ease-in-out infinite;
  // position: absolute;

  &.is-active {
    display: block;
  }
}
</style>