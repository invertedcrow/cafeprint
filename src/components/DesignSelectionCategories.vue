<template>
  <div class="categories d-flex flex-column">
    <b>Categories</b>
    <div class="categories__wrapper">
      <div
        class="categories__item d-flex flex-column align-items-center justify-content-center"
        v-for="item in items"
        :key="item"
        @click="onSelect()"
      >
        <div class="categories__item-title">title here</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  methods: {
    ...mapActions(["searchDesign"]),
    onSelect() {
      this.searchDesign("z");
    }
  }
};
</script>

<style lang="scss" scoped>
.categories {
  padding-top: 30px;
  height: 100%;
  overflow: hidden;
  &__wrapper {
    height: 100%;
    overflow-y: scroll;
    margin-top: 10px;
  }
  &__item {
    height: 70px;
    background-color: forestgreen;
    margin-bottom: 5px;
    &:hover {
      cursor: pointer;
    }
    &-title {
      padding: 0 15px;
      background-color: #fff;
    }
  }
}
</style>