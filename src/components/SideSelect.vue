<template>
  <div class="sides d-flex flex-wrap">
    <div v-for="(side) in renderSides" :key="side.id" @click="selectSide(side)">
      <div class="sides__item d-flex">
        <img :src="side.image" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["renderSides"])
  },
  methods: {
    selectSide(side) {
      this.$emit("selectSide", side);
    }
  }
};
</script>

<style lang="scss" scoped>
.sides {
  &__item {
    cursor: pointer;
    width: 125px;
    height: 125px;
    flex-shrink: 0;
    padding: 3px;
    margin: 5px;
    border: 1px solid whitesmoke;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>