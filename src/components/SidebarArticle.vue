<template>
  <div class="sidebar-article d-flex flex-column">
    <div class="sidebar-card-header">
      <div @click="back()" class="sidebar-card-header__icon">
        <svg
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 451.847 451.847"
        >
          <path
            d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0   c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744   c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"
          />
        </svg>
      </div>
      <div class="sidebar-card-header__title">Подробности о товаре</div>
      <div @click="close()" class="sidebar-card-header__close">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="17px"
          height="17px"
          viewBox="0 0 357 357"
        >
          <polygon
            points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"
          />
        </svg>
      </div>
    </div>
    <perfect-scrollbar>
      <div class="sidebar-article__prints">
        <div class="sidebar-article__group-title">Стоимость изделия</div>
        <div class="sidebar-article__item-price__item">
          <div class="sidebar-article__item-price__item-name">{{base.name}}</div>
          <div class="sidebar-article__item-price__item-price">{{article.base_price}} UAH</div>
        </div>
        <hr />
      </div>

      <div class="sidebar-article__prints">
        <div class="sidebar-article__group-title sidebar-article__prints-label">Стоимость принтов</div>
        <template v-for="(side, index) in renderSides">
          <div :key="index" v-if="side.items.length">
            <div class="sidebar-article__prints-side-name">{{side.name}}</div>
            <ul class="sidebar-article__prints-list">
              <li :key="indexEl" v-for="(el, indexEl) in side.items">
                <div v-if="el.type === 'text'" class="d-flex justify-content-start">
                  <div class="sidebar-article__prints-list__icon">
                    <span>T</span>
                  </div>
                  <span class="sidebar-article__prints-list__text">{{el.text.join(' ') }}</span>
                </div>
                <div v-if="el.type === 'img'" class="d-flex justify-content-start">
                  <div class="sidebar-article__prints-list__icon">
                    <img :src="el.url ? el.url : el.dataUrl" />
                  </div>
                  <div class="sidebar-article__prints-list__text">{{el.name}}</div>
                </div>
                <div class="sidebar-article__prints-list__price">
                  <span v-if="el.price > 0">{{el.price}} UAH</span>
                  <span v-else class="sidebar-article__prints-list__price-free">Бесплатно</span>
                </div>
              </li>
            </ul>
            <div class="sidebar-article__printing__item" v-if="side.printSize">
              <div
                class="sidebar-article__printing__item-name"
              >Размер печати {{side.printSize.name}}</div>
              <div class="sidebar-article__printing__item-price">{{printPrice(side)}} UAH</div>
            </div>
          </div>
        </template>
        <div class="sidebar-article__printing__item" v-if="!base.printSizes.length">
          <div class="sidebar-article__printing__item-name">Стоимость печати</div>
          <div class="sidebar-article__printing__item-price">{{printPrice3d()}} UAH</div>
        </div>
      </div>
      <div class="sidebar-article__prints" v-if="features.length">
        <div class="sidebar-article__group-title">Дополнительно</div>
        <template>
          <ul class="sidebar-article__prints-list">
            <li :key="index" v-for="(feature, index) in features">
              <div class="d-flex justify-content-start">
                <div class="sidebar-article__prints-list__icon">
                  <!-- <span>T</span> -->
                </div>
                <span class="sidebar-article__prints-list__text">{{ featureName(feature.value_id) }}</span>
              </div>
              <div class="sidebar-article__prints-list__price">
                <span v-if="feature.feature_price > 0">{{feature.feature_price}} UAH</span>
                <span v-else class="sidebar-article__prints-list__price-free">Бесплатно</span>
              </div>
            </li>
          </ul>
        </template>
      </div>

      <!-- 
    <div class="sidebar-article__printing"> 
      <div class="sidebar-article__group-title sidebar-article__printing-label">Стоимость печати</div>
      <div class="sidebar-article__printing__item">
        <div class="sidebar-article__printing__item-name">Размер печати А4</div>
        <div class="sidebar-article__printing__item-price">150 UAH</div>
      </div>
      </div>-->
    </perfect-scrollbar>
    <div class="sidebar-article__group-title">Стоимость изделия: {{productMinPrice.item_total}} UAH</div>
  </div>
</template>

<script>
import { Sidebar } from "../consts";
//import { eventBus } from "../main";
import { mapGetters } from "vuex";

export default {
  name: "SidebarArticle",
  data() {
    return {
      items: [],
      sides: [{ id: 1 }]
    };
  },
  methods: {
    featureName(id) {
      let features = this.base.features;
      let name = "";
      features.forEach(item => {
        let feat = item.values.find(a => a.id == id);
        if (feat) {
          name = feat.name;
        }
      });

      return name;
    },
    printPrice(side) {
      if (this.article.sizes) {
        if (this.article.sizes[this.productMinPrice.id].sides) {
          return this.article.sizes[this.productMinPrice.id].sides[side.id]
            .print_price;
        } else if (this.article.sizes[this.productMinPrice.id].print_price) {
          return this.article.sizes[this.productMinPrice.id].print_price;
        }
      }

      return "";
    },
    printPrice3d() {
      if (this.article.sizes) {
        return this.article.sizes[this.productMinPrice.id].print_price;
      }
      return "";
    },
    back() {
      this.$store.commit("setActiveSidebar", Sidebar.PRICE);
    },
    filteredItems(side) {
      return this.items.filter(x => x.side === side);
    },
    close() {
      this.$store.commit("setActiveSidebar", Sidebar.PRODUCT);
    }
  },
  computed: {
    ...mapGetters([
      "article",
      "base",
      "renderSides",
      "sizesList",
      "productMinPrice"
    ]),
    features() {
      if (this.article.features) {
        return Object.values(this.article.features);
      }
      return [];
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-article {
  $font-gray: #7d8695;
  height: 500px;
  position: relative;
  .sidebar-card-header__icon {
    cursor: pointer;
  }

  .sidebar-card-header {
    margin-bottom: 20px;
  }

  &__group {
    &-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 15px;
    }
  }

  &__item-price,
  &__printing {
    &__item {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      margin-bottom: 15px;
      &-name {
        font-size: 14px;
        color: $font-gray;
      }
      &-price {
        min-width: 72px;
        font-size: 14px;
        font-weight: 500;
        text-align: right;
      }
    }
  }

  &__prints {
    padding-right: 15px;
    &-label {
      margin-bottom: 0;
    }
    &-side-name {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 10px;
      margin-top: 15px;
      color: $font-gray;
    }
    &-list {
      border-top: 1px solid #ebebeb;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*padding: 10px 0;*/
        height: 60px;
        border-bottom: 1px solid #ebebeb;
        &:last-child {
          margin-bottom: 15px;
        }
      }

      &__price {
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        &-free {
          color: #81b241;
        }
      }

      &__text {
      }
      &__text-mark {
        margin-right: 20px;
        position: relative;
        span {
          font-size: 25px;
          /*font-weight: 300;*/
          position: absolute;
          top: -8px;
        }
      }

      &__icon {
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        flex-shrink: 0;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      &__text {
        width: 100%;
        height: 35px;
        overflow: hidden;
        line-height: 1.3;
        padding-right: 10px;
        font-family: "MuseoSansCyrl", sans-serif;
        font-weight: 300;
        font-size: 14px;
        word-break: break-word;
        display: flex;
        align-items: center;
      }
    }
  }

  &__printing {
    &-label {
      margin-top: 20px;
    }
  }
}
</style>