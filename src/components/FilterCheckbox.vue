<template>
  <div class="custom-checkbox" :class="{checked: checked}">
    <img src="../assets/icons/checkbox.png" alt />
  </div>
</template>

<script>
export default {
  props: ["checked"]
};
</script>

<style lang="scss" scoped>
</style>
