<template>
  <div class="sidebar-font">
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
      <div class="sidebar-card-header__title">Выбор шрифта</div>
      <div @click="close" class="sidebar-card-header__close">
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
    <div class="sidebar-font__fonts-list">
      <ul>
        <li
          @click="onFontSelected(font)"
          :key="index"
          v-for="(font, index) in fonts"
          :style="{fontFamily: font.name}"
        >
          <div>{{font.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Sidebar } from "../consts";
import { eventBus } from "../main";
import { UPDATE_ELEMENT_SIZE } from "../eventBus.type";
import { mapGetters } from "vuex";

export default {
  name: "SettingsFontSelect",
  computed: {
    ...mapGetters(["fonts"]),
    selectedElement() {
      return this.$store.state.constructor.selectedElement;
    }
  },
  methods: {
    back() {
      this.$store.commit("setActiveSidebar", Sidebar.TEXT);
    },
    close() {
      this.$store.commit("setActiveSidebar", Sidebar.PRODUCT);
    },
    onFontSelected(font) {
      this.selectedElement.font = font;

      this.$store.commit("setActiveSidebar", Sidebar.TEXT);
      eventBus.$emit(UPDATE_ELEMENT_SIZE);
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-font {
  .sidebar-card-header__icon {
    cursor: pointer;
  }

  &__fonts-list {
    ul li {
      margin-left: -20px;
      margin-right: -20px;
      padding: 0 20px;
      cursor: pointer;
      font-size: 14px;
      div {
        padding: 20px 2px;
        border-bottom: 1px solid #ebebeb;
      }
      &:last-child {
        div {
          border-bottom: 0;
        }
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
      &:hover {
        background-color: #f7f7f7;
      }
    }
  }
}
</style>