<template>
  <div class="color-list">
    <div
      class="color-list__item"
      v-for="(color, index) in colors"
      :key="index"
      @click="setActiveColor(color)"
      :style="{backgroundColor: `#${color.color}` }"
      :class="{active: active.id === color.id}"
    ></div>
    <button
      v-if="isColorPicker"
      id="popover-color-picker-popover"
      class="baseBtn secondary color-list__item"
    >
      <img src="../assets/icons/colopicker.png" alt />
    </button>

    <b-popover
      custom-class="picker-popover"
      placement="top"
      target="popover-color-picker-popover"
      triggers="focus"
    >
      <chrome-picker :value="pickerColor" v-model="pickerColor" />
    </b-popover>
  </div>
</template>

<script>
import { Chrome } from "vue-color";
export default {
  data() {
    return {
      pickerColor: "#194d33"
    };
  },
  components: {
    "chrome-picker": Chrome
  },
  watch: {
    pickerColor: function(color) {
      this.setActiveColor(color.hex8);
    }
  },
  props: ["colors", "active", "setActiveColor", "isColorPicker"]
};
</script>

<style lang="scss" scoped>
.color-list {
  padding: 0 4px;
  display: flex;
  flex-wrap: wrap;
  .baseBtn {
    &.secondary {
      border-color: transparent;
      padding: 0;
    }
  }
  &__item {
    width: 23px;
    height: 23px;
    border-radius: 50%;
    margin-right: 12px;
    margin-bottom: 15px;
    position: relative;
    &.active {
      &:after {
        position: absolute;
        display: block;
        content: "";
        border: 1px solid #a5cd75;
        width: 31px;
        height: 31px;
        top: -4px;
        left: -4px;
        border-radius: 50%;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>