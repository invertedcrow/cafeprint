<template>
  <div id="sidesContainer" class="sides d-flex justify-content-center">
    <div v-for="(side) in sides" :key="side.id" @click="setActiveSide(side)">
      <div class="sides__item d-flex flex-column" :class="{active: side.id == side.id }">
        <svg :viewBox="'0 0 500 500'" width="100%" height="100%">
          <rect fill="none" width="500" height="500" />
          <image v-bind:xlink:href="side.image" style="width: 100%" />
          <g :transform="'translate('+side.area.x+', '+side.area.y+')'">
            <rect
              fill="none"
              vector-effect="non-scaling-stroke"
              :height="side.area.height"
              :width="side.area.width"
            />
            <g
              v-for="(item, index) in side.items"
              ref="groupEls"
              :key="index"
              :transform="'translate('+item.x+', '+item.y+') rotate('+item.rotate+' '+item.width/2+' '+item.height/2+')'"
              width="0"
            >
              <rect
                x="0"
                y="0"
                :width="side.area.width"
                :height="side.area.height"
                fill="transparent"
              />
              <image
                v-if="item.type=='img'"
                v-bind:xlink:href="imgUrl(item.url)"
                :x="0"
                :y="0"
                :opacity="item.layers_opacity"
                :height="item.height"
                :width="item.width"
              />
              <text
                v-bind:key="index"
                v-for="(text, index) in item.text"
                :x="0"
                :y="item.fontSize"
                :height="item.height"
                :opacity="item.layers_opacity"
                :width="item.width"
                :dy="index + 'em'"
                :font-family="item.font"
                :font-size="item.fontSize"
                :text-anchor="item.textAnchor"
                :font-weight="item.bold ? 'bold' : 'normal'"
                :font-style="item.italic ? 'italic' : 'normal'"
                :fill="item.color"
                :textLength="item.textAnchor === TextAlignment.JUSTIFIED ? item.width : 0"
              >{{text}}</text>
            </g>
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
import { API_URL } from "../consts";

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
    setActiveSide(side) {
      this.$store.commit(CONSTRUCTOR_SET_SELECTED_SIDE, side);
      this.$store.commit(CONSTRUCTOR_SET_SELECTED_ITEM, null);
    },
    imgUrl(url) {
      return API_URL + "/" + url;
    }
  },
  computed: {
    ...mapGetters(["side", "renderSides"])
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
          return [item.id, elems[i].innerHTML];
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
  }
}
</style>