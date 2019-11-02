<template>
  <div class="main">
    <div class="constructor" :style="{borderColor: selectedProduct.color}">
      <svg id="editor" :viewBox="'0 0 '+width+' '+height" :width="width" :height="height" @mousedown="resetSelected">
        <rect fill="none" :width="width" :height="height"></rect>
        <image
                v-bind:xlink:href="selectedSide.image"
                :x="image.x" :y="image.y" :width="image.width" :height="image.height"
        ></image>

        <g :transform="'translate('+selectedSide.area.x+', '+selectedSide.area.y+')'">
          <rect id="editable-area" fill="none" vector-effect="non-scaling-stroke" stroke-width="2" :stroke="dragging || rotation || scaling ? '#007bff' : selectedElement ?  'white' : 'none'" :height="selectedSide.area.height" :width="selectedSide.area.width"></rect>
          <g>
            <template v-if="dragging && selectedElement">
              <line v-if="lines.centerH" x1="-2000" x2="2000" :y1="selectedSide.area.height / 2" :y2="selectedSide.area.height / 2" stroke="#007bff" stroke-width="1" vector-effect="non-scaling-stroke"></line>
              <line v-if="lines.top" x1="-2000" x2="2000" y1="0" y2="0" stroke="#007bff" stroke-width="1" vector-effect="non-scaling-stroke"></line>
              <line v-if="lines.bottom" x1="-2000" x2="2000" :y1="selectedSide.area.height" :y2="selectedSide.area.height" stroke="#007bff" stroke-width="1" vector-effect="non-scaling-stroke"></line>
              <line v-if="lines.centerV" :x1="selectedSide.area.width/2" :x2="selectedSide.area.width/2" y1="-2000" y2="2000" stroke="#007bff" stroke-width="1" vector-effect="non-scaling-stroke"></line>
              <line v-if="lines.left" x1="0" x2="0" y1="-2000" y2="2000" stroke="#007bff" stroke-width="1" vector-effect="non-scaling-stroke"></line>
              <line v-if="lines.right" :x1="selectedSide.area.width" :x2="selectedSide.area.width" y1="-2000" y2="2000" stroke="#007bff" stroke-width="1" vector-effect="non-scaling-stroke"></line>
            </template>
          </g>


          <g
                  v-for="(item, index) in items"
                  ref="groupEls"
                  :key="index"
                  :id="'group-'+index"
                  :transform="'translate('+item.x+', '+item.y+') rotate('+item.rotate+' '+item.width/2+' '+item.height/2+')'"
                  @mousedown="onMouseDown($event,item)"
          >
            <rect x="0" y="0" :width="item.width" :height="item.height" fill="transparent"></rect>

            <g>
            <text
                    v-bind:key="index"
                    v-for="(text, index) in item.text"
                    :x="getTextXPosition(item)"
                    :y="'0.9em'"
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

            <!--<text-->
                    <!--v-if="item.type=='text'"-->
                    <!--:x="getTextXPosition(item)"-->
                    <!--:y="'1em'"-->
                    <!--:font-size="item.fontSize"-->
                    <!--:font-family="item.font"-->
                    <!--:font-weight="item.bold ? 'bold' : 'normal'"-->
                    <!--:font-style="item.italic ? 'italic' : 'normal'"-->
                    <!--:fill="item.color"-->
                    <!--:text-anchor="item.textAnchor"-->
            <!--&gt;-->

              <!--<tspan v-bind:key="index" v-for="(text, index) in item.text" :x="getTextXPosition(item)" :dy="index && '1em'">{{text}}</tspan>-->
            <!--</text>-->
                         
            <image v-if="item.type=='img'" v-bind:xlink:href="item.file.dataURL" :x="0" :y="0" :height="item.height" :width="item.width" />
            
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
                    <g @mousedown="onMouseDown($event,item, CONSTRUCTOR_HANDLES.ROTATE)" :transform="'translate('+(item.width+1)+' '+(-1-tools.squaresize)+')'">
                        <rect class="ctrl-rect" :width="tools.squaresize" :height="tools.squaresize"/>
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="ctrl-icon" width="15px" height="18px" xmlns="http://www.w3.org/2000/svg" version="1.1" x="4px" y="3px" viewBox="0 0 76.398 76.398" style="enable-background:new 0 0 76.398 76.398;" xml:space="preserve">
	                        <path d="M58.828,16.208l-3.686,4.735c7.944,6.182,11.908,16.191,10.345,26.123C63.121,62.112,48.954,72.432,33.908,70.06   C18.863,67.69,8.547,53.522,10.912,38.477c1.146-7.289,5.063-13.694,11.028-18.037c5.207-3.79,11.433-5.613,17.776-5.252   l-5.187,5.442l3.848,3.671l8.188-8.596l0.002,0.003l3.668-3.852L46.39,8.188l-0.002,0.001L37.795,0l-3.671,3.852l5.6,5.334   c-7.613-0.36-15.065,1.853-21.316,6.403c-7.26,5.286-12.027,13.083-13.423,21.956c-2.879,18.313,9.676,35.558,27.989,38.442   c1.763,0.277,3.514,0.411,5.245,0.411c16.254-0.001,30.591-11.85,33.195-28.4C73.317,35.911,68.494,23.73,58.828,16.208z"/>
                        </svg>
                    </g>
                    <g @click="removeActiveItem()" :transform="'translate('+(-1-tools.squaresize)+' '+(item.height+1)+')'">
                        <rect class="ctrl-rect" :width="tools.squaresize" :height="tools.squaresize" />
                        <svg class="ctrl-icon" xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="-18 0 511 512" width="15px" fill="#757575" x="4px" y="3px">
                            <path d="m454.5 76c-6.28125 0-110.601562 0-117 0v-56c0-11.046875-8.953125-20-20-20h-160c-11.046875 0-20 8.953125-20 20v56c-6.398438 0-110.703125 0-117 0-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h37v376c0 11.046875 8.953125 20 20 20h320c11.046875 0 20-8.953125 20-20v-376h37c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm-277-36h120v36h-120zm200 432h-280v-356h280zm-173.332031-300v244c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-244c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm106.664062 0v244c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-244c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm0 0"/>
                        </svg>
                    </g>

                  <g @mousedown="onMouseDown($event,item, CONSTRUCTOR_HANDLES.SCALE)" :transform="'translate('+(item.width+1)+' '+(item.height+1)+')'">
                      <rect class="ctrl-rect" :width="tools.squaresize" :height="tools.squaresize"/>
                      <svg xmlns:xlink="http://www.w3.org/1999/xlink" class="ctrl-icon" width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" version="1.1" x="5px" y="5px" viewBox="0 0 472.774 472.774" xml:space="preserve">
		                    <polygon transform="rotate(-45 236.387 236.387)" points="377.06,140.665 356.462,161.198 417.11,221.845 55.664,221.845 116.279,161.222     95.706,140.657 0,236.387 95.698,332.101 116.287,311.576 55.664,250.929 417.102,250.929 356.471,311.544 377.044,332.117     472.774,236.387   "/>
                      </svg>
                  </g>
              </g>
            </g>
          </g>
        </g>

      </svg>
    </div>
  </div>
</template>

<script>

import {eventBus} from '../main';
import {TextAlignment, CONSTRUCTOR_HANDLES, Sidebar} from '../consts';
import {UPDATE_ELEMENT_SIZE} from "../eventBus.type";
import {CONSTRUCTOR_DELETE_ITEM} from "../store/mutations.type";
const defaultProps = {
    hex: "#fff",
    a: 1
};

export default {
    data() {
        return {
            TextAlignment,
            CONSTRUCTOR_HANDLES,

            width: 736,
            height: 736,
            colors: defaultProps,
            onChangeColorListener: null,
            showcolors: false,
            movetarget: null,
            activeItemIndex: null,
            tools: {
                squaresize: 24,
                min_height: 10
            },
            svg: null,
            editableAreaEl: null,
            dragging: false,
            rotation: false,
            scaling: false,

            image: {
              x: 0,
              y: 0,
              width: 500,
              height: 500
            },
            lines: {
                top: false,
                bottom: false,
                right: false,
                left: false,
                centerH: false,
                centerV: false,
            }
        };
    },
    watch: {
        addText: function (val) {
            if (val) {
                this.addTextField();
                this.$store.commit("addText", false);
            }
        },
        addImg: function (val)  {            
            if (val) {
                this.addImgField(val);
                this.$store.commit("addImg", null);
            }
        }
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'setItemsConstructor') {
                this.updateSizes();
            }
            if (mutation.type === 'setSelectedSide') {
                setTimeout(() => {
                    this.editableAreaEl = document.querySelector('.constructor #editor #editable-area');
                });
            }
        })
    },
    computed: {
        addText() {
            return this.$store.state.addText;
        },
        addImg() {
            return this.$store.state.addImg
        },
        selectedProduct() {
            return this.$store.state.constructor;
        },
        selectedSide() {
            return this.$store.getters.selectedSide;
        },
        items() {
            return this.$store.getters.items;
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
          if (item.textAnchor === TextAlignment.END) {
              return item.width;
          }
          if (item.textAnchor === TextAlignment.MIDDLE) {
              return item.width / 2;
          }
          return 0;
      },
      round(value) {
          return Math.round(value);
      },
      resetSelected() {
          this.$store.commit('setSelectedElement', null);
          this.$store.commit('setActiveSidebar', Sidebar.PRODUCT);
      },
      onMouseDown(eDown, item, handle) {
          eDown.stopPropagation();

          this.$store.commit('setSelectedElement', item);
          if (item.type === 'text') {
              this.$store.commit('setActiveSidebar', Sidebar.TEXT);
          }

          const selectedElementIndex  = this.items.indexOf(item);
          const selectedElementNode   = document.querySelector(`#group-${selectedElementIndex}`);

          const edBounds              = this.editableAreaEl.getBoundingClientRect();
          const elBounds              = selectedElementNode.querySelector('rect').getBoundingClientRect();

          const o = {x: edBounds.left + item.x + (item.width / 2), y: edBounds.top + item.y + (item.height / 2) };

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
              left:     elBounds.left - edBounds.left,
              right:    elBounds.right - edBounds.left,
              top:      elBounds.top - edBounds.top,
              bottom:   elBounds.bottom - edBounds.top
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
                  this.hideLines();
                  const elBounds = selectedElementNode.querySelector('rect').getBoundingClientRect();

                  // Границы после перемещения мышкой. Зависит от положения мышки.
                  const left    = item.drag.left - ((event.x - item.drag.mx) * -1);
                  const right   = item.drag.right - ((event.x - item.drag.mx) * -1);
                  const top     = item.drag.top - ((event.y - item.drag.my) * -1);
                  const bottom  = item.drag.bottom - ((event.y - item.drag.my) * -1);

                  // Границы реального объекта на момент перемещения. Не зависит от положения мышки.
                  const boundLeft   = elBounds.left - edBounds.left;
                  const boundRight  = elBounds.right - edBounds.left;
                  const boundTop    = elBounds.top - edBounds.top;
                  const boundBottom = elBounds.bottom - edBounds.top;

                  if (left < 0) {
                      item.x -= boundLeft;
                      this.lines.left = true;
                  }
                  if (right > edBounds.width) {
                      item.x += edBounds.width - boundRight - 1;
                      this.lines.right = true;
                  }
                  if (left > 0 && right < edBounds.width) {
                      item.x = event.x - item.drag.mx + item.drag.x;
                  }

                  if (top < 0) {
                      item.y -= boundTop;
                      this.lines.top = true;
                  }
                  if (bottom > edBounds.height) {
                      item.y += edBounds.height - boundBottom - 1;
                      this.lines.bottom = bottom;
                  }
                  if (top > 0 && bottom < edBounds.height) {
                      item.y = event.y - item.drag.my + item.drag.y;
                  }

                  const centerX = (this.selectedSide.area.width) / 2;
                  const centerY = (this.selectedSide.area.height) / 2;
                  // const centerY = (edBounds.height - strokeWidth)/ 2;
                  const oX = (left + right) / 2;
                  const oY = (top + bottom) / 2;

                  // Прилипание к центральным линиям
                  if (oY > centerY - 5 && oY < centerY + 5) {
                      item.y = centerY - (item.height / 2);
                      this.lines.centerH = true;
                  }

                  if (oX > centerX - 5 && oX < centerX + 5) {
                      item.x = centerX - (item.width / 2);
                      this.lines.centerV = true;
                  }

                  // Верх и горизонтальный центр
                  if (bottom > centerY - 5 && bottom < centerY + 5) {
                      item.y = centerY - (bottom - top) + (item.drag.y - item.drag.top);
                      this.lines.centerH = true;
                  }

                  // Низ и горизонтальный центр
                  if (top > centerY - 5 && top < centerY + 5) {
                      item.y = centerY + (bottom - top) + (item.drag.y - item.drag.bottom);
                      this.lines.centerH = true;
                  }

                  // Лево и вертикальный центр
                  if (left > centerX - 5 && left < centerX + 5) {
                      item.x = centerX + (right - left) + (item.drag.x - item.drag.right);
                      this.lines.centerV = true;
                  }

                  // Право и вертикальный центр
                  if (right > centerX - 5 && right < centerX + 5) {
                      item.x = centerX - (right - left) + (item.drag.x - item.drag.left);
                      this.lines.centerV = true;
                  }

                  // const strokeWidth = 4;
                  // const centerX = (this.selectedSide.area.width - strokeWidth) / 2;
                  // const centerY = (this.selectedSide.area.height - strokeWidth) / 2;
                  // const oX = (left + right) / 2;
                  // const oY = (top + bottom) / 2;

                  // if (Math.round(top) === centerY) {
                  //     this.lines.centerH = true;
                  // }
                  // if (oY > centerY - 15 && oY < centerY + 15) {
                  //     this.lines.centerH = true;
                  // }

                  // if (item.x + (item.width / 2) > centerX - 15 && item.x + (item.width / 2) < centerX + 15) {
                  //     item.x = centerX - (item.width / 2);
                  //     this.lines.centerV = true;
                  // }
                  // if (item.y + (item.height / 2) > centerY - 15 && item.y + (item.height / 2) < centerY + 15) {
                  //     item.y = centerY - (item.height / 2);
                  //     this.lines.centerH = true;
                  // }

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
                  let distance    = Math.sqrt(Math.pow(event.clientX - item.drag.oX, 2) + Math.pow(event.clientY - item.drag.oY, 2));

                  // TODO Не знаю почему 1.95, но оно неплохо работает
                  distance = (distance - centerToDot) * 1.95; // * (distance / centerToDot) ??? fix

                  const ratio   = item.drag.h / item.drag.w;
                  item.width    = item.drag.w + distance;
                  item.height   = item.drag.h + distance * ratio;
                  item.x        = item.drag.x + (distance * -1) / 2;
                  item.y        = item.drag.y + (distance * -1 * ratio) / 2;
                  item.fontSize = item.height / item.text.length;
              }
          }
      },
      hideLines() {
          this.lines.left     = false;
          this.lines.right    = false;
          this.lines.top      = false;
          this.lines.bottom   = false;
          this.lines.centerH  = false;
          this.lines.centerV  = false;
      },
      toggleColor() {
          this.showcolors = !this.showcolors;
      },

      addTextField() {
          const item = this.createTextField();
          this.$store.commit('setSelectedElement', item);
          this.$store.commit("addItemToConstructor", item);
          eventBus.$emit(UPDATE_ELEMENT_SIZE);
      },
      addImgField(file) {
          const item = this.createImgField(file);
          this.$store.commit('setSelectedElement', item);
          this.$store.commit("addItemToConstructor", item);
      },
      createTextField() {
          return {
              side: this.selectedSide.key,
              type: "text",
              textAnchor: "start",
              x: ((this.items.length + 2) % 20) * 20,
              y: ((this.items.length + 2) % 20) * 20,
              text: ["Your text here"],
              width: 124,
              height: 25,
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
      createImgField(file) {
          return {
              side: this.selectedSide.key,
              type: "img",            
              x: ((this.items.length + 2) % 20) * 20,
              y: ((this.items.length + 2) % 20) * 20,             
              width: file.width/file.height * 200,
              file: file,
              height: 200,
              node: null,
              rotate: 0,
              o: {
                  x: 0,
                  y: 0
              }
          };
      },
      updateSizes() {
        setTimeout(() => {
            const index     = this.items.indexOf(this.selectedElement);
            const tSpans    = document.querySelectorAll(`#group-${index} g > text`);
            const widths    = Array.from(tSpans).map(x => x.getComputedTextLength());
            const maxWidth  = Math.max(...widths);

            this.selectedElement.height   = this.selectedElement.fontSize * this.selectedElement.text.length;
            this.selectedElement.width    = maxWidth;
        });
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

      removeActiveItem() {
          if (this.selectedElement) {
              this.$store.commit(CONSTRUCTOR_DELETE_ITEM, this.selectedElement);
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
      this.svg = document.querySelector('#editor');
      const svgBounds = this.svg.getBoundingClientRect();
      this.width = svgBounds.width;
      this.height = svgBounds.height;

      eventBus.$on(UPDATE_ELEMENT_SIZE, () => {
          this.updateSizes();
      });

      eventBus.$on('scaleChanged', sign => {


        const sideOx = this.selectedSide.area.x + (this.selectedSide.area.width / 2);
        const ratioLR = ((this.image.width - 4)  / 2) / sideOx; // 1.028 / 0.972
        const ratioTB = (this.image.height - (this.selectedSide.area.y + this.selectedSide.area.height)) / this.selectedSide.area.y;

        // const t = this.selectedSide.area.x + 

        // w = 210
        // x = 138
        // scale = 1.5
        // nW = 315
        // nX = 92.5

        // 138 / 1.5 * (((side.width - image.width) / 2) / (side.width * 1.5 - image.width * 1.5) / 2))

        // console.log(ratioLR);
        // console.log(sideOx);
        // console.log(this.image.width  / 2);
        // бол на мен

        // console.log(ratioTB);
        
        const scale = 1.5;

        const r = ((this.image.width - this.selectedSide.area.width) / 2) / ((this.image.width - this.selectedSide.area.width * 1.5) / 2);
        console.log(r);

        const distance = 250;
        if (sign === '-') {
          this.image.x = 0;
          this.image.y = 0;
          this.image.width = 500;
          this.image.height = 500;
          this.selectedSide.area.x = 138; // 138 -> ||| <- 152
          this.selectedSide.area.y = 124.966;
          this.selectedSide.area.width = 210;
          this.selectedSide.area.height = 300;
          // this.items.map(item => {
          //   item.x *= 1.5;
          //   item.y *= 1.5;
          //   item.width /= 1.5;
          //   item.height /= 1.5;
          //   return item;
          // });
        } else {
          this.image.x *= 0.670289;
          // this.image.x += (distance * -1) / 2;
          this.image.y += (distance * -1) / 2;
          this.image.width += distance;
          this.image.height += distance;
          this.selectedSide.area.x = this.selectedSide.area.x / scale * r;
          this.selectedSide.area.y = (this.selectedSide.area.y / scale) * ratioTB;
          this.selectedSide.area.width *= scale;
          this.selectedSide.area.height *= scale;

          // const sideOx = this.selectedSide.area.width / 2;
          const sideOy = this.selectedSide.area.height / 2;
          const oX = this.selectedSide.area.x + (this.selectedSide.area.width / 2);
          const oY = this.selectedSide.area.y + (this.selectedSide.area.height / 2);
          const newW = this.selectedSide.area.width * scale;
          const newH = this.selectedSide.area.height * scale;

          // console.log(oX);

          console.log(this.selectedSide.area.x);
          this.items.map(item => {
            item.x = (item.x / scale) * ratioLR;
            item.y = (item.y / scale) * ratioTB;
            item.width *= scale;
            item.height *= scale;            
            return item;
          });                       
        }
      })

      this.editableAreaEl = document.querySelector('.constructor #editor #editable-area');
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

    /*display: flex;*/
    /*flex: 1 1 auto;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    /*height: 85vh;*/
    /*width: 100vw;*/
  }

  #editor {
    width: 500px;
    height: 500px;
    /*width: auto;*/
    /*height: 80vh;*/
    /*align-self: center;*/

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
      /*stroke: #000;*/
      /*stroke-width: 1;*/
      &:hover {
        cursor: pointer;
      }
    }
      .ctrl-icon {
          fill: #757575;
      }
    .ctrl-bounds {
      fill-opacity: 0;
      stroke: #a4a7ae;
      stroke-width: 1;
      stroke-linecap: round;
    }
  }
</style>