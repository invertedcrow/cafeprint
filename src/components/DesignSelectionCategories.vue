<template>
  <div class="categories d-flex flex-column">
    <div @click="showCollapse = !showCollapse" class="categories__title justify-content-between">
      <div>Выберите категории</div>
      <div class="categories__arrow d-flex" :class="{open: showCollapse}">
        <img src="../assets/icons/arrow.svg" alt />
      </div>
    </div>

    <b-collapse id="collapse-4" v-model="showCollapse">
      <div
        class="categories__item d-flex align-items-center"
        v-for="(item, index) in designCategories"
        :key="index"
        @click="onSelect(item)"
      >
        <filter-checkbox :checked="item == designActiveCategory" />
        <p>{{item}}</p>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import FilterCheckbox from "./FilterCheckbox";

export default {
  data() {
    return {
      showCollapse: true
    };
  },
  components: {
    FilterCheckbox
  },
  methods: {
    ...mapActions(["fetchDesigns"]),
    ...mapMutations(["setActiveCategory"]),
    onSelect(category) {
      this.setActiveCategory(category);
      this.fetchDesigns();
    }
  },
  computed: {
    ...mapGetters(["designCategories", "designActiveCategory"])
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.showCollapse = window.innerWidth > 768 ? true : this.showCollapse;
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.categories {
  padding-top: 30px;
  height: 100%;
  overflow: hidden;
  &__arrow {
    width: 12px;
    height: 12px;
    img {
      width: 100%;
      transform: rotate(180deg);
    }
    &.open {
      img {
        transform: rotate(-90deg);
      }
    }
  }
  &__title {
    display: none;
  }
  &__item {
    margin-bottom: 20px;
    cursor: pointer;
    p {
      margin-left: 20px;
      margin-bottom: 0;
      color: #3d3d3d;
      font-family: "MuseoSansCyrl", sans-serif;
      font-size: 14px;
      font-weight: 300;
      letter-spacing: 0.14px;
      line-height: 15px;
    }
  }
  @media screen and (max-width: 768px) {
    padding-top: 20px;
    border-bottom: 1px solid #d0d0d0;
    margin-bottom: 20px;
    &__title {
      display: flex;
      color: #001129;
      font-family: "MuseoSansCyrl", sans-serif;
      font-size: 14px;
      font-weight: 500;
      line-height: 1;
      margin-bottom: 20px;
    }
  }
}
</style>