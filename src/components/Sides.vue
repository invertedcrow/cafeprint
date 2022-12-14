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
            <mask :id="'mainMask'+side.id" v-html="side.svg_area" maskUnits="userSpaceOnUse" />
          </defs>
          <image
            v-bind:xlink:href="side.image"
            style="width: 100%; height: 100%"
            :x="image.x"
            :y="image.y"
            :width="image.width"
            :height="image.height"
          />
          <g id="containerGroupMain">
            <defs v-if="sideMask[side.id]" class="printSize-def">
              <mask :id="'printSizeMask'+side.id" maskUnits="userSpaceOnUse">
                <rect
                  :width="sideMask[side.id].width"
                  :height="sideMask[side.id].height"
                  :x="sideMask[side.id].x"
                  :y="sideMask[side.id].y"
                  class="printSizeMask"
                  rx="0"
                  ry="0"
                  fill="white"
                />
              </mask>
            </defs>
            <svg
              :x="0"
              :y="0"
              viewBox="0 0 500 500"
              width="500"
              height="500"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              :mask="'url(#printSizeMask' + side.id + ')'"
            >
              <g
                v-for="(item, index) in side.items"
                ref="groupEls"
                :key="index"
                :mask="'url(#mainMask' + side.id + ')'"
              >
                <g :transform="item.matrix ? item.matrix : ''">
                  <svg
                    :height="item.height"
                    :width="item.width"
                    :x="item.x"
                    :y="item.y"
                    :opacity="base.layers_opacity"
                    :style="{'overflow': item.type=='text' ? 'visible' : 'hidden'}"
                  >
                    <image
                      v-if="item.type=='img'"
                      class="image control"
                      :data-id="item.dataId"
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
                      :data-id="item.dataId"
                      :font-family="item.font.name"
                      :font-size="item.fontSize"
                      :text-anchor="item.textAnchor"
                      :font-weight="item.bold ? 'bold' : 'normal'"
                      :font-style="item.italic ? 'italic' : 'normal'"
                      :fill="item.color"
                      overflow="visible"
                    >
                      <tspan
                        :y="0"
                        :dy="index*0.9 + 0.9 + 'em'"
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
      sides: [],
      image: {
        x: 0,
        y: 0,
        width: 500,
        height: 500
      },
      sideMask: {}
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
      if (url.startsWith("http")) {
        return url;
      }
      let link = API_URL + (url[0] == "/" ? "" : "/") + url;
      return link;
    },
    active() {
      return this.side.id;
    },
    printSizeMask(side) {
      if (
        !side.items ||
        !side.items.length ||
        !this.base.printSizes ||
        !this.base.printSizes.length ||
        this.base.printSizes.length == 1 ||
        !side.printSize
      ) {
        this.sideMask[side.id] = null;
        return;
      }
      if (side && side.real_height) {
        this.getRealSideAreaSize({ ...side });
        this.isVertical({ ...side });
      }

      let mask = null;
      let items = side.items;
      let printSize = side.printSize;
      let arrX = items.map(item => item.x);
      let arrY = items.map(item => item.y);

      if (printSize && side.area) {
        let width =
          (+printSize.real_width / side.real_width) * +side.area.width;
        let height =
          (+printSize.real_height / side.real_height) * +side.area.height;

        this.sideMask[side.id].width = this.sideMask[side.id].isVertical
          ? width
          : height;
        this.sideMask[side.id].height = this.sideMask[side.id].isVertical
          ? height
          : width;
      }
    },
    getRealSideAreaSize(side) {
      if (!this.sideMask[side.id]) {
        this.sideMask[side.id] = {};
      }
      let realSideWidth = +side.real_width;
      let realSideHeight = +side.real_height;
      if (side.real_for_size_id) {
        let realForSize = this.baseSizes.find(
          item => item.id == side.real_for_size_id
        );

        if (realForSize) {
          realSideWidth =
            (side.real_width * +this.size.width) / +realForSize.width;
          realSideHeight =
            (side.real_height * +this.size.height) / +realForSize.height;
        }
      }
      // let element = document.querySelector(`#mainMask${side.id}`);
      // if (!element) return;
      // side.edAreaBounds = element.firstChild.getBoundingClientRect();
      this.sideMask[side.id].real_width = realSideWidth;
      this.sideMask[side.id].real_height = realSideHeight;
    },
    isVertical(side) {
      if (!this.sideMask[side.id]) {
        this.sideMask[side.id] = {};
      }
      // console.log('items')
      // console.log(side.items)
      this.sideMask[side.id].isVertical = true;
      // let arrX = side.items.map(item => item.x);
      // let arrY = side.items.map(item => item.y);
      // let arrW = side.items.map(item => item.width);
      // let arrH = side.items.map(item => item.height);
      // let arrX2 = side.items.map(item => item.x + item.width);
      // let arrY2 = side.items.map(item => item.y + item.height);

     
      let arrX = side.items.map(item => (item.visibleX - item.areaBound.x)/item.areaBound.width * +side.area.width + +side.area.x);
      let arrY = side.items.map(item => (item.visibleY - item.areaBound.y)/item.areaBound.height * +side.area.height + +side.area.y);
      let arrW = side.items.map(item => item.visibleWidth / item.areaBound.width * +side.area.width);
      let arrH = side.items.map(item => item.visibleHeight / item.areaBound.height * +side.area.height);
      let arrX2 = side.items.map(item => ((item.visibleX - item.areaBound.x) + item.visibleWidth) / item.areaBound.width * +side.area.width);
      let arrY2 = side.items.map(item => ((item.visibleY - item.areaBound.y) + item.visibleHeight) / item.areaBound.height * +side.area.height);

      let allItemsParams = {
        x: Math.min(...arrX),
        y: Math.min(...arrY),
        width: Math.max(...arrW),
        height: Math.max(...arrH),
        x2: Math.max(...arrX2),
        y2: Math.max(...arrY2)
      };

      if (side && side.printSize && side.area) {
        side.area.right = +side.area.x + +side.area.width;
        side.area.bottom = +side.area.y + +side.area.height;
        if (+side.area.x > allItemsParams.x) {
          allItemsParams.x = side.area.x;
        }
        if (+side.area.right < allItemsParams.x2) {
          allItemsParams.x2 = side.area.right;
          allItemsParams.width = +side.area.width;
        }

        allItemsParams.width = allItemsParams.x2 - allItemsParams.x;

        if (+side.area.y > allItemsParams.y) {
          allItemsParams.y = side.area.y;
        }
        if (+side.area.bottom < allItemsParams.y2) {
          allItemsParams.y2 = side.area.bottom;
          allItemsParams.height = +side.area.height;
        }
        allItemsParams.height = allItemsParams.y2 - allItemsParams.y;

        allItemsParams.realItemsWidth =
          (allItemsParams.width / side.items[0].areaBound.width) *
          side.real_width;
        allItemsParams.realItemsHeight =
          (allItemsParams.height / side.items[0].areaBound.height) *
          side.real_height;

        let verticalSize = null;
        let horizontalSize = null;
        // if (
        //   allItemsParams.realItemsHeight <= side.printSize.real_height &&
        //   allItemsParams.realItemsWidth <= side.printSize.real_width
        // ) {
        //   verticalSize = side.printSize;
        // }
        // if (
        //   allItemsParams.realItemsHeight <= side.printSize.real_width &&
        //   allItemsParams.realItemsWidth <= side.printSize.real_height
        // ) {
        //   horizontalSize = side.printSize;
        // }

        if (allItemsParams.realItemsHeight < allItemsParams.realItemsWidth) {
          horizontalSize = side.printSize;
        } else {
          verticalSize = side.printSize;
        }

        if (verticalSize && horizontalSize) {
          this.sideMask[side.id].isVertical =
            +verticalSize.real_width < +horizontalSize.real_width
              ? true
              : false;
        } else if (verticalSize) {
          this.sideMask[side.id].isVertical = true;
        } else if (horizontalSize) {
          this.sideMask[side.id].isVertical = false;
        }
        this.sideMask[side.id].x = allItemsParams.x;
        this.sideMask[side.id].y = allItemsParams.y;
      }
    }
  },
  computed: {
    ...mapGetters([
      "side",
      "renderSides",
      "base",
      "maxPrintSize",
      "size",
      "baseSizes"
    ])
  },
  watch: {
    renderSides: function(val) {
      this.sides = [...val];
      if (this.sides && this.sides.length) {
        this.sides.forEach(item => {
          this.printSizeMask(item);
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