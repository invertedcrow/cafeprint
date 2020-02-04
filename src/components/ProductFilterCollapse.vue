<template>
  <div class="filter__category">
    <div class="d-flex align-items-center" @click="showCollapse = !showCollapse">
      <div class="filter__category-arrow d-flex" :class="{open: showCollapse}">
        <img src="../assets/icons/arrow.svg" alt />
      </div>
      <div class="filter__category-title">{{category.name}}</div>
    </div>
    <b-collapse v-model="showCollapse" class="filter__subCategory">
      <div
        class="filter__subCategory-item d-flex"
        v-for="(subItem, index) in category.children"
        :key="index"
        @click="setActiveCategory(subItem.id)"
      >
        <checkbox
          :checked="subItem.id == filterParams.category_ids && category.sex == filterParams.sex"
        />
        <p>{{subItem.name}}</p>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import Checkbox from "./Checkbox";
import { mapGetters, mapActions } from "vuex";
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
    ...mapActions([GET_BASES_LIST]),
    setActiveCategory(id) {
      this.$store.dispatch(GET_BASES_LIST, {
        category_ids: id,
        sex: this.category.sex,
        limit: 10
      });
    }
  },
  computed: {
    ...mapGetters(["filterParams"])
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
    display: flex;
    flex-direction: column;
    align-items: start;
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