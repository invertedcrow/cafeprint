<template>
  <div class="search">
    <b-form @submit.prevent="onSearch()">
      <b-form-input
        class="search__input"
        @change="setSearchText"
        v-model="text"
        placeholder="Поиск"
      ></b-form-input>
      <div type="submit" class="search__btn" @click="onSearch()">
        <img src="../assets/icons/search.svg" alt />
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { GET_DESIGN } from "../store/actions.type";
import { DESIGN_SET_SEARCHTEXT } from "../store/mutations.type";
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    ...mapActions([GET_DESIGN]),
    ...mapMutations([DESIGN_SET_SEARCHTEXT]),
    onSearch() {
      this.$store.dispatch(GET_DESIGN, {
        category_ids: this.category_ids,
        search: this.text,
        page: 1
      });
    },
    setSearchText() {
      this.$store.commit(DESIGN_SET_SEARCHTEXT, this.text);
    }
  },
  computed: {
    ...mapGetters(["designFilter", "category_ids"])
  },
  mount() {
    this.text = this.designFilter.search;
  }
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  border-top: 1px solid #d0d0d0;
  border-bottom: 1px solid #d0d0d0;
  padding: 20px 0;
  &__input {
    padding-left: 35px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #dcdcdc;
    &:focus {
      box-shadow: none;
    }
  }
  &__btn {
    position: relative;
    cursor: pointer;
    img {
      width: 23px;
      height: 23px;
      position: absolute;
      top: -32px;
      left: 10px;
    }

    &.clear {
      right: 40px;
    }
  }
}
</style>