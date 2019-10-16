<template>
  <div class="d-flex flex-wrap">
    <div
      class="design__item d-flex flex-column align-items-center"
      v-for="item in list"
      :key="item"
      @click="onSelect(item)"
    >
      <div class="design__item-img d-flex flex-column align-items-center">
        <img src="../assets/2.webp" alt />
      </div>
      <div class="design__item-info d-flex justify-content-between">
        <div class="design__item-title text-muted mr-2">Mens long Sleeve T-Short By</div>
        <div class="design__item-price">$23.99</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
  methods: {
    onSelect(item) {
      this.$store.commit("setDesignPreview", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.design {
  &__item {
    margin-right: 5px;
    width: calc(20% - 5px);
    &:hover {
      cursor: pointer;
    }
    &-img {
      width: 100%;
      padding: 0 15px;
      background-color: whitesmoke;
      img {
        width: 150px;
        height: 150px;
      }
    }
    &-info {
      width: 100%;
      font-size: 12px;
      line-height: 25px;
    }
    &-title {
      flex: 1;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>