<template>
  <div class="filter__category">
    <div class="d-flex align-items-center" @click="showCollapse = !showCollapse">
      <div class="filter__category-arrow d-flex" :class="{open: showCollapse}">
        <img src="../assets/icons/arrow.svg" alt />
      </div>
      <div class="filter__category-title">{{category.name}}</div>
    </div>
    <b-collapse v-model="showCollapse" class="filter__subCategory">
      <div v-for="(subItem, index) in category.children" :key="index">
        <div v-if="subItem.children">
          <div>
            <div
              class="d-flex align-items-center filter__subCategory-title"
              @click="subItem.open = subItem.open ? false : true "
            >
              <div class="filter__category-arrow d-flex" :class="{open: subItem.open}">
                <img src="../assets/icons/arrow.svg" alt />
              </div>
              <div class="filter__category-title">{{subItem.name}}</div>
            </div>
            <b-collapse v-model="subItem.open" class="filter__subCategory">
              <div
                v-for="(cat, catIndex) in subItem.children"
                :key="catIndex"
                class="filter__subCategory-item d-flex"
                @click="setActiveCategory(cat)"
              >
                <checkbox :checked="isActive(cat.id)" />
                <p>{{cat.name}}</p>
              </div>
            </b-collapse>
          </div>
        </div>
        <div v-else class="filter__subCategory-item d-flex" @click="setActiveCategory(subItem)">
          <checkbox :checked="isActive(subItem.id)" />
          <p>{{subItem.name}}</p>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import Checkbox from "./Checkbox";
import { mapMutations, mapGetters, mapActions } from "vuex";
import { GET_DESIGN } from "../store/actions.type";

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
    ...mapActions([GET_DESIGN]),
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
        limit: 16
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
    ...mapGetters(["designFilter", "category_ids"])
  }
};
</script>

<style lang="scss" scoped>
.filter {
  &__category {
    margin-bottom: 15px;
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
      font-weight: 500;
      letter-spacing: 0.14px;
      cursor: pointer;
      margin-left: 5px;
    }
  }

  &__subCategory {
    margin-left: 17px;
    margin-top: 15px;
    cursor: pointer;
    &-title {
      margin-bottom: 15px;
    }
    &-item {
      align-items: center;
      margin-bottom: 15px;
    }
    p {
      margin-left: 12px;
      margin-bottom: 0;
      color: #162237;
      font-family: "MuseoSansCyrl", sans-serif;
      font-size: 14px;
      font-weight: 300;
      letter-spacing: 0.14px;
      line-height: 1;
    }
  }
}
</style>