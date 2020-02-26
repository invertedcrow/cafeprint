<template>
  <div id="sidesContainer" class="sides d-flex justify-content-center">
    <div v-for="(side) in sides" :key="side.id" @click="setActiveSide(side)">
      <div
        class="sides__item d-flex flex-column"
        :class="{active: side.id == active(), invalid: side.invalid && maxPrintSize }"
      >
        <svg
          :viewBox="'0 0 500 500'"
          width="500"
          height="500"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <mask id="mainMask" v-html="side.area.svg_area" maskUnits="userSpaceOnUse" />
          </defs>
          <image v-bind:xlink:href="side.image" style="width: 100%; height: 100%" />
          <g id="containerGroupMain">
            <svg :x="0" :y="0" viewBox="0 0 500 500" width="500" height="500">
              <g
                v-for="(item, index) in side.items"
                ref="groupEls"
                :key="index"
                mask="url(#mainMask)"
              >
                <g :transform="item.matrix ? item.matrix : ''">
                  <svg
                    :height="item.height"
                    :width="item.width"
                    :x="item.x"
                    :y="item.y"
                    :opacity="base.layers_opacity"
                    :class="{'svgText': item.type=='text'}"
                  >
                    <image
                      v-if="item.type=='img'"
                      class="image control"
                      :data-id="`id${Date.now()}`"
                      :data-layername="item.name"
                      :xlink:href="item.url ? imgUrl(item.url) : item.dataUrl"
                      :height="item.height"
                      :width="item.width"
                      :x="0"
                      :y="0"
                    />
                    <text
                      v-if="item.type=='text'"
                      class="text control"
                      :data-layername="item.name"
                      :data-id="`id${Date.now()}`"
                      :font-family="item.font.name"
                      :font-size="item.fontSize"
                      :text-anchor="item.textAnchor"
                      :font-weight="item.bold ? 'bold' : 'normal'"
                      :font-style="item.italic ? 'italic' : 'normal'"
                      :fill="item.color"
                    >
                      <tspan
                        :y="0"
                        :dy="index + 'em'"
                        v-bind:key="index"
                        :textLength="item.textAnchor === TextAlignment.JUSTIFIED ? item.width : 0"
                        v-for="(text, index) in item.text"
                        :x="getTextXPosition(item)"
                      >{{text}}</tspan>
                    </text>
                  </svg>
                </g>
              </g>
            </svg>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { TextAlignment } from "../consts";
import { mapGetters, mapMutations } from "vuex";
import {
  CONSTRUCTOR_SET_SELECTED_SIDE,
  CONSTRUCTOR_SET_SELECTED_ITEM,
  SAVE_SET_SIDES_LIST
} from "../store/mutations.type";
import { API_URL, Sidebar } from "../consts";

export default {
  data() {
    return {
      TextAlignment,
      sides: []
    };
  },
  methods: {
    ...mapMutations([
      CONSTRUCTOR_SET_SELECTED_SIDE,
      CONSTRUCTOR_SET_SELECTED_ITEM,
      SAVE_SET_SIDES_LIST
    ]),
    getTextXPosition(item) {
      if (item.textAnchor === TextAlignment.END) {
        return item.width;
      }
      if (item.textAnchor === TextAlignment.MIDDLE) {
        return item.width / 2;
      }
      return 0;
    },
    setActiveSide(side) {
      this.$store.commit(CONSTRUCTOR_SET_SELECTED_SIDE, side);
      this.$store.commit(CONSTRUCTOR_SET_SELECTED_ITEM, null);
      this.$store.commit("setActiveSidebar", Sidebar.PRODUCT);
    },
    imgUrl(url) {
      let link = API_URL + (url[0] == "/" ? "" : "/") + url;
      return link;
    },
    active() {
      return this.side.id;
    }
  },
  computed: {
    ...mapGetters(["side", "renderSides", "base", "maxPrintSize"])
  },
  watch: {
    renderSides: function(val) {
      this.sides = [...val];
      if (val && val.length) {
        val.forEach(item => {
          let element = new DOMParser().parseFromString(
            item.svg_area,
            "text/xml"
          );
          item.area = {};
          item.area.tag = element.documentElement.tagName;

          if (item.area.tag == "rect") {
            item.area.width = element.documentElement.getAttribute("width");
            item.area.height = element.documentElement.getAttribute("height");
            item.area.x = element.documentElement.getAttribute("x");
            item.area.y = element.documentElement.getAttribute("y");
          } else if (item.area.tag == "polygon") {
            item.area.points = element.documentElement.getAttribute("points");

            const arr = item.area.points.split(" ");
            let arrX = [],
              arrY = [];
            arr.forEach(item => {
              let temp = item.split(",");
              arrX.push(+temp[0]);
              arrY.push(+temp[1]);
            });
            item.area.x = Math.min(...arrX);
            item.area.y = Math.min(...arrY);
            item.area.width = Math.max(...arrX) - Math.min(...arrX);
            item.area.height = Math.max(...arrY) - Math.min(...arrY);
          }
        });
      }
      let sides = [];
      let elems = document.querySelectorAll(".sides__item");
      if (elems.length) {
        sides = this.sides.map((item, i) => {
          return { sideId: item.id, svg: elems[i].innerHTML };
        });
        this.$store.commit(SAVE_SET_SIDES_LIST, sides);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sides {
  padding-left: 10px;
  padding-right: 10px;
  user-select: none;
  &__item {
    .svgText {
      overflow: visible;
      dominant-baseline: text-before-edge;
    }
    width: 100px;
    height: 100px;
    border: 1px solid transparent;
    margin: 2px;
    opacity: 0.4;
    &:hover {
      cursor: pointer;
    }
    &.active {
      border: 1px solid #ebebeb;
      opacity: 1;
    }
    &.invalid {
      border: 1px solid red;
    }
    svg {
      width: 100%;
    }
  }
}
</style>