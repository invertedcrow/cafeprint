<template>
  <div class="main">
    <div class="constructor" :style="{borderColor: selectedProduct.color}">
      <svg :viewBox="'0 0 '+width+' '+height" :width="width" :height="height" @mousedown="resetSelected">
        <!--<rect></rect>-->
        <image
                v-bind:xlink:href="selectedSide.image"
                x="0" y="0" :width="width" :height="height"
        ></image>

        <g :transform="'translate('+selectedSide.area.x+', '+selectedSide.area.y+')'">
          <rect id="editable-area" fill="none" stroke="white" :height="selectedSide.area.height" :width="selectedSide.area.width"></rect>
          <g>
            <template v-if="dragging && selectedElement">
              <text>{{round(selectedElement.y + selectedElement.height + 1)}}</text>
              <line v-if="round(selectedElement.y + (selectedElement.height / 2)) === 150" x1="-2000" x2="2000" y1="149.3281075025" y2="149.3281075025" stroke="#fff" stroke-width="1" vector-effect="non-scaling-stroke"></line>
              <line v-if="round(selectedElement.y) === 0" x1="-2000" x2="2000" y1="0" y2="0" stroke="#fff" stroke-width="1" vector-effect="non-scaling-stroke"></line>
              <line v-if="round(selectedElement.y + selectedElement.height + 1) === selectedSide.area.height" x1="-2000" x2="2000" :y1="selectedSide.area.height" :y2="selectedSide.area.height" stroke="#fff" stroke-width="1" vector-effect="non-scaling-stroke"></line>
              <line v-if="round(selectedElement.x + (selectedElement.width / 2)) === selectedSide.area.width/2" :x1="selectedSide.area.width/2" :x2="selectedSide.area.width/2" y1="-2000" y2="2000" stroke="#fff" stroke-width="1" vector-effect="non-scaling-stroke"></line>
              <line v-if="round(selectedElement.x) === 0" x1="0" x2="0" y1="-2000" y2="2000" stroke="#fff" stroke-width="1" vector-effect="non-scaling-stroke"></line>
              <line v-if="round(selectedElement.x + selectedElement.width + 1) === selectedSide.area.width" :x1="selectedSide.area.width" :x2="selectedSide.area.width" y1="-2000" y2="2000" stroke="#fff" stroke-width="1" vector-effect="non-scaling-stroke"></line>
            </template>
          </g>


          <g
                  v-for="(item, index) in items"
                  ref="gElement"
                  :key="index"
                  :id="'group-'+index"
                  :transform="'translate('+item.x+', '+item.y+') rotate('+item.rotate+' '+item.width/2+' '+item.height/2+')'"
                  @mousedown="onMouseDown($event,item)"
          >
            <rect x="0" y="0" :width="item.width" :height="item.height" fill="transparent"></rect>
            <text
                    v-if="item.type=='text'"
                    :x="getTextXPosition(item)"
                    :y="'1em'"
                    :font-size="item.fontSize"
                    :font-family="item.font"
                    :font-weight="item.bold ? 'bold' : 'normal'"
                    :font-style="item.italic ? 'italic' : 'normal'"
                    :fill="item.color"
                    :text-anchor="item.textAnchor"
            >

              <tspan v-bind:key="index" v-for="(text, index) in item.text" :x="getTextXPosition(item)" :dy="index && '1em'">{{text}}</tspan>
            </text>
            <g v-if="selectedElement === item">
              <rect
                      :x="0"
                      :y="0"
                      :width="item.width"
                      :height="item.height"
                      class="ctrl-bounds"
              />
              <g fill="#fff" font-size="40px">
                <text v-if="dragging">X: {{round(item.x)}} Y: {{round(item.y)}}</text>
                <text v-if="rotation">{{round(item.rotate)}}&#176;</text>
                <text v-if="scaling">H: {{round(item.height)}} W: {{round(item.width)}}</text>
              </g>
              <g>
                <rect
                        class="ctrl-rect rotate"
                        :width="tools.squaresize"
                        :height="tools.squaresize"
                        :x="item.width"
                        :y="0-tools.squaresize"
                        @mousedown="onMouseDown($event,item, CONSTRUCTOR_HANDLES.ROTATE)"
                />
                <rect
                        class="ctrl-rect remove"
                        @click="removeActiveItem()"
                        :width="tools.squaresize"
                        :height="tools.squaresize"
                        :x="0-tools.squaresize"
                        :y="item.height"
                />
                <rect
                        class="ctrl-rect scale"
                        :width="tools.squaresize"
                        :height="tools.squaresize"
                        :x="item.width"
                        :y="item.height"
                        @mousedown="onMouseDown($event,item, CONSTRUCTOR_HANDLES.SCALE)"
                />
              </g>
            </g>
          </g>
        </g>

      </svg>
    </div>
  </div>
</template>

<script>

import {TEXT_ALIGNMENT, CONSTRUCTOR_HANDLES} from '../consts';
const defaultProps = {
    hex: "#fff",
    a: 1
};

export default {
    data() {
        return {
            TEXT_ALIGNMENT,
            CONSTRUCTOR_HANDLES,

            width: 800,
            height: 800,
            colors: defaultProps,
            onChangeColorListener: null,
            showcolors: false,
            movetarget: null,
            activeItemIndex: null,
            tools: {
                squaresize: 20,
                min_height: 10
            },
            svg: null,
            editableAreaEl: null,
            dragging: false,
            rotation: false,
            scaling: false
        };
    },
    watch: {
        addText: function (val) {
            if (val) {
                this.addTextField();
                this.$store.commit("addText", false);
            }
        },
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'setItemsConstructor') {
                this.updateSizes();
            }
            if (mutation.type === 'updateElementSize') {
                this.updateSizes();
            }
        })
    },
    computed: {
        addText() {
            return this.$store.state.addText;
        },
        selectedProduct() {
            return this.$store.state.selectedProduct;
        },
        selectedSide() {
            return this.$store.state.constructor.selectedSide;
        },
        items() {
            return this.$store.state.constructor.items;
        },
        selectedElement() {
            return this.$store.state.constructor.selectedElement
        }
    },
  methods: {
      onChange(val) {
          if (this.onChangeColorListener) {
              this.colors = val;
              this.onChangeColorListener();
          }
      },
      getTextXPosition(item) {
          if (item.textAnchor === TEXT_ALIGNMENT.END) {
              return item.width;
          }
          if (item.textAnchor === TEXT_ALIGNMENT.MIDDLE) {
              return item.width / 2;
          }
          return 0;
      },
      round(value) {
          return Math.round(value);
      },
      resetSelected() {
          this.$store.commit('setSelectedElement', null);
      },
      onMouseDown(eDown, item, handle) {
          eDown.stopPropagation();

          this.$store.commit('setSelectedElement', item);
          this.$store.commit("setItemsConstructor", this.items);

          const rect = this.editableAreaEl.getBoundingClientRect();
          const o = {x: rect.left + item.x + (item.width / 2), y: rect.top + item.y + (item.height / 2) };

          const edRect = this.editableAreaEl.getBoundingClientRect();
          const elRect = this.selectedElement.node.children[0].getBoundingClientRect();

          item.drag = {
              x:        item.x,
              y:        item.y,
              mx:       eDown.x,
              my:       eDown.y,
              w:        item.width,
              h:        item.height,
              angle:    item.rotate,
              oX:       o.x,
              oY:       o.y,
              left:     elRect.left - edRect.left,
              right:    elRect.right - edRect.left,
              top:      elRect.top - edRect.top,
              bottom:   elRect.bottom - edRect.top
          };

          if (!handle) {
              this.dragging = true;
          }
          if (handle === CONSTRUCTOR_HANDLES.ROTATE) {
              this.rotation = true;
          }
          if (handle === CONSTRUCTOR_HANDLES.SCALE) {
              this.scaling = true;
          }

          document.onmouseup = () => {
              this.dragging = false;
              this.rotation = false;
              this.scaling = false;
              document.onmousemove = null;
          };
          document.onmousemove = (event) => {
              if (!handle) {
                  const elRect = this.selectedElement.node.children[0].getBoundingClientRect();

                  // Границы после перемещения мышкой
                  const left = item.drag.left - ((event.x - item.drag.mx) * -1);
                  const right = item.drag.right - ((event.x - item.drag.mx) * -1);
                  const top = item.drag.top - ((event.y - item.drag.my) * -1);
                  const bottom = item.drag.bottom - ((event.y - item.drag.my) * -1);

                  // Границы реального объекта на момент перемещения
                  const boundLeft = elRect.left - edRect.left;
                  const boundRight = elRect.right - edRect.left;
                  const boundTop = elRect.top - edRect.top;
                  const boundBottom = elRect.bottom - edRect.top;

                  if (left < 0) {
                      item.x -= boundLeft;
                  }
                  if (right > edRect.width) {
                      item.x += edRect.width - boundRight - 1;
                  }
                  if (left > 0 && right < edRect.width) {
                      item.x = event.x - item.drag.mx + item.drag.x;
                  }

                  if (top < 0) {
                      item.y -= boundTop;
                  }
                  if (bottom > edRect.height) {
                      item.y += edRect.height - boundBottom - 1;
                  }
                  if (top > 0 && bottom < edRect.height) {
                      item.y = event.y - item.drag.my + item.drag.y;
                  }

                  // # Вариант 2 - с границами и проверкой точкой на линии
                  // const elRect = this.$refs.gElement[0].children[0].getBoundingClientRect();
                  // const pointIntersectLine = (P, lineP1, lineP2) => {
                  //     const x1 = lineP1.x;
                  //     const y1 = lineP1.y;
                  //     const x2 = lineP2.x;
                  //     const y2 = lineP2.y;
                  //
                  //     let dx1 = x2 - x1;
                  //     let dy1 = y2 - y1;
                  //
                  //     dx = P.x - x1;
                  //     dy = P.y - y1;
                  //
                  //     return dx1 * dy - dx * dy1;
                  // };
                  //
                  // const left    = item.drag.left - ((event.x - item.drag.mx) * -1);
                  // const right   = item.drag.right - ((event.x - item.drag.mx) * -1);
                  // const top     = item.drag.top - ((event.y - item.drag.my) * -1);
                  // const bottom  = item.drag.bottom - ((event.y - item.drag.my) * -1);
                  //
                  // last.left    = elRect.left - edRect.left;
                  // last.right   = elRect.right - edRect.left;
                  // last.top     = elRect.top - edRect.top;
                  // last.bottom  = elRect.bottom - edRect.top;
                  //
                  // const lS = pointIntersectLine({x: left, y: top}, {x: 0, y: 0}, {x: 0, y: edRect.height});
                  // const bS = pointIntersectLine({x: right, y: bottom}, {x: 0, y: edRect.height}, {x: edRect.width, y: edRect.height});
                  // const tS = pointIntersectLine({x: right, y: top}, {x: 0, y: 0}, {x: edRect.width, y: 0});
                  // const rS = pointIntersectLine({x: right, y: top}, {x: edRect.width, y: 0}, {x: edRect.width, y: edRect.height});
                  //
                  // if (bS > 0) {
                  //     item.y = item.y + edRect.height - last.bottom - 1;
                  // }
                  // if (tS < 0) {
                  //     item.y = item.y - last.top + 1;
                  // }
                  // if (bS < 0 && tS > 0) {
                  //     item.y = event.y - item.drag.my + item.drag.y;
                  // }
                  //
                  // if (lS > 0) {
                  //     item.x = item.x - last.left + 1;
                  // }
                  // if (rS < 0) {
                  //     item.x = item.x + edRect.width - last.right - 1;
                  // }
                  // if (lS < 0 && rS > 0) {
                  //     item.x = event.x - item.drag.mx + item.drag.x;
                  // }

                  // # Вариант 3 - Без границ
                  // item.x = Math.round(
                  //     Math.min(Math.max(event.x - item.drag.mx + item.drag.x, 0), this.selectedArea.width - item.width)
                  // );
                  // item.y = Math.round(
                  //     Math.min(Math.max(event.y - item.drag.my + item.drag.y, 0), this.selectedArea.width - item.height)
                  // );
              }
              if (handle === CONSTRUCTOR_HANDLES.ROTATE) {
                  const startAngle = item.drag.angle - (Math.atan2(item.drag.my - item.drag.oY, item.drag.mx - item.drag.oX) * (180 / Math.PI));

                  var dx = event.x - item.drag.oX,
                      dy = event.y - item.drag.oY,
                      angle = (Math.atan2(dy, dx) * (180 / Math.PI));

                  const newAngle = angle + startAngle < 0 ? 360 - Math.abs(angle + startAngle) : angle + startAngle;
                  item.rotate = newAngle % 359;
              }
              if (handle === CONSTRUCTOR_HANDLES.SCALE) {
                  let centerToDot = Math.sqrt(Math.pow(item.drag.oX - item.drag.mx, 2) + Math.pow(item.drag.oY - item.drag.my, 2));
                  let distance = Math.sqrt(Math.pow(event.clientX - item.drag.oX, 2) + Math.pow(event.clientY - item.drag.oY, 2));

                  // console.log(distance, centerToDot);

                  // TODO Не знаю почему 1.95, но оно неплохо работает
                  distance = (distance - centerToDot) * 1.95; // * (distance / centerToDot) ??? fix

                  let coefX = item.drag.h / item.drag.w;
                  item.width = item.drag.w + distance;
                  item.height = item.drag.h + distance * coefX;
                  item.x = Math.round(item.drag.x + (distance * -1) / 2);
                  item.y = Math.round(item.drag.y + (distance * -1 * coefX) / 2);

                  item.fontSize = item.height / item.text.length;
              }
          }
      },
      toggleColor() {
          this.showcolors = !this.showcolors;
      },

      addTextField() {
          const textField = this.createTextField();
          this.$store.commit("addItemToConstructor", textField);
          setTimeout(() => {
              textField.node = this.$refs.gElement[this.$refs.gElement.length - 1];
          });
          /// add to store
          // this.items.push(this.createTextField());
      },
      createTextField() {
          return {
              type: "text",
              textAnchor: "end",
              active: false,
              x: ((this.items.length + 2) % 20) * 20,
              y: ((this.items.length + 2) % 20) * 20,
              text: ["HELLO"],
              width: 30,
              height: 20,
              font: "Arial",
              fontSize: 20,
              node: null,
              color: this.colors.hex || "#000",

              bold: false,
              italic: false,

              rotate: 0,
              o: {
                  x: 0,
                  y: 0
              }
          };
      },
      updateSizes() {
        setTimeout(() => {
            const tSpans = this.selectedElement.node.querySelectorAll('text tspan');
            const widths = Array.from(tSpans).map(x => x.getComputedTextLength());
            const maxWidth = Math.max(...widths);
            this.selectedElement.height = this.selectedElement.fontSize * this.selectedElement.text.length;
            this.selectedElement.width = maxWidth;
        });
      },

    // onClickItem(event, item) {
    //   event.stopPropagation(); //prevent parent from firing
    //   if (item.active) {
    //     return;
    //   }
    //
    //   this.$store.commit('setSelectedElement', item);
    //
    //   // select item if not selected
    //   this.deactivateItems();
    //   item.active = true;
    //   this.onChangeColorListener = function() {
    //     item.color = this.colors.hex;
    //   };
    //   this.colors = defaultProps;
    //   this.colors.hex = item.color;
    //   this.activeItemIndex = this.items.indexOf(item);
    //   this.$store.commit("setItemsConstructor", this.items);
    // },

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

      removeActiveItem() {
          if (this.selectedElement) {
              this.items.splice(this.items.indexOf(this.selectedElement), 1);
              this.$store.commit("setItemsConstructor", this.items);
          }
      },

      onKeyUp(event) {
          if (event.key === "Delete") {
              this.removeActiveItem();
          }
          return event.preventDefault();
      },
  },
  mounted() {
      this.svg = document.querySelector('.constructor svg');
      this.editableAreaEl = document.querySelector('.constructor svg #editable-area');
      window.addEventListener("keyup", this.onKeyUp);
  }
};
var swapArrayElements = function (arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
};
</script>

<style lang="scss" scoped>
  .constructor {
    /*border: dashed 1px gray;*/
    /*margin-right: 150px;*/
    /*width: 500px;*/
    /*height: 500px;*/

    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    height: 85vh;
    width: 100vw;
  }

  svg {
    width: auto;
    height: 80vh;
    align-self: center;

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
      stroke: #fff;
      stroke-width: 1;
      stroke-linecap: round;
    }
  }
</style>