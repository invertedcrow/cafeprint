<template>
  <div class="main">
    <div class="constructor" :style="{borderColor: base.color}">
      <svg
        id="editor"
        :viewBox="'0 0 '+width+' '+height"
        :width="500"
        :height="500"
        @mousedown="resetSelected"
      >
        <defs>
          <mask id="mainMask" v-html="side.svg_area" maskUnits="userSpaceOnUse" />
        </defs>
        <!-- <polygon v-if="sideArea.tag == 'polygon'" id="mainMask" class="area" :points="sideArea.points" /> -->
        <image
          v-bind:xlink:href="baseImg"
          :x="image.x"
          :y="image.y"
          :width="image.width"
          :height="image.height"
        />
        <g v-html="side.svg_area" />

        <polygon
          id="editable-area"
          v-if="sideArea.tag == 'polygon'"
          class="area"
          :points="sideArea.points"
        />
        <g :transform="'translate('+sideArea.x+', '+sideArea.y+')'">
          <rect
            v-if="sideArea.tag == 'rect'"
            id="editable-area"
            fill="none"
            vector-effect="non-scaling-stroke"
            stroke-width="2"
            :stroke="dragging || rotation || scaling ? '#007bff' : selectedElement ?  'white' : 'none'"
            :height="sideArea.height"
            :width="sideArea.width"
          />

          <g>
            <template v-if="dragging && selectedElement">
              <line
                v-if="lines.centerH"
                x1="-2000"
                x2="2000"
                :y1="sideArea.height / 2"
                :y2="sideArea.height / 2"
                stroke="#007bff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
              <line
                v-if="lines.top"
                x1="-2000"
                x2="2000"
                y1="0"
                y2="0"
                stroke="#007bff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
              <line
                v-if="lines.bottom"
                x1="-2000"
                x2="2000"
                :y1="sideArea.height"
                :y2="sideArea.height"
                stroke="#007bff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
              <line
                v-if="lines.centerV"
                :x1="sideArea.width/2"
                :x2="sideArea.width/2"
                y1="-2000"
                y2="2000"
                stroke="#007bff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
              <line
                v-if="lines.left"
                x1="0"
                x2="0"
                y1="-2000"
                y2="2000"
                stroke="#007bff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
              <line
                v-if="lines.right"
                :x1="sideArea.width"
                :x2="sideArea.width"
                y1="-2000"
                y2="2000"
                stroke="#007bff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
            </template>
          </g>

          <g v-if="selectedLayers.length">
            <rect
              :x="groupParams.x"
              :y="groupParams.y"
              :width="groupParams.width"
              :height="groupParams.height"
              class="ctrl-bounds group-bound"
            />
            <g>
              <g
                @mousedown="onMouseDownGroup($event, selectedLayers, CONSTRUCTOR_HANDLES.ROTATE)"
                :transform="'translate('+(groupParams.x + groupParams.width+1)+' '+(groupParams.y - tools.squaresize)+')'"
              >
                <rect class="ctrl-rect" :width="tools.squaresize" :height="tools.squaresize" />
                <svg
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="ctrl-icon"
                  width="15px"
                  height="18px"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  x="4px"
                  y="3px"
                  viewBox="0 0 76.398 76.398"
                  style="enable-background:new 0 0 76.398 76.398;"
                  xml:space="preserve"
                >
                  <path
                    d="M58.828,16.208l-3.686,4.735c7.944,6.182,11.908,16.191,10.345,26.123C63.121,62.112,48.954,72.432,33.908,70.06   C18.863,67.69,8.547,53.522,10.912,38.477c1.146-7.289,5.063-13.694,11.028-18.037c5.207-3.79,11.433-5.613,17.776-5.252   l-5.187,5.442l3.848,3.671l8.188-8.596l0.002,0.003l3.668-3.852L46.39,8.188l-0.002,0.001L37.795,0l-3.671,3.852l5.6,5.334   c-7.613-0.36-15.065,1.853-21.316,6.403c-7.26,5.286-12.027,13.083-13.423,21.956c-2.879,18.313,9.676,35.558,27.989,38.442   c1.763,0.277,3.514,0.411,5.245,0.411c16.254-0.001,30.591-11.85,33.195-28.4C73.317,35.911,68.494,23.73,58.828,16.208z"
                  />
                </svg>
              </g>

              <g
                @mousedown="onMouseDownGroup($event, selectedLayers, CONSTRUCTOR_HANDLES.SCALE)"
                :transform="'translate('+(groupParams.x + groupParams.width+1)+' '+(groupParams.y + groupParams.height +1)+')'"
              >
                <rect class="ctrl-rect" :width="tools.squaresize" :height="tools.squaresize" />
                <svg
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="ctrl-icon"
                  width="15px"
                  height="15px"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  x="5px"
                  y="5px"
                  viewBox="0 0 472.774 472.774"
                  xml:space="preserve"
                >
                  <polygon
                    transform="rotate(45 236.387 236.387)"
                    points="377.06,140.665 356.462,161.198 417.11,221.845 55.664,221.845 116.279,161.222     95.706,140.657 0,236.387 95.698,332.101 116.287,311.576 55.664,250.929 417.102,250.929 356.471,311.544 377.044,332.117     472.774,236.387   "
                  />
                  <polygon
                    transform="rotate(-45 236.387 236.387)"
                    points="377.06,140.665 356.462,161.198 417.11,221.845 55.664,221.845 116.279,161.222     95.706,140.657 0,236.387 95.698,332.101 116.287,311.576 55.664,250.929 417.102,250.929 356.471,311.544 377.044,332.117     472.774,236.387   "
                  />
                </svg>
              </g>
            </g>
          </g>
          <g v-for="(item, index) in items" :key="index">
            <g
              ref="groupEls"
              :id="'group-'+index"
              :transform="'translate('+item.x+', '+item.y+') rotate('+item.rotate+' '+item.width/2+' '+item.height/2+')'"
              @mousedown="onMouseDown($event,item)"
            >
              <rect x="0" y="0" :width="item.width" :height="item.height" fill="transparent" />

              <g>
                <text
                  v-bind:key="index"
                  v-for="(text, index) in item.text"
                  :x="getTextXPosition(item)"
                  :y="'0.9em'"
                  :dy="index + 'em'"
                  :opacity="base.layers_opacity"
                  :font-family="item.font.name"
                  :font-size="item.fontSize"
                  :text-anchor="item.textAnchor"
                  :font-weight="item.bold ? 'bold' : 'normal'"
                  :font-style="item.italic ? 'italic' : 'normal'"
                  :fill="item.color"
                  :textLength="item.textAnchor === TextAlignment.JUSTIFIED ? item.width : 0"
                >{{text}}</text>
              </g>

              <image
                v-if="item.type=='img'"
                :xlink:href="imgUrl(item.url)"
                :x="0"
                :y="0"
                :opacity="base.layers_opacity"
                :height="item.height"
                :width="item.width"
              />

              <g v-if="selectedElement === item && !selectedLayers.length">
                <rect :x="0" :y="0" :width="item.width" :height="item.height" class="ctrl-bounds" />
                <g fill="#fff" font-size="40px">
                  <text v-if="dragging">X: {{round(item.x)}} Y: {{round(item.y)}}</text>
                  <text v-if="rotation">{{round(item.rotate)}}&#176;</text>
                  <text v-if="scaling">H: {{round(item.height)}} W: {{round(item.width)}}</text>
                </g>
                <g>
                  <g
                    @mousedown="onMouseDown($event,item, CONSTRUCTOR_HANDLES.ROTATE)"
                    :transform="'translate('+(item.width+1)+' '+(-1-tools.squaresize)+')'"
                  >
                    <rect class="ctrl-rect" :width="tools.squaresize" :height="tools.squaresize" />
                    <svg
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      class="ctrl-icon"
                      width="15px"
                      height="18px"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      x="4px"
                      y="3px"
                      viewBox="0 0 76.398 76.398"
                      style="enable-background:new 0 0 76.398 76.398;"
                      xml:space="preserve"
                    >
                      <path
                        d="M58.828,16.208l-3.686,4.735c7.944,6.182,11.908,16.191,10.345,26.123C63.121,62.112,48.954,72.432,33.908,70.06   C18.863,67.69,8.547,53.522,10.912,38.477c1.146-7.289,5.063-13.694,11.028-18.037c5.207-3.79,11.433-5.613,17.776-5.252   l-5.187,5.442l3.848,3.671l8.188-8.596l0.002,0.003l3.668-3.852L46.39,8.188l-0.002,0.001L37.795,0l-3.671,3.852l5.6,5.334   c-7.613-0.36-15.065,1.853-21.316,6.403c-7.26,5.286-12.027,13.083-13.423,21.956c-2.879,18.313,9.676,35.558,27.989,38.442   c1.763,0.277,3.514,0.411,5.245,0.411c16.254-0.001,30.591-11.85,33.195-28.4C73.317,35.911,68.494,23.73,58.828,16.208z"
                      />
                    </svg>
                  </g>
                  <g
                    @click="removeActiveItem()"
                    :transform="'translate('+(-1-tools.squaresize)+' '+(item.height+1)+')'"
                  >
                    <rect class="ctrl-rect" :width="tools.squaresize" :height="tools.squaresize" />
                    <svg
                      class="ctrl-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      height="17px"
                      viewBox="-18 0 511 512"
                      width="15px"
                      fill="#757575"
                      x="4px"
                      y="3px"
                    >
                      <path
                        d="m454.5 76c-6.28125 0-110.601562 0-117 0v-56c0-11.046875-8.953125-20-20-20h-160c-11.046875 0-20 8.953125-20 20v56c-6.398438 0-110.703125 0-117 0-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h37v376c0 11.046875 8.953125 20 20 20h320c11.046875 0 20-8.953125 20-20v-376h37c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm-277-36h120v36h-120zm200 432h-280v-356h280zm-173.332031-300v244c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-244c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm106.664062 0v244c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-244c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm0 0"
                      />
                    </svg>
                  </g>

                  <g
                    @mousedown="onMouseDown($event,item, CONSTRUCTOR_HANDLES.SCALE)"
                    :transform="'translate('+(item.width+1)+' '+(item.height+1)+')'"
                  >
                    <rect class="ctrl-rect" :width="tools.squaresize" :height="tools.squaresize" />
                    <svg
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      class="ctrl-icon"
                      width="15px"
                      height="15px"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      x="5px"
                      y="5px"
                      viewBox="0 0 472.774 472.774"
                      xml:space="preserve"
                    >
                      <polygon
                        transform="rotate(-45 236.387 236.387)"
                        points="377.06,140.665 356.462,161.198 417.11,221.845 55.664,221.845 116.279,161.222     95.706,140.657 0,236.387 95.698,332.101 116.287,311.576 55.664,250.929 417.102,250.929 356.471,311.544 377.044,332.117     472.774,236.387   "
                      />
                    </svg>
                  </g>
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
import {TextAlignment, CONSTRUCTOR_HANDLES, Sidebar, API_URL} from '../consts';
import { mapGetters, mapMutations } from 'vuex';
import {UPDATE_ELEMENT_SIZE} from "../eventBus.type";
import {CONSTRUCTOR_DELETE_ITEM, CONSTRUCTOR_SET_ITEMS, CONSTRUCTOR_ADD_ITEM, CONSTRUCTOR_SET_SELECTED_ITEM, CONSTRUCTOR_SET_PRINT_SIZE} from "../store/mutations.type";
const defaultProps = {
    hex: "#fff",
    a: 1
};

const SCALE = 1.5;

export default {
    data() {
        return {
            sideArea: {
              width: 0,
              height: 0,
              x: 0,
              y: 0  
            },
            currSize: null,
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
            scale: 0,

            image: {
              x: 0,
              y: 0,
              width: 500,
              height: 500
            },
            prevState: {
                side: null,
                image: null
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
        size: function(val) {   
          if(this.currSize) {
             let diff = Math.min(+this.currSize.width/+val.width, +this.currSize.height/+val.height)
            if(+this.currSize.width > +val.width) {
                diff = Math.max(+this.currSize.width/+val.width, +this.currSize.height/+val.height)
            }
           
            this.resizeAllLayers(diff);
          }
          this.currSize = val
        },
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
        },
        side: function(val) {
          // TODO: finish polygon mask 
          

          let element = new DOMParser().parseFromString(val.svg_area, "text/xml");
          this.sideArea.tag = element.documentElement.tagName;
         
          if(this.sideArea.tag == 'rect') {
            this.sideArea.width = element.documentElement.getAttribute('width');
            this.sideArea.height = element.documentElement.getAttribute('height');
            this.sideArea.x = element.documentElement.getAttribute('x');
            this.sideArea.y = element.documentElement.getAttribute('y');
          } else if (this.sideArea.tag == 'polygon') {
              this.sideArea.points = element.documentElement.getAttribute('points');
            
              const arr = this.sideArea.points.split(' ');
              let arrX = [], arrY = [];
              arr.forEach((item) => {
                let temp = item.split(',')
                arrX.push(+temp[0]);
                arrY.push(+temp[1]);
              })
              this.sideArea.x = Math.min(...arrX);
              this.sideArea.y = Math.min(...arrY);
              this.sideArea.width = Math.max(...arrX) - Math.min(...arrX)
              this.sideArea.height = Math.max(...arrY) - Math.min(...arrY)

          }

        }
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === CONSTRUCTOR_SET_ITEMS) {
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
        ...mapGetters(["selectedElement", "items", "side", "base", "selectedLayers", "baseImg", "size"]),
        addText() {
            return this.$store.state.addText;
        },
        addImg() {
            return this.$store.state.addImg
        },  
        groupParams() {            
             const items = this.selectedLayers;
            
             if(!items.length) {
                 return null
             }         

             let arrX = items.map(item => item.x)
             let arrY = items.map(item => item.y)    
             let arrW = items.map(item => item.width)
             let arrH = items.map(item => item.height)           
             const params = {
                x: Math.min(...arrX),
                y: Math.min(...arrY),
                width: Math.max(...arrW),
                height: Math.max(...arrH),
             };
            
            items.forEach((item, i) => {  
                if(item.x > params.x && (item.x - params.x + item.width) > params.width) {
                   params.width = item.x - params.x + item.width
                }                 
                if(item.y > params.y && (item.y - params.y + item.height) > params.height) {
                   params.height = item.y - params.y + item.height                }
            })     
                  
          return params     
        },  
        lastLayer() {
            return this.selectedLayers[this.selectedLayers.length - 1]
        }      
    },
  methods: {   
      ...mapMutations([CONSTRUCTOR_SET_ITEMS, CONSTRUCTOR_ADD_ITEM, CONSTRUCTOR_SET_SELECTED_ITEM]),  
      imgUrl(url) {
        return API_URL + "/" + url
      },
       checkPrintSize() {
          let printSize = {name: ''};         
          const printsSizes = this.base.printSizes;
          const items = this.items;
        
          if(!items.length) {
              return null
          }       

          let arrX = items.map(item => item.x)
          let arrY = items.map(item => item.y)    
          let arrW = items.map(item => item.width)
          let arrH = items.map(item => item.height)           
          const itemsParams = {
            x: Math.min(...arrX),
            y: Math.min(...arrY),
            width: Math.max(...arrW),
            height: Math.max(...arrH),
          };
        
        items.forEach((item, i) => {  
            if(item.x > itemsParams.x && (item.x - itemsParams.x + item.width) > itemsParams.width) {
                itemsParams.width = +item.x - +itemsParams.x + +item.width              
            }                 
            if(item.y > itemsParams.y && (item.y - itemsParams.y + item.height) > itemsParams.height) {
                itemsParams.height = item.y - itemsParams.y + item.height                }
        })   
        
        const realItemsWidth = itemsParams.width/this.sideArea.width*this.side.real_width;
        const realItemsHeight = itemsParams.height/this.sideArea.height*this.side.real_height; 
        printsSizes.forEach((size) => {
          if(realItemsHeight <= size.real_height &&  realItemsWidth <= size.real_width) {
            printSize = size;
          }
        })
        this.$store.commit(CONSTRUCTOR_SET_PRINT_SIZE, printSize)
      },
      resizeAllLayers(diff) {       
          let arr = [...this.items]
          arr.forEach((item) => {             
              const diff_before = (item.width - 500)/2
              item.width = +item.width*diff;
              item.height = +item.height*diff;
               const diff_current = (item.width - 500)/2
              item.x = item.x + diff_before - diff_current;
              item.y = item.y + diff_before - diff_current;
            
          
            if(item.type == 'text') {
              item.fontSize = Math.floor(+item.height);              
            }
            
          });
        
          this.$store.commit(CONSTRUCTOR_SET_ITEMS, arr)
      },
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
          this.items.forEach(item => item.selected = false);       
          this.$store.commit(CONSTRUCTOR_SET_ITEMS, this.items);
          this.$store.commit(CONSTRUCTOR_SET_SELECTED_ITEM, null);
          this.$store.commit('setActiveSidebar', Sidebar.PRODUCT);
      },  


/// TODO: finish resizing 

      onMouseDownGroup(eDown, items, handle) {
      
          eDown.stopPropagation();
          items.forEach((item, i) => {
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
          });
          document.onmouseup = () => {
              this.dragging = false;
              this.rotation = false;
              this.scaling = false;
              document.onmousemove = null;
          };
        document.onmousemove = (event) => {  
            
           this.selectedLayers.forEach((item, index) => {                
              if (!handle) {
                  this.hideLines();
                  const elBounds = selectedElementNode.querySelector('rect').getBoundingClientRect();

                  const left    = item.drag.left - ((event.x - item.drag.mx) * -1);
                  const right   = item.drag.right - ((event.x - item.drag.mx) * -1);
                  const top     = item.drag.top - ((event.y - item.drag.my) * -1);
                  const bottom  = item.drag.bottom - ((event.y - item.drag.my) * -1);

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

                  const centerX = (this.sideArea.width) / 2;
                  const centerY = (this.sideArea.height) / 2;
                  const oX = (left + right) / 2;
                  const oY = (top + bottom) / 2;

                  if (oY > centerY - 5 && oY < centerY + 5) {
                      item.y = centerY - (item.height / 2);
                      this.lines.centerH = true;
                  }

                  if (oX > centerX - 5 && oX < centerX + 5) {
                      item.x = centerX - (item.width / 2);
                      this.lines.centerV = true;
                  }
                 
                  if (bottom > centerY - 5 && bottom < centerY + 5) {
                      item.y = centerY - (bottom - top) + (item.drag.y - item.drag.top);
                      this.lines.centerH = true;
                  }
                 
                  if (top > centerY - 5 && top < centerY + 5) {
                      item.y = centerY + (bottom - top) + (item.drag.y - item.drag.bottom);
                      this.lines.centerH = true;
                  }
                
                  if (left > centerX - 5 && left < centerX + 5) {
                      item.x = centerX + (right - left) + (item.drag.x - item.drag.right);
                      this.lines.centerV = true;
                  }

                  if (right > centerX - 5 && right < centerX + 5) {
                      item.x = centerX - (right - left) + (item.drag.x - item.drag.left);
                      this.lines.centerV = true;
                  }

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
                 
                  let centerToDot = Math.sqrt(Math.pow(item.drag.oX - item.drag.mx, 2));// + Math.pow(item.drag.oY - item.drag.my, 2));
                  let distance    = Math.sqrt(Math.pow(event.clientX - item.drag.oX, 2)); //+ Math.pow(event.clientY - item.drag.oY, 2));

                
                  distance = (distance - centerToDot) * 1.95;
                 
                 
              
                  const ratio   = item.drag.h / item.drag.w;        
                  item.width    = item.drag.w + item.drag.w*distance/100,
                  item.height   = item.drag.h + item.drag.h*distance/100,
                  item.x        = item.drag.x + item.drag.x*distance/100,
                  item.y        = item.drag.y + item.drag.y*distance/100,
                  item.fontSize = item.fontSize ? item.height / item.text.length : null;
                  
              }
              })
          }          
      },  
      
      


      onMouseDown(eDown, item, handle) {        
               
          eDown.stopPropagation();
          
          this.$store.commit(CONSTRUCTOR_SET_SELECTED_ITEM, item);
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

                  const centerX = (this.sideArea.width) / 2;
                  const centerY = (this.sideArea.height) / 2;
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
                  // const centerX = (this.sideArea.width - strokeWidth) / 2;
                  // const centerY = (this.sideArea.height - strokeWidth) / 2;
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
                 
                  if(item.type == 'text') {
                    item.fontSize = item.height / item.text.length;
                  }
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
          this.$store.commit(CONSTRUCTOR_SET_SELECTED_ITEM, item);
          this.$store.commit(CONSTRUCTOR_ADD_ITEM, item);
          eventBus.$emit(UPDATE_ELEMENT_SIZE);
      },
      addImgField(file) {
          const item = this.createImgField(file);
          this.$store.commit(CONSTRUCTOR_SET_SELECTED_ITEM, item);
          this.$store.commit(CONSTRUCTOR_ADD_ITEM, item);
      },
      createTextField() {       
          return {
              side: this.side.id,
              sideName: this.side.name,
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
              selected: false,
              o: {
                  x: 0,
                  y: 0
              }
          };
      },
      createImgField(file) {
          return {
              side: this.side.id,
              sideName: this.side.name,
              type: "img",            
              x: ((this.items.length + 2) % 20) * 20,
              y: ((this.items.length + 2) % 20) * 20,             
              width: 150,//file.width/file.height * 200,
              url: file,
              height: 150,//200,
              node: null,
              rotate: 0,
              o: {
                  x: 0,
                  y: 0
              },
              selected: false,
          };
      },
      updateSizes() {        
        setTimeout(() => {
            const index     = this.items.indexOf(this.selectedElement);
            const tSpans    = document.querySelectorAll(`#group-${index} g > text`);
            const widths    = Array.from(tSpans).map(x => x.getComputedTextLength());
            const maxWidth  = Math.max(...widths);
              if(this.selectedElement && this.selectedElement.fontSize) {
                  this.selectedElement.height   = this.selectedElement.fontSize * this.selectedElement.text.length;
              }
            if(this.selectedElement) {
               this.selectedElement.width    = maxWidth;
            }
           
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
      resetScale() {
          if (!this.prevState.image || !this.prevState.side) {
              return;
          }

          this.image.x                      = this.prevState.image.x;
          this.image.y                      = this.prevState.image.y;
          this.image.width                  = this.prevState.image.width;
          this.image.height                 = this.prevState.image.height;

          this.selectedSide.area.x          = this.prevState.side.x;
          this.selectedSide.area.y          = this.prevState.side.y;
          this.selectedSide.area.width      = this.prevState.side.width;
          this.selectedSide.area.height     = this.prevState.side.height;

          this.prevState.image              = null;
          this.prevState.side               = null;

          this.items.map(item => {
              item.x        /= SCALE;
              item.y        /= SCALE;
              item.fontSize /= SCALE;
              item.width    /= SCALE;
              item.height   /= SCALE;
              return item;
          });

          this.scale = 0;
      }
  },
  mounted() {   
      this.currSize = this.size
      this.svg = document.querySelector('#editor');
      const svgBounds = this.svg.getBoundingClientRect();
      this.width = svgBounds.width;
      this.height = svgBounds.height;

      eventBus.$on(UPDATE_ELEMENT_SIZE, () => {
          this.updateSizes();
      });

      eventBus.$on('scaleChanged', sign => {
        if (sign === '-') {
            if (this.scale !== SCALE) {
                return;
            }

            this.resetScale();
        } else {
            if (this.scale !== 0) {
                return;
            }

            this.prevState.image    = {x: this.image.x, y: this.image.y, height: this.image.height, width: this.image.width};
            this.prevState.side     = {x: this.selectedSide.area.x, y: this.selectedSide.area.y, height: this.selectedSide.area.height, width: this.selectedSide.area.width};

            this.selectedSide.area.width    *= SCALE;
            this.selectedSide.area.height   *= SCALE;

            const freeCenterX                    = (this.width - this.selectedSide.area.width) / 2;
            const freeCenterY                    = (this.height - this.selectedSide.area.height) / 2;

            const prevAreaX = this.selectedSide.area.x;
            const prevAreaY = this.selectedSide.area.y;

            this.selectedSide.area.x    *= freeCenterX / this.selectedSide.area.x;
            this.selectedSide.area.y    *= freeCenterY / this.selectedSide.area.y;

            const areaX = this.selectedSide.area.x;
            const areaY = this.selectedSide.area.y;

            this.image.height   *= SCALE;
            this.image.width    *= SCALE;
            this.image.x        -= prevAreaX * SCALE - areaX ;
            this.image.y        -= prevAreaY * SCALE - areaY;

            this.items.map(item => {
                item.width      *= SCALE;
                item.height     *= SCALE;
                item.fontSize   *= SCALE;
                item.x          *= SCALE;
                item.y          *= SCALE;
                return item;
            });

            this.scale = SCALE;
        }
      });

      this.editableAreaEl = document.querySelector('.constructor #editor #editable-area');
      window.addEventListener("keyup", this.onKeyUp);
      window.addEventListener("mousemove", this.checkPrintSize)
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