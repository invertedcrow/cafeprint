<template>
  <div class="list d-flex flex-wrap justify-content-start">
    <div
      class="list__item d-flex flex-column justify-content-between"
      v-for="item in list"
      :key="item.id"
      @click="onChoose()"
    >
      <div class="list__item-img text-center bg-secondary">
        <img class="img-fluid" src="../assets/1.webp" alt />
      </div>
      <div class="list__item-info d-flex justify-content-between">
        <div class="list__item-title text-muted mr-2">Mens long Sleeve T-Short By Next level</div>
        <div class="list__item-price font-weight-bold">$23.99</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 }
      ]
    };
  },
  methods: {
    onChoose() {
      let filter = this.$store.state.productFilter;
      this.$store.commit("setPreviewColor", filter.color);
      this.$store.commit("setPreviewSize", filter.size);
      this.$store.commit("showFilterPreview", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &__item {
    height: 260px;
    width: 240px;
    margin: 3px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>