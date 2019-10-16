<template>
  <div class="preview d-flex flex-column">
    <div class="preview__img d-flex flex-column align-items-center">
      <img src="../assets/2.webp" alt />
    </div>
    <div class="preview__info d-flex flex-column">
      <div class="preview__id mb-3">45643564356</div>
      <div class="d-flex justify-content-between mb-3">
        <div class="preview__title mr-2">Mens long Sleeve T-Short By</div>
        <div class="preview__price">$23.99</div>
      </div>
      <b-button squared variant="info" @click="onSelect()">Select</b-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onSelect() {
      this.$store.commit("showDesignModal", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.preview {
  &__info {
    padding: 10px;
  }
  &__img {
    background-color: whitesmoke;
    padding: 20px 0;
  }
  &__id {
    font-size: 12px;
  }
}
</style>