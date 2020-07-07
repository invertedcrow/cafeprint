<template>
  <div class="design-categories d-flex flex-column">
    <div
      @click="showCollapse = !showCollapse"
      class="design-categories__title justify-content-between"
    >
      <div>Выберите категории</div>
      <div class="design-categories__arrow d-flex" :class="{open: showCollapse}">
        <img src="../assets/icons/arrow.svg" alt />
      </div>
    </div>
    <perfect-scrollbar>
      <b-collapse id="collapse-4" v-model="showCollapse">
        <div v-for="(item, index) in categories" :key="index">
          <div v-if="item.children">
            <design-category-collapse :category="item" />
          </div>
          <div v-else class="d-flex align-items-start flex-column">
            <div
              class="design-categories__item d-flex align-items-center"
              @click="setActiveCategory(item)"
            >
              <checkbox :checked="isActive(item.id)" />
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
      </b-collapse>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import DesignCategoryCollapse from "./DesignCategoryCollapse";
import Checkbox from "./Checkbox";
import { GET_DESIGN } from "../store/actions.type";
import { DESIGN_SET_ACTIVE_CATEGORIES } from "../store/mutations.type";

export default {
  data() {
    return {
      showCollapse: true
    };
  },
  components: {
    Checkbox,
    DesignCategoryCollapse
  },
  methods: {
    ...mapActions([GET_DESIGN]),
    ...mapMutations([DESIGN_SET_ACTIVE_CATEGORIES]),
    setActiveCategory(item) {
      item.active = item.active ? false : true;
      let arr = [];

      if (this.category_ids) {
        arr = this.category_ids;
      }

      if (item.active) {
        arr.push(item.id);
      } else {
        if (arr.length) {
          arr = arr.filter(el => el != item.id);
        }
      }

      this.$store.dispatch(GET_DESIGN, {
        category_ids: arr,
        search: this.designFilter.search,
        page: 1
      });
    },
    isActive(id) {
      if (this.category_ids) {
        return this.category_ids.indexOf(id) > -1;
      }
      return false;
    }
  },
  computed: {
    ...mapGetters(["designCategories", "designFilter", "category_ids"]),
    categories() {
      const cat = [];
      const arr = Object.keys(this.designCategories);
      arr.forEach(key =>
        cat.push(...Object.values(this.designCategories[key].children))
      );
      return cat;
    }
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
.design-categories {
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