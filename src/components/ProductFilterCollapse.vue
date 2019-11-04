<template>
  <div class="filter__category">
    <div class="d-flex align-items-center" @click="showCollapse = !showCollapse">
      <div class="filter__category-arrow d-flex" :class="{open: showCollapse}">
        <img src="../assets/icons/arrow.svg" alt />
      </div>
      <div class="filter__category-title">{{category.title}}</div>
    </div>
    <b-collapse v-model="showCollapse" class="filter__subCategory">
      <div
        class="filter__subCategory-item d-flex"
        v-for="(subItem, index) in category.subCategories"
        :key="index"
        @click="setActiveCategory(subItem)"
      >
        <checkbox :checked="subItem == activeCategory" />
        <p>{{subItem}}</p>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import Checkbox from "./Checkbox";
import { mapMutations, mapGetters, mapActions } from "vuex";
import { FILTER_SET_ACTIVE_CATEGORY } from "../store/mutations.type";
import { GET_BASES_LIST } from "../store/actions.type";

export default {
  components: {
    Checkbox
  },
  data() {
    return {
      showCollapse: false
    };
  },
  props: ["category"],
  methods: {
    ...mapMutations([FILTER_SET_ACTIVE_CATEGORY]),
    ...mapActions([GET_BASES_LIST]),
    setActiveCategory(item) {
      this.$store.commit(FILTER_SET_ACTIVE_CATEGORY, item);
      this.$store.dispatch(GET_BASES_LIST);
    }
  },
  computed: {
    ...mapGetters(["activeCategory"])
  }
};
</script>

<style lang="scss" scoped>
.filter {
  &__category {
    margin-bottom: 30px;
    &-arrow {
      width: 12px;
      height: 12px;
      img {
        width: 100%;
      }
      &.open {
        img {
          transform: rotate(-90deg);
        }
      }
    }
    &-title {
      color: #031127;
      font-family: "MuseoSansCyrl", sans-serif;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.14px;
      cursor: pointer;
      margin-left: 5px;
    }
  }

  &__subCategory {
    margin-left: 17px;
    margin-top: 15px;
    cursor: pointer;
    p {
      margin-left: 12px;
      color: #162237;
      font-family: "MuseoSansCyrl", sans-serif;
      font-size: 14px;
      font-weight: 300;
      letter-spacing: 0.14px;
    }
  }
}
</style>