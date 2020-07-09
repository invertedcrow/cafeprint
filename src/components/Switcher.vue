<template>
  <div class="switcher" :class="{active: active}">
    <div class="switcher__icon"></div>
  </div>
</template>

<script>
export default {
  props: ["active"]
};
</script>

<style lang="scss" scoped>
.switcher {
  width: 40px;
  height: 20px;
  background-color: #ebebeb;
  padding: 1px;
  border-radius: 10px;
  transition: all 0.4s;
  &__icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.4s;
  }
  &.active {
    background-color: #72b425;
    .switcher__icon {
      transform: translateX(20px);
    }
  }
}
</style>