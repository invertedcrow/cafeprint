<template>
  <div class="search">
    <b-form-input class="search__input" v-model="text" placeholder="Search for design"></b-form-input>
    <div class="search__btn" @click="onSearch()">GO</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    onSearch() {}
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
    right: 20px;
    top: 12px;
    cursor: pointer;
  }
}
</style>