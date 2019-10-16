<template>
  <div class="search">
    <b-form-input class="search__input" v-model="text" placeholder="Search for design"></b-form-input>
    <div class="search__btn clear" @click="resetSearch()">X</div>
    <div class="search__btn start" @click="onSearch()">GO</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    ...mapActions(["searchDesign"]),
    onSearch() {
      this.searchDesign(this.text);
    },
    resetSearch() {
      this.$store.commit("setDesigns", []);
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  &__input {
    height: 50px;
    &:focus {
      box-shadow: none;
    }
  }
  &__btn {
    position: absolute;
    top: 12px;
    cursor: pointer;

    &.clear {
      right: 40px;
    }

    &.start {
      right: 10px;
    }
  }
}
</style>