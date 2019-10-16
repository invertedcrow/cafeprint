<template>
  <div class="main">
    <div class="constructor" :style="{borderColor: activeProduct.color}">
      <svg
        :width="width"
        :height="height"
        @mousemove="onMouseMove($event)"
        @mouseup="onMouseUp($event)"
        @click="onClickItem($event,{})"
      >
        <g
          v-for="(item, index) in items"
          :key="index"
          :transform="'translate('+item.x+', '+item.y+')'"
        >
          <text
            v-if="item.type=='text'"
            :x="getTextXPos(item)"
            :y="item.height*0.9"
            :_width="item.width"
            :_height="item.height"
            :font-size="item.height"
            :font-family="item.font"
            :fill="item.color"
            :text-anchor="item.textAnchor"
            @click="onClickItem($event,item)"
          >{{item.text}}
          </text>
          <g v-if="item.active">
            <rect
              :x="0"
              :y="0"
              :width="item.width"
              :height="item.height"
              class="ctrl-bounds"
              @click="onClickItem($event,item)"
              @_mouseout="onMouseUpRegion($event,item)"
              @mousedown="onMouseDownRegion($event,item)"
            />
            <g @mousedown="onMouseDownHandles($event,item)">
              <rect
                class="ctrl-rect rotate"
                :width="tools.squaresize"
                :height="tools.squaresize"
                data-handleid="3"
                :x="item.width"
                :y="0-tools.squaresize"
              />
              <rect
                class="ctrl-rect remove"
                @click="removeActiveItem()"
                :width="20"
                :height="20"
                data-handleid="7"
                :x="0-tools.squaresize"
                :y="item.height"
              />
              <rect
                class="ctrl-rect scale"
                :width="tools.squaresize"
                :height="tools.squaresize"
                data-handleid="9"
                :x="item.width"
                :y="item.height"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
const defaultProps = {
  hex: "#000",
  a: 1
};
export default {
  data() {
    return {
      width: 500,
      height: 500,
      colors: defaultProps,
      onChangeColorListener: null,
      showcolors: false,
      movetarget: null,
      activeItemIndex: null,
      tools: {
        squaresize: 20,
        min_height: 10
      }
    };
  },
  watch: {
    addText: function(val) {
      if (val) {
        this.addTextField();
        this.$store.commit("addText", false);
      }
    }
  },
  computed: {
    addText() {
      return this.$store.state.addText;
    },
    activeProduct() {
      return this.$store.state.activeProduct;
    },
    items() {
      return this.$store.state.constructor.items;
    }
    // constructor() {
    //   return this.$store.state.constructor;
    // }
  },
  methods: {
    onChange(val) {
      if (this.onChangeColorListener) {
        this.colors = val;
        this.onChangeColorListener();
      }
    },

    toggleColor() {
      this.showcolors = !this.showcolors;
    },

    addTextField() {
      this.$store.commit("addItemToConstructor", this.createTextField());
      /// add to store
      // this.items.push(this.createTextField());
    },

    createTextField() {
      return {
        type: "text",
        textAnchor: "left",
        active: false,
        x: ((this.items.length + 2) % 20) * 20,
        y: ((this.items.length + 2) % 20) * 20,
        text: "ENTER TEXT",
        width: 400,
        height: 40,
        font: "Arial",
        color: this.colors.hex || "#000"
      };
    },

    onClickItem(event, item) {
      event.stopPropagation(); //prevent parent from firing
      if (item.active) {
        return;
      }
      // select item if not selected
      this.deactivateItems();
      item.active = true;
      this.onChangeColorListener = function() {
        item.color = this.colors.hex;
      };
      this.colors = defaultProps;
      this.colors.hex = item.color;
      this.activeItemIndex = this.items.indexOf(item);
      this.$store.commit("setItemsConstructor", this.items);
    },

    moveUp() {
      if (
        this.activeItemIndex >= 0 &&
        this.activeItemIndex < this.items.length
      ) {
        swapArrayElements(
          this.items,
          this.activeItemIndex,
          this.activeItemIndex + 1
        );
        this.activeItemIndex += 1;
        this.$forceUpdate();
      }
    },

    moveDown() {
      if (this.activeItemIndex >= 0 && this.activeItemIndex >= 0) {
        swapArrayElements(
          this.items,
          this.activeItemIndex,
          this.activeItemIndex - 1
        );
        this.activeItemIndex -= 1;
        this.$forceUpdate();
      }
    },

    deactivateItems() {
      this.items.map(function(i) {
        if (i) i.active = false;
      });
    },

    removeActiveItem() {
      let tempArr = [...this.items];
      tempArr = this.items.filter(i => i.active === false);
      this.$store.commit("setItemsConstructor", tempArr);
    },

    onMouseDownRegion(event, item) {
      if (item.active) {
        item.drag = {
          type: "MOVE",
          x: item.x,
          y: item.y,
          mx: event.x,
          my: event.y
        };
      }
      this.movetarget = item;
    },

    onMouseUp() {
      this.movetarget = null;
    },

    onMouseMove(event) {
      if (this.movetarget == null) return;
      var item = this.movetarget;
      var t = this.tools;

      if (item.active && item.drag != undefined) {
        if (item.drag.type == "MOVE") {
          item.x = event.x - item.drag.mx + item.drag.x;
          item.y = event.y - item.drag.my + item.drag.y;
        }
        if (item.drag.type == "SCALE") {
          if (item.drag.handleID == "1") {
            // TL resize handler
            item.x = Math.min(
              event.x - item.drag.mx + item.drag.x,
              item.drag.x + (item.drag.w - t.min_height)
            );
            item.y = Math.min(
              event.y - item.drag.my + item.drag.y,
              item.drag.y + (item.drag.h - t.min_height)
            ); // with y constraint
            item.width = Math.max(
              item.drag.w - event.x + item.drag.mx,
              t.min_height
            );
            item.height = Math.max(
              item.drag.h - event.y + item.drag.my,
              t.min_height
            );
          }
          if (item.drag.handleID == "3") {
            // TR resize handler
            item.y = Math.min(
              event.y - item.drag.my + item.drag.y,
              item.drag.y + (item.drag.h - t.min_height)
            ); // with y constraint
            item.width = Math.max(
              item.drag.w + event.x - item.drag.mx,
              t.min_height
            );
            item.height = Math.max(
              item.drag.h - event.y + item.drag.my,
              t.min_height
            );
          }
          if (item.drag.handleID == "7") {
            // BL
            item.x = Math.min(
              event.x - item.drag.mx + item.drag.x,
              item.drag.x + (item.drag.w - t.min_height)
            );
            item.width = Math.max(
              item.drag.w - event.x + item.drag.mx,
              t.min_height
            );
            item.height = Math.max(
              item.drag.h + event.y - item.drag.my,
              t.min_height
            );
          }
          if (item.drag.handleID == "9") {
            // BR
            item.width = Math.max(
              item.drag.w + event.x - item.drag.mx,
              t.min_height
            );
            item.height = Math.max(
              item.drag.h + event.y - item.drag.my,
              t.min_height
            );
          }
        }
      }
    },

    onKeyUp(event) {
      if (event.key === "Delete") {
        this.removeActiveItem();
      }
      return event.preventDefault();
    },

    onMouseDownHandles(event, item) {
      var handleID = event.target.getAttribute("data-handleid");

      item.drag = {
        x: item.x,
        y: item.y,
        mx: event.x,
        my: event.y,
        w: item.width,
        h: item.height,
        type: "SCALE",
        handleID: handleID
      };

      this.movetarget = item;
    },

    textAlign(val) {
      var i = this.items[this.activeItemIndex];
      if (i && i.type == "text") {
        i.textAnchor = val;

        this.$forceUpdate();
      }
    },

    getTextXPos(item) {
      if (item.textAnchor == "middle") return item.width / 2;
      if (item.textAnchor == "end") return item.width;
      return 0;
    }
  },
  mounted() {
    window.addEventListener("keyup", this.onKeyUp);
  }
};
var swapArrayElements = function(arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};
</script>

<style lang="scss" scoped>
.constructor {
  border: dashed 1px gray;
  margin-right: 150px;
  width: 500px;
  height: 500px;
}
svg {
  text {
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  text::selection {
    background: none;
  }
  .ctrl-rect {
    fill: #ffffff;
    stroke: #000;
    stroke-width: 1;
    &:hover {
      cursor: pointer;
    }
    &.remove {
      fill: red;
      content: "";
    }
    &.rotate {
      fill: orange;
    }
    &.scale {
      fill: greenyellow;
    }
  }
  .ctrl-bounds {
    fill-opacity: 0;
    stroke: #000;
    stroke-width: 1;
    stroke-linecap: round;
  }
}
</style>