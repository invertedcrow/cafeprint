<template>
  <div
    :style="{width: `${scaleWidth}%`, marginLeft: `${scaleMargin}%`}"
    class="main d-flex justify-content-center"
  >
    <div
      v-if="!isValid"
      class="main__alert-message"
    >Размер принта превышает допустимый размер печати.</div>
    <div class="constructor">
      <svg
        id="editor"
        :viewBox="'0 0 500 500'"
        :width="500"
        :height="500"
        :style="{'touch-action': itemTouch ? 'none' : 'auto'}"
        @mousedown="resetSelected"
        @touchstart="resetSelected"
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
        <g
          id="maskRect"
          v-html="side.svg_area"
          :class="{'area-white': color && color.color && color.color.includes('000')}"
        />

        <g>
          <polygon
            id="editable-area"
            v-if="sideArea.tag == 'polygon'"
            fill="none"
            :points="sideArea.points"
          />
          <rect
            v-if="sideArea.tag == 'rect'"
            id="editable-area"
            :x="sideArea.x"
            :y="sideArea.y"
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
                :y1="+sideArea.y + +sideArea.height / 2"
                :y2="+sideArea.y + +sideArea.height / 2"
                stroke="#007bff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
              <line
                v-if="lines.top"
                x1="-2000"
                x2="2000"
                :y1="+sideArea.y"
                :y2="+sideArea.y"
                stroke="#007bff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
              <line
                v-if="lines.bottom"
                x1="-2000"
                x2="2000"
                :y1="+sideArea.height + +sideArea.y"
                :y2="+sideArea.height + +sideArea.y"
                stroke="#007bff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
              <line
                v-if="lines.centerV"
                :x1="+sideArea.x + +sideArea.width/2"
                :x2="+sideArea.x + +sideArea.width/2"
                y1="-2000"
                y2="2000"
                stroke="#007bff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
              <line
                v-if="lines.left"
                :x1="+sideArea.x"
                :x2="+sideArea.x"
                y1="-2000"
                y2="2000"
                stroke="#007bff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
              <line
                v-if="lines.right"
                :x1="+sideArea.x + +sideArea.width"
                :x2="+sideArea.x + +sideArea.width"
                y1="-2000"
                y2="2000"
                stroke="#007bff"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
            </template>
          </g>

          <svg :x="0" :y="0" viewBox="0 0 500 500" width="500" height="500">
            <template v-for="(item, index) in sideItems">
              <!-- <g v-for="(item, index) in sideItems" :key="index" mask="url(#mainMask)"> -->
              <g :key="'r' + side.id + index" :transform="item.matrix ? item.matrix : ''">
                <svg
                  v-if="item"
                  :key="'q' + side.id + index"
                  :height="item.height"
                  :width="item.width"
                  :x="item.x"
                  :y="item.y"
                  :opacity="0.15"
                  :style="{'overflow': item.type=='text' ? 'visible' : 'hidden'}"
                >
                  <template v-if="item.type=='text'">
                    <text
                      :font-family="item.font.name"
                      :font-size="item.fontSize"
                      :text-anchor="item.textAnchor"
                      :font-weight="item.bold ? 'bold' : 'normal'"
                      :font-style="item.italic ? 'italic' : 'normal'"
                      :fill="item.color"
                      overflow="visible"
                      dominant-baseline="text-before-edge"
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
                  </template>
                  <image
                    v-if="item.type=='img'"
                    :xlink:href="item.url ? imgUrl(item.url) : item.dataUrl"
                    :x="0"
                    :y="0"
                    :height="item.height"
                    :width="item.width"
                    @load="item.spinner = false"
                  />
                </svg>
                <rect
                  v-if="item.invalid"
                  :x="item.x"
                  :y="item.y"
                  :width="item.width"
                  :height="item.height"
                  class="ctrl-bounds"
                  :class="{invalid: item.invalid}"
                />
              </g>
              <g
                :key="index"
                :transform="item.matrix ? item.matrix : ''"
                v-if="selectedElement === item && !selectedLayers.length"
              >
                <rect
                  :x="item.x"
                  :y="item.y"
                  :width="item.width"
                  :height="item.height"
                  class="ctrl-bounds"
                />
                <g
                  fill="#5e6a7d"
                  font-size="12px"
                  :transform="'translate('+item.x+', '+(+item.y - 5)+')'"
                >
                  <!-- <text v-if="dragging">X: {{round(item.x)}} Y: {{round(item.y)}}</text> -->
                  <text v-if="rotation">{{round(item.rotate)}}&#176;</text>
                  <text
                    v-if="item.height > 40 && item.real_height > 0 && !rotation"
                    :transform="'translate(-5 45) ' + 'rotate( -90 0 0)'"
                  >{{round(item.real_height)}} см</text>
                  <text
                    v-if="item.width > 37 && item.real_width > 0 && !rotation"
                  >{{round(item.real_width)}} см</text>
                </g>
                <g>
                  <g
                    @mousedown="onMouseDown($event,item, CONSTRUCTOR_HANDLES.ROTATE)"
                    @touchstart="onMouseDown($event,item, CONSTRUCTOR_HANDLES.ROTATE)"
                    :transform="'translate('+(item.width+1)+' '+(-1-tools.squaresize)+')'"
                  >
                    <rect
                      class="ctrl-rect"
                      :width="tools.squaresize"
                      :x="item.x"
                      :y="item.y"
                      :height="tools.squaresize"
                    />
                    <svg
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      class="ctrl-icon"
                      :width="tools.squaresizeIcon"
                      :height="tools.squaresizeIcon"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      :x="(+item.x + 5)"
                      :y="(+item.y + 3)"
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
                    @touchstart="removeActiveItem()"
                    :transform="'translate('+(-1-tools.squaresize)+' '+(item.height+1)+')'"
                  >
                    <rect
                      class="ctrl-rect"
                      :x="item.x"
                      :y="item.y"
                      :width="tools.squaresize"
                      :height="tools.squaresize"
                    />
                    <svg
                      class="ctrl-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      :height="tools.squaresizeIcon"
                      viewBox="-18 0 511 512"
                      :width="tools.squaresizeIcon"
                      fill="#757575"
                      :x="(+item.x + 5)"
                      :y="(+item.y + 3)"
                    >
                      <path
                        d="m454.5 76c-6.28125 0-110.601562 0-117 0v-56c0-11.046875-8.953125-20-20-20h-160c-11.046875 0-20 8.953125-20 20v56c-6.398438 0-110.703125 0-117 0-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h37v376c0 11.046875 8.953125 20 20 20h320c11.046875 0 20-8.953125 20-20v-376h37c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm-277-36h120v36h-120zm200 432h-280v-356h280zm-173.332031-300v244c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-244c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm106.664062 0v244c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-244c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm0 0"
                      />
                    </svg>
                  </g>

                  <g
                    @mousedown="onMouseDown($event,item, CONSTRUCTOR_HANDLES.SCALE)"
                    @touchstart="onMouseDown($event,item, CONSTRUCTOR_HANDLES.SCALE)"
                    :transform="'translate('+(item.width+1)+' '+(item.height+1)+')'"
                  >
                    <rect
                      class="ctrl-rect"
                      :x="item.x"
                      :y="item.y"
                      :width="tools.squaresize"
                      :height="tools.squaresize"
                    />
                    <svg
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      class="ctrl-icon"
                      :width="tools.squaresizeIcon"
                      :height="tools.squaresizeIcon"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      :x="(+item.x + 5)"
                      :y="(+item.y + 4)"
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
            </template>
            <g v-for="(item, index) in sideItems" :key="index" mask="url(#mainMask)">
              <g
                ref="groupEls"
                :id="'group-'+index"
                :transform="item.matrix ? item.matrix : ''"
                @mousedown="onMouseDown($event,item)"
                @touchstart="onMouseDown($event,item)"
              >
                <rect
                  :x="item.x"
                  :y="item.y"
                  :width="item.width"
                  :height="item.height"
                  fill="transparent"
                />
                <svg
                  :height="item.height"
                  :width="item.width"
                  :x="item.x"
                  :y="item.y"
                  :opacity="base.layers_opacity"
                  :style="{'overflow': item.type=='text' ? 'visible' : 'hidden'}"
                >
                  <template v-if="item.type=='text'">
                    <text
                      :font-family="item.font.name"
                      :font-size="item.fontSize"
                      :text-anchor="item.textAnchor"
                      :font-weight="item.bold ? 'bold' : 'normal'"
                      :font-style="item.italic ? 'italic' : 'normal'"
                      :fill="item.color"
                      overflow="visible"
                      dominant-baseline="text-before-edge"
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
                  </template>

                  <image
                    v-if="item.type=='img'"
                    :xlink:href="item.url ? imgUrl(item.url) : item.dataUrl"
                    :x="0"
                    :y="0"
                    :height="item.height"
                    :width="item.width"
                    @load="item.spinner = false"
                  />

                  <svg
                    v-if="item.type=='img' && item.spinner == true"
                    :x="(item.width/2 - 20)"
                    :y="(item.height/2 - 20)"
                    width="40"
                    height="40"
                    viewBox="0 0 38 38"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                        <stop stop-color="#72b425" stop-opacity="0" offset="0%" />
                        <stop stop-color="#72b425" stop-opacity=".631" offset="63.146%" />
                        <stop stop-color="#72b425" offset="100%" />
                      </linearGradient>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                      <g transform="translate(1 1)">
                        <path
                          d="M36 18c0-9.94-8.06-18-18-18"
                          id="Oval-2"
                          stroke="url(#a)"
                          stroke-width="2"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                          />
                        </path>
                        <circle fill="#fff" cx="36" cy="18" r="1">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    </g>
                  </svg>
                </svg>
                <g v-if="selectedElement === item && !selectedLayers.length">
                  <rect
                    :x="item.x"
                    :y="item.y"
                    :width="item.width"
                    :height="item.height"
                    class="ctrl-bounds"
                  />
                  <g
                    fill="#5e6a7d"
                    font-size="12px"
                    :transform="'translate('+item.x+', '+(+item.y - 5)+')'"
                  >
                    <!-- <text v-if="dragging">X: {{round(item.x)}} Y: {{round(item.y)}}</text> -->
                    <text v-if="rotation">{{round(item.rotate)}}&#176;</text>
                    <text
                      v-if="item.height > 40 && item.real_height > 0 && !rotation"
                      :transform="'translate(-5 45) ' + 'rotate( -90 0 0)'"
                    >{{round(item.real_height)}} см</text>
                    <text
                      v-if="item.width > 37 && item.real_width > 0 && !rotation"
                    >{{round(item.real_width)}} см</text>
                  </g>
                  <g>
                    <g
                      @mousedown="onMouseDown($event,item, CONSTRUCTOR_HANDLES.ROTATE)"
                      @touchstart="onMouseDown($event,item, CONSTRUCTOR_HANDLES.ROTATE)"
                      :transform="'translate('+(item.width+1)+' '+(-1-tools.squaresize)+')'"
                    >
                      <rect
                        class="ctrl-rect"
                        :width="tools.squaresize"
                        :x="item.x"
                        :y="item.y"
                        :height="tools.squaresize"
                      />
                      <svg
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        class="ctrl-icon"
                        :width="tools.squaresizeIcon"
                        :height="tools.squaresizeIcon"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        :x="(+item.x + 5)"
                        :y="(+item.y + 3)"
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
                      @touchstart="removeActiveItem()"
                      :transform="'translate('+(-1-tools.squaresize)+' '+(item.height+1)+')'"
                    >
                      <rect
                        class="ctrl-rect"
                        :x="item.x"
                        :y="item.y"
                        :width="tools.squaresize"
                        :height="tools.squaresize"
                      />
                      <svg
                        class="ctrl-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        :height="tools.squaresizeIcon"
                        viewBox="-18 0 511 512"
                        :width="tools.squaresizeIcon"
                        fill="#757575"
                        :x="(+item.x + 5)"
                        :y="(+item.y + 3)"
                      >
                        <path
                          d="m454.5 76c-6.28125 0-110.601562 0-117 0v-56c0-11.046875-8.953125-20-20-20h-160c-11.046875 0-20 8.953125-20 20v56c-6.398438 0-110.703125 0-117 0-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h37v376c0 11.046875 8.953125 20 20 20h320c11.046875 0 20-8.953125 20-20v-376h37c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm-277-36h120v36h-120zm200 432h-280v-356h280zm-173.332031-300v244c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-244c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm106.664062 0v244c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-244c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm0 0"
                        />
                      </svg>
                    </g>

                    <g
                      @mousedown="onMouseDown($event,item, CONSTRUCTOR_HANDLES.SCALE)"
                      @touchstart="onMouseDown($event,item, CONSTRUCTOR_HANDLES.SCALE)"
                      :transform="'translate('+(item.width+1)+' '+(item.height+1)+')'"
                    >
                      <rect
                        class="ctrl-rect"
                        :x="item.x"
                        :y="item.y"
                        :width="tools.squaresize"
                        :height="tools.squaresize"
                      />
                      <svg
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        class="ctrl-icon"
                        :width="tools.squaresizeIcon"
                        :height="tools.squaresizeIcon"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        :x="(+item.x + 5)"
                        :y="(+item.y + 4)"
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
                <rect
                  v-if="item.invalid"
                  :x="item.x"
                  :y="item.y"
                  :width="item.width"
                  :height="item.height"
                  class="ctrl-bounds"
                  :class="{invalid: item.invalid}"
                />
              </g>
            </g>
          </svg>
          <g v-if="selectedLayers.length && selectedLayersSide == side.id">
            <rect
              :x="+groupParams.x"
              :y="+groupParams.y"
              :width="groupParams.width"
              :height="groupParams.height"
              class="ctrl-bounds group-bound"
            />
            <g>
              <!-- <g
                @mousedown="onMouseDownGroup($event, selectedLayers, CONSTRUCTOR_HANDLES.ROTATE)"
                @touchstart="onMouseDownGroup($event, selectedLayers, CONSTRUCTOR_HANDLES.ROTATE)"
                :transform="'translate('+(groupParams.x + groupParams.width+1)+' '+(groupParams.y - tools.squaresize)+')'"
              >
                <rect
                  class="ctrl-rect"
                  :x="0"
                  :y="0"
                  :width="tools.squaresize"
                  :height="tools.squaresize"
                />
                <svg
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="ctrl-icon"
                  width="15px"
                  height="18px"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  :x="4"
                  :y="3"
                  viewBox="0 0 76.398 76.398"
                  style="enable-background:new 0 0 76.398 76.398;"
                  xml:space="preserve"
                >
                  <path
                    d="M58.828,16.208l-3.686,4.735c7.944,6.182,11.908,16.191,10.345,26.123C63.121,62.112,48.954,72.432,33.908,70.06   C18.863,67.69,8.547,53.522,10.912,38.477c1.146-7.289,5.063-13.694,11.028-18.037c5.207-3.79,11.433-5.613,17.776-5.252   l-5.187,5.442l3.848,3.671l8.188-8.596l0.002,0.003l3.668-3.852L46.39,8.188l-0.002,0.001L37.795,0l-3.671,3.852l5.6,5.334   c-7.613-0.36-15.065,1.853-21.316,6.403c-7.26,5.286-12.027,13.083-13.423,21.956c-2.879,18.313,9.676,35.558,27.989,38.442   c1.763,0.277,3.514,0.411,5.245,0.411c16.254-0.001,30.591-11.85,33.195-28.4C73.317,35.911,68.494,23.73,58.828,16.208z"
                  />
                </svg>
              </g>-->

              <g
                @mousedown="onMouseDownGroup($event, selectedLayers, CONSTRUCTOR_HANDLES.SCALE)"
                @touchstart="onMouseDownGroup($event, selectedLayers, CONSTRUCTOR_HANDLES.SCALE)"
                :transform="'translate('+(groupParams.x + groupParams.width+1)+' '+(groupParams.y + groupParams.height +1)+')'"
              >
                <rect
                  class="ctrl-rect"
                  :x="0"
                  :y="0"
                  :width="tools.squaresize"
                  :height="tools.squaresize"
                />
                <svg
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="ctrl-icon"
                  :width="tools.squaresizeIcon"
                  :height="tools.squaresizeIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  :x="5"
                  :y="5"
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
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { rotateDEG, toSVG } from "transformation-matrix";
import { eventBus } from "../main";
import {
  TextAlignment,
  CONSTRUCTOR_HANDLES,
  Sidebar,
  API_URL
} from "../consts";
import { mapGetters, mapMutations } from "vuex";
import { UPDATE_ELEMENT_SIZE } from "../eventBus.type";
import {
  CONSTRUCTOR_DELETE_ITEM,
  CONSTRUCTOR_SET_ITEMS,
  CONSTRUCTOR_ADD_ITEM,
  CONSTRUCTOR_SET_SELECTED_ITEM,
  CONSTRUCTOR_SET_PRINT_SIZE,
  CONSTRUCTOR_SET_SIDE_INVALID
} from "../store/mutations.type";
const defaultProps = {
  hex: "#fff",
  a: 1
};

//const SCALE = 1.5;

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
      currBase: null,
      TextAlignment,
      CONSTRUCTOR_HANDLES,
      allItemsParams: null,
      width: 736,
      height: 736,
      colors: defaultProps,
      onChangeColorListener: null,
      showcolors: false,
      movetarget: null,
      activeItemIndex: null,
      svg: null,
      editableAreaEl: null,
      dragging: false,
      rotation: false,
      scaling: false,
      scaleWidth: 100,
      scaleMargin: 0,
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
        centerV: false
      },
      itemTouch: null,
      windowWidth: null
    };
  },
  watch: {
    base: function(val) {
      if (val) {
        if (this.items) {
          setTimeout(() => {
            this.items.map(item => {
              if (this.checkItemPosition(item).invalid) {
                this.$store.commit(CONSTRUCTOR_SET_SIDE_INVALID, {
                  id: item.side,
                  invalid: true
                });
              }
              return this.checkItemPosition(item);
            });
            this.updateSizes();
          });
        }
      }
    },
    size: function(val) {
      if (this.currSize && val) {
        let diff = Math.min(
          +this.currSize.width / +val.width,
          +this.currSize.height / +val.height
        );
        if (+this.currSize.width > +val.width) {
          diff = Math.max(
            +this.currSize.width / +val.width,
            +this.currSize.height / +val.height
          );
        }

        if (
          !this.currBase ||
          (this.currBase && this.currBase.id == this.base.id && diff != 1)
        ) {
          this.resizeAllLayers(diff);
        }
      }
      this.currBase = this.base;
      this.currSize = val;
    },
    addText: function(val) {
      if (val) {
        this.addTextField();
        this.$store.commit("addText", false);
      }
    },
    addImg: function(val) {
      if (val) {
        this.addImgField(val);
        //this.$store.commit("addImg", null);
      }
    },
    side: function(val) {
      // TODO: finish polygon mask

      setTimeout(() => {
        const mask = document.getElementById("maskRect");
        mask.firstChild.setAttribute("fill", "none");
      }, 0);

      let element = new DOMParser().parseFromString(val.svg_area, "text/xml");
      this.sideArea.tag = element.documentElement.tagName;

      this.getRealSideAreaSize();

      if (this.sideArea.tag == "rect") {
        this.sideArea.width = element.documentElement.getAttribute("width");
        this.sideArea.height = element.documentElement.getAttribute("height");
        this.sideArea.x = element.documentElement.getAttribute("x");
        this.sideArea.y = element.documentElement.getAttribute("y");
      } else if (this.sideArea.tag == "polygon") {
        this.sideArea.points = element.documentElement.getAttribute("points");

        const arr = this.sideArea.points.split(" ");
        let arrX = [],
          arrY = [];
        arr.forEach(item => {
          let temp = item.split(",");
          arrX.push(+temp[0]);
          arrY.push(+temp[1]);
        });
        this.sideArea.x = Math.min(...arrX);
        this.sideArea.y = Math.min(...arrY);
        this.sideArea.width = Math.max(...arrX) - Math.min(...arrX);
        this.sideArea.height = Math.max(...arrY) - Math.min(...arrY);
      }
    },
    selectedElement: function(val) {
      if (!val) {
        let emptyItemText = this.items.find(
          item => item.type == "text" && !item.width
        );
        if (emptyItemText) {
          this.$store.commit(CONSTRUCTOR_DELETE_ITEM, emptyItemText);
        }
      }
    }
  },
  created() {
    this.$store.subscribe(mutation => {
      if (mutation.type === CONSTRUCTOR_SET_ITEMS) {
        this.updateSizes();
      }
      if (mutation.type === "setSelectedSide") {
        setTimeout(() => {
          this.editableAreaEl = document.querySelector(
            ".constructor #editor #editable-area"
          );
        });
      }
    });
  },
  computed: {
    ...mapGetters([
      "selectedElement",
      "items",
      "side",
      "base",
      "selectedLayers",
      "baseImg",
      "size",
      "maxPrintSize",
      "color",
      "isValid",
      "selectedLayersSide",
      "baseSizes"
    ]),
    sideItems() {
      return this.filterBySide(this.items);
    },
    tools() {
      return {
        squaresize: this.windowWidth < 768 ? 60 : 24,
        squaresizeIcon: this.windowWidth < 768 ? 50 : 15,
        min_height: 10
      };
    },
    addText() {
      return this.$store.state.addText;
    },
    addImg() {
      return this.$store.state.addImg;
    },
    groupParams() {
      const items = this.selectedLayers;

      if (!items.length) {
        return null;
      }

      let area = this.editableAreaEl.getBoundingClientRect();
      items.forEach(item => {
        const selectedElementIndex = this.sideItems.indexOf(item);
        const selectedElementNode = document.querySelector(
          `#group-${selectedElementIndex}`
        ).parentNode;
        const element = selectedElementNode
          .querySelector("rect")
          .getBoundingClientRect();

        item.el = element;
      });

      let coefToSide = +this.sideArea.width / area.width;

      let arrX = items.map(item => item.el.x);
      let arrY = items.map(item => item.el.y);
      let arrX2 = items.map(item => item.el.x + item.el.width);
      let arrY2 = items.map(item => item.el.y + item.el.height);
      const params = {
        x: (Math.min(...arrX) - area.x) * coefToSide + +this.sideArea.x,
        y: (Math.min(...arrY) - area.y) * coefToSide + +this.sideArea.y,
        width: (Math.max(...arrX2) - Math.min(...arrX)) * coefToSide,
        height: (Math.max(...arrY2) - Math.min(...arrY)) * coefToSide
      };
      return params;
    },
    lastLayer() {
      return this.selectedLayers[this.selectedLayers.length - 1];
    }
  },
  methods: {
    ...mapMutations([
      CONSTRUCTOR_SET_ITEMS,
      CONSTRUCTOR_ADD_ITEM,
      CONSTRUCTOR_SET_SELECTED_ITEM
    ]),
    imgUrl(url) {
      if (url.startsWith("http")) {
        return url;
      }
      let link = API_URL + (url[0] == "/" ? "" : "/") + url;
      return link;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    filterBySide(items) {
      return items.filter(x => x.side == this.side.id) || [];
    },
    isReachMax() {
      if (this.maxPrintSize) {
        return (
          this.allItemsParams.realItemsWidth >= this.maxPrintSize.real_width ||
          this.allItemsParams.realItemsHeight >= this.maxPrintSize.real_height
        );
      }
      return false;
    },
    getRealSideAreaSize() {
      let realSideWidth = this.side.real_width;
      let realSideHeight = this.side.real_height;
      if (this.side.real_for_size_id) {
        let realForSize = this.baseSizes.find(
          item => item.id == this.side.real_for_size_id
        );
        if (realForSize) {
          realSideWidth =
            (this.side.real_width * +this.size.width) / +realForSize.width;
          realSideHeight =
            (this.side.real_height * +this.size.height) / +realForSize.height;
        }
      }
      this.sideArea.real_width = realSideWidth;
      this.sideArea.real_height = realSideHeight;
      this.sideArea.real_for_size_id = this.side.real_for_size_id;
    },
    checkPrintSize() {
      let printSize = { name: "" };
      const printsSizes = this.base.printSizes;
      let items = this.sideItems.slice();

      if (!items.length) {
        if (this.base.sides.length) {
          this.base.sides.forEach(side => {
            this.$store.commit(CONSTRUCTOR_SET_SIDE_INVALID, {
              id: side.id,
              invalid: false
            });
          });
        }

        return null;
      }

      const area = this.editableAreaEl.getBoundingClientRect();

      items.forEach((item, i) => {
        const selectedElementIndex = this.sideItems.indexOf(item);
        const selectedElementNode = document.querySelector(
          `#group-${selectedElementIndex}`
        ).parentNode;
        const element = selectedElementNode
          .querySelector("rect")
          .getBoundingClientRect();
        if (this.size) {
          let coefW = +this.sideArea.width / area.width;
          let coefH = +this.sideArea.height / area.height;
          if (
            element.left < area.left &&
            element.left + element.width < area.left + area.width
          ) {
            item.visibleX = area.left;
            item.invalid = true;
            item.visibleWidth = element.width - (area.left - element.left);

            if (item.visibleWidth < 0) {
              item.visibleX = -1;
            }
          } else if (
            element.left > area.left &&
            element.left + element.width > area.left + area.width
          ) {
            item.visibleX =
              element.left < area.left + area.width ? element.left : -1;
            item.visibleWidth =
              element.width -
              (element.left + element.width - (area.left + area.width));
            item.invalid = true;
          } else if (
            element.left < area.left &&
            element.left + element.width > area.left + area.width
          ) {
            item.visibleX = area.left;
            item.invalid = true;
            item.visibleWidth = area.width;
          } else {
            item.visibleX = element.left;
            item.visibleWidth = element.width;
            item.invalid = false;
          }
          item.real_width =
            ((item.visibleWidth * coefW) / this.sideArea.width) *
            this.sideArea.real_width; // * this.size.width;

          if (
            element.top < area.top &&
            element.top + element.height < area.top + area.height
          ) {
            item.visibleY = area.top;
            item.visibleHeight = element.height - (area.top - element.top);
            item.invalid = true;
            if (item.visibleHeight < 0) {
              item.visibleY = -1;
            }
          } else if (
            element.top > area.top &&
            element.top + element.height > area.top + area.height
          ) {
            item.visibleY =
              element.top < area.top + area.height ? element.top : -1;
            item.visibleHeight =
              element.height -
              (element.top + element.height - (area.top + area.height));
            item.invalid = true;
          } else if (
            element.top < area.top &&
            element.top + element.height > area.top + area.height
          ) {
            item.visibleY = area.top;
            item.visibleHeight = area.height;
            item.invalid = true;
          } else {
            item.visibleY = element.top;
            item.visibleHeight = element.height;
            item.invalid = item.invalid ? true : false;
          }
          item.real_height =
            ((item.visibleHeight * coefH) / this.sideArea.height) *
            this.sideArea.real_height;

          if (item.visibleX == -1 || item.visibleY == -1) {
            items.splice(i, 1);
          }
        }
      });
      let arrX = items.map(item => item.visibleX);
      let arrY = items.map(item => item.visibleY);
      let arrW = items.map(item => item.visibleWidth);
      let arrH = items.map(item => item.visibleHeight);
      let arrX2 = items.map(item => item.visibleX + item.visibleWidth);
      let arrY2 = items.map(item => item.visibleY + item.visibleHeight);

      this.allItemsParams = {
        x: Math.min(...arrX),
        y: Math.min(...arrY),
        width: Math.max(...arrW),
        height: Math.max(...arrH),
        x2: Math.max(...arrX2),
        y2: Math.max(...arrY2)
      };
      if (this.size) {
        if (area.x > this.allItemsParams.x) {
          this.allItemsParams.x = area.x;
        }
        if (area.right < this.allItemsParams.x2) {
          this.allItemsParams.x2 = area.right;
        }

        this.allItemsParams.width =
          this.allItemsParams.x2 - this.allItemsParams.x;

        if (area.y > this.allItemsParams.y) {
          this.allItemsParams.y = area.y;
        }
        if (area.bottom < this.allItemsParams.y2) {
          this.allItemsParams.y2 = area.bottom;
        }
        this.allItemsParams.height =
          this.allItemsParams.y2 - this.allItemsParams.y;

        this.allItemsParams.realItemsWidth =
          (this.allItemsParams.width / area.width) * this.sideArea.real_width;
        this.allItemsParams.realItemsHeight =
          (this.allItemsParams.height / area.height) *
          this.sideArea.real_height;
      }

      printsSizes.forEach(size => {
        let verticalSize = null;
        let horizontalSize = null;
        if (
          this.allItemsParams.realItemsHeight <= size.real_height &&
          this.allItemsParams.realItemsWidth <= size.real_width
        ) {
          verticalSize = size;
        }
        if (
          this.allItemsParams.realItemsHeight <= size.real_width &&
          this.allItemsParams.realItemsWidth <= size.real_height
        ) {
          horizontalSize = size;
        }

        if (verticalSize && horizontalSize) {
          printSize =
            +verticalSize.real_width < +horizontalSize.real_width
              ? verticalSize
              : horizontalSize;
        } else if (verticalSize) {
          printSize = verticalSize;
        } else if (horizontalSize) {
          printSize = horizontalSize;
        }
      });

      if (printSize.id) {
        let oldId = this.side.printSize ? this.side.printSize.id : null;
        if (oldId != printSize.id) {
          this.$store.commit(CONSTRUCTOR_SET_PRINT_SIZE, {
            printSize,
            sideId: this.side.id
          });
        }
        this.$store.commit(CONSTRUCTOR_SET_SIDE_INVALID, {
          id: this.side.id,
          invalid: false
        });
      } else {
        this.$store.commit(CONSTRUCTOR_SET_SIDE_INVALID, {
          id: this.side.id,
          invalid: true
        });
        this.$store.commit(CONSTRUCTOR_SET_PRINT_SIZE, {
          printSize: null,
          sideId: this.side.id
        });
      }
    },
    resizeAllLayers(diff) {
      let arr = [...this.items];
      arr.forEach(item => {
        const diff_before = (item.width - 500) / 2;
        item.width = +item.width * diff;
        item.height = +item.height * diff;
        const diff_current = (item.width - 500) / 2;
        item.x = item.x + diff_before - diff_current;
        item.y = item.y + diff_before - diff_current;

        if (item.type == "text") {
          item.fontSize = Math.floor(+item.height / item.text.length);
        }
      });
      this.$store.commit(CONSTRUCTOR_SET_ITEMS, arr);
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
      if (value) {
        return value.toFixed(1);
      } else {
        return 0;
      }
    },
    resetSelected() {
      this.items.forEach(item => (item.selected = false));

      this.$store.commit(CONSTRUCTOR_SET_ITEMS, this.items);
      this.$store.commit(CONSTRUCTOR_SET_SELECTED_ITEM, null);
      this.$store.commit("setActiveSidebar", Sidebar.PRODUCT);
    },

    /// TODO: finish resizing

    onMouseDownGroup(eDown, items, handle) {
      let isCanMove = true;
      eDown.preventDefault();
      eDown.stopPropagation();

      document.onmouseup = () => {
        if (this.scaling) {
          this.updateSizes();
        }
        this.dragging = false;
        this.rotation = false;
        this.scaling = false;
        document.onmousemove = null;
      };

      document.ontouchend = () => {
        if (this.scaling) {
          this.updateSizes();
        }
        this.dragging = false;
        this.rotation = false;
        this.scaling = false;
        this.itemTouch = null;
        document.ontouchmove = null;
        isCanMove = false;
      };
      items.forEach(item => {
        const selectedElementIndex = this.sideItems.indexOf(item);

        const selectedElementNode = document.querySelector(
          `#group-${selectedElementIndex}`
        );
        if (!selectedElementNode) {
          return;
        }
        const edBounds = this.editableAreaEl.getBoundingClientRect();
        const elBounds = selectedElementNode
          .querySelector("rect")
          .getBoundingClientRect();
        const o = {
          x: edBounds.left + item.width / 2,
          y: edBounds.top + item.height / 2
        };

        item.drag = {
          x: item.x,
          y: item.y,
          mx: eDown.touches ? eDown.touches[0].clientX : eDown.x,
          my: eDown.touches ? eDown.touches[0].clientY : eDown.y,
          w: item.width,
          h: item.height,
          angle: item.rotate,
          oX: o.x,
          oY: o.y,
          left: elBounds.left - edBounds.left,
          right: elBounds.right - edBounds.left,
          top: elBounds.top - edBounds.top,
          bottom: elBounds.bottom - edBounds.top
        };

        document.onmousemove = event => {
          if (!isCanMove) return;
          this.handleMoveGroup(event, handle, selectedElementNode, edBounds);
        };

        document.ontouchmove = event => {
          event.x = event.changedTouches[0].clientX;
          event.y = event.changedTouches[0].clientY;
          event.clientX = event.changedTouches[0].clientX;
          event.clientY = event.changedTouches[0].clientY;
          this.handleMoveGroup(event, handle, selectedElementNode, edBounds);
        };
      });
    },
    handleMoveGroup(event, handle, selectedElementNode, edBounds) {
      this.itemTouch = true;
      let groupCenterY = this.groupParams.y + this.groupParams.height / 2;
      let groupCenterX = this.groupParams.x + this.groupParams.width / 2;
      this.selectedLayers.forEach(item => {
        if (!handle) {
          this.hideLines();
          const elBounds = selectedElementNode
            .querySelector("rect")
            .getBoundingClientRect();

          const left = item.drag.left - (event.x - item.drag.mx) * -1;
          const right = item.drag.right - (event.x - item.drag.mx) * -1;
          const top = item.drag.top - (event.y - item.drag.my) * -1;
          const bottom = item.drag.bottom - (event.y - item.drag.my) * -1;

          const boundLeft = elBounds.left - edBounds.left;
          const boundRight = elBounds.right - edBounds.left;
          const boundTop = elBounds.top - edBounds.top;
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

          const centerX = this.sideArea.width / 2;
          const centerY = this.sideArea.height / 2;
          const oX = (left + right) / 2;
          const oY = (top + bottom) / 2;

          if (oY > centerY - 5 && oY < centerY + 5) {
            item.y = centerY - item.height / 2;
            this.lines.centerH = true;
          }

          if (oX > centerX - 5 && oX < centerX + 5) {
            item.x = centerX - item.width / 2;
            this.lines.centerV = true;
          }

          if (bottom > centerY - 5 && bottom < centerY + 5) {
            item.y = centerY - (bottom - top) + (item.drag.y - item.drag.top);
            this.lines.centerH = true;
          }

          if (top > centerY - 5 && top < centerY + 5) {
            item.y =
              centerY + (bottom - top) + (item.drag.y - item.drag.bottom);
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
          const startAngle =
            item.drag.angle -
            Math.atan2(
              item.drag.my - item.drag.oY,
              item.drag.mx - item.drag.oX
            ) *
              (180 / Math.PI);

          var dx = event.x - item.drag.oX,
            dy = event.y - item.drag.oY,
            angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const newAngle =
            angle + startAngle < 0
              ? 360 - Math.abs(angle + startAngle)
              : angle + startAngle;
          item.rotate = newAngle % 359;
          item.matrix = "1,0,0,1,0,0";

          item.matrix = `matrix(${Math.cos(item.rotate)},${-Math.sin(
            item.rotate
          )},${Math.sin(item.rotate)},${Math.cos(item.rotate)},0,0)`;
          let cX = this.groupParams.x + this.groupParams.width / 2;
          let cY = this.groupParams.y + this.groupParams.height / 2;
          item.matrix = toSVG(rotateDEG(item.rotate, cX, cY));
        }
        if (handle === CONSTRUCTOR_HANDLES.SCALE) {
          if (this.groupParams.width < 20 || this.groupParams.height < 20) {
            return;
          }

          let difCenterBeforeX = (groupCenterX - item.x + item.width / 2) / 2;
          let difCenterBeforeY = (groupCenterY - item.y + item.height / 2) / 2;

          const diff_before_w = item.width / 2;
          const ratio = item.drag.h / item.drag.w;
          item.width = Math.max(item.drag.w + event.x - item.drag.mx, 20);
          item.height = item.width * ratio;

          const diff_current_w = item.width / 2;

          let coefScale = diff_current_w / diff_before_w;

          let difCenterAfterY = difCenterBeforeY * coefScale;
          let difCenterAfterX = difCenterBeforeX * coefScale;
          item.x -= difCenterAfterX - difCenterBeforeX;
          item.y -= difCenterAfterY - difCenterBeforeY;

          if (item.type == "text") {
            item.fontSize *= coefScale;
          }
          item = this.checkItemPosition(item);
        }
      });
      this.checkPrintSize();
    },
    onMouseDown(eDown, item, handle) {
      eDown.preventDefault();
      eDown.stopPropagation();
      let isCanMove = true;
      this.$store.commit(CONSTRUCTOR_SET_SELECTED_ITEM, item);
      if (item.type === "text") {
        this.$store.commit("setActiveSidebar", Sidebar.TEXT);
      } else {
        this.$store.commit("setActiveSidebar", Sidebar.PRODUCT);
      }
      const selectedElementIndex = this.sideItems.indexOf(item);

      const selectedElementNode = document.querySelector(
        `#group-${selectedElementIndex}`
      );
      if (!selectedElementNode) {
        return;
      }
      const edBounds = this.editableAreaEl.getBoundingClientRect();
      const elBounds = selectedElementNode
        .querySelector("rect")
        .getBoundingClientRect();
      const o = {
        x: edBounds.left + item.width / 2,
        y: edBounds.top + item.height / 2
      };
      item.drag = {
        x: !handle ? item.x + item.x * (this.scaleWidth / 100 - 1) : item.x,
        y: !handle ? item.y + item.y * (this.scaleWidth / 100 - 1) : item.y,
        mx: eDown.touches ? eDown.touches[0].clientX : eDown.x,
        my: eDown.touches ? eDown.touches[0].clientY : eDown.y,
        w: item.width,
        h: item.height,
        angle: item.rotate,
        oX: o.x,
        oY: o.y,
        left: elBounds.left - edBounds.left,
        right: elBounds.right - edBounds.left,
        top: elBounds.top - edBounds.top,
        bottom: elBounds.bottom - edBounds.top
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
        if (this.scaling) {
          this.updateSizes();
        }
        this.dragging = false;
        this.rotation = false;
        this.scaling = false;
        document.onmousemove = null;
      };

      document.ontouchend = () => {
        if (this.scaling) {
          this.updateSizes();
        }
        this.dragging = false;
        this.rotation = false;
        this.scaling = false;
        this.itemTouch = null;
        document.ontouchmove = null;
        isCanMove = false;
      };

      document.onmousemove = event => {
        if (!isCanMove) return;
        this.handleMove(
          event,
          item,
          handle,
          selectedElementNode,
          edBounds,
          elBounds
        );
      };

      document.ontouchmove = event => {
        event.x = event.changedTouches[0].clientX;
        event.y = event.changedTouches[0].clientY;
        event.clientX = event.changedTouches[0].clientX;
        event.clientY = event.changedTouches[0].clientY;
        this.handleMove(
          event,
          item,
          handle,
          selectedElementNode,
          edBounds,
          elBounds
        );
      };
    },
    handleMove(event, item, handle, selectedElementNode, edBounds, elBounds) {
      this.itemTouch = true;
      if (!handle) {
        this.hideLines();
        //  const elBounds = selectedElementNode.querySelector('rect').getBoundingClientRect();

        // Границы после перемещения мышкой. Зависит от положения мышки.
        const left = item.drag.left - (event.x - item.drag.mx) * -1;
        const right = item.drag.right - (event.x - item.drag.mx) * -1;
        const top = item.drag.top - (event.y - item.drag.my) * -1;
        const bottom = item.drag.bottom - (event.y - item.drag.my) * -1;

        // Границы реального объекта на момент перемещения. Не зависит от положения мышки.
        //const boundLeft   = elBounds.left - edBounds.left;
        //const boundRight  = elBounds.right - edBounds.left;
        //const boundTop    = elBounds.top - edBounds.top;
        // const boundBottom = elBounds.bottom - edBounds.top;
        // const isMax = this.isReachMax();
        // const all = this.allItemsParams;

        // if((left < all.x || (left > all.x && (left + item.width > all.x + all.width))) && isMax) {
        //   return
        // }
        // if((top < all.y || (top > all.y && (top + item.height > all.y + all.height))) && isMax) {
        //   return
        // }

        item.x =
          (event.x - item.drag.mx) / 1.3 +
          item.drag.x -
          item.x * (this.scaleWidth / 100 - 1);
        item.y =
          (event.y - item.drag.my) / 1.3 +
          item.drag.y -
          item.y * (this.scaleWidth / 100 - 1);

        // item.y = item.y/(this.scaleWidth/100);
        // item.x = item.x/(this.scaleWidth/100);
        if (item.matrix) {
          //const matrix = item.matrix.match(/(-?\d{1,}\.?\d?){1,}/g);
          item.matrix = "1,0,0,1,0,0";
          let cX = item.x + item.width / 2;
          let cY = item.y + item.height / 2;
          item.matrix = toSVG(rotateDEG(item.rotate, cX, cY));
        }

        if (left < 0) {
          //this.$store.commit(CONSTRUCTOR_SET_SIDE_INVALID, {id: this.side.id, invalid: true});
          ///   item.invalid = true;
          this.lines.left = true;
        }
        if (right > edBounds.width) {
          //this.$store.commit(CONSTRUCTOR_SET_SIDE_INVALID, {id: this.side.id, invalid: true});
          // item.invalid = true;
          this.lines.right = true;
        }
        if (top < 0) {
          //this.$store.commit(CONSTRUCTOR_SET_SIDE_INVALID, {id: this.side.id, invalid: true})
          //item.invalid = true;
          this.lines.top = true;
        }
        if (bottom > edBounds.height) {
          //this.$store.commit(CONSTRUCTOR_SET_SIDE_INVALID, {id: this.side.id, invalid: true});
          //item.invalid = true;
          this.lines.bottom = bottom;
        }
        if (
          (top > 0 &&
            bottom < edBounds.height &&
            left > 0 &&
            right < edBounds.width) ||
          !this.maxPrintSize
        ) {
          // this.$store.commit(CONSTRUCTOR_SET_SIDE_INVALID, {id: this.side.id, invalid: false})
          // item.invalid = false;
        }

        const centerX = edBounds.width / 2;
        const centerY = edBounds.height / 2;
        const oX = (left + right) / 2;
        const oY = (top + bottom) / 2;

        // // Прилипание к центральным линиям
        if (oY > centerY - 5 && oY < centerY + 5) {
          // item.y = centerY - item.height / 2;
          item.y =
            +this.sideArea.y + +this.sideArea.height / 2 - item.height / 2;
          this.lines.centerH = true;
        }

        if (oX > centerX - 5 && oX < centerX + 5) {
          item.x = +this.sideArea.x + +this.sideArea.width / 2 - item.width / 2;
          this.lines.centerV = true;
        }

        // // Верх и горизонтальный центр
        // if (bottom > centerY - 5 && bottom < centerY + 5) {
        //     item.y = centerY - (bottom - top) + (item.drag.y - item.drag.top);
        //     this.lines.centerH = true;
        // }

        // // Низ и горизонтальный центр
        // if (top > centerY - 5 && top < centerY + 5) {
        //     item.y = centerY + (bottom - top) + (item.drag.y - item.drag.bottom);
        //     this.lines.centerH = true;
        // }

        // // Лево и вертикальный центр
        // if (left > centerX - 5 && left < centerX + 5) {
        //     item.x = centerX + (right - left) + (item.drag.x - item.drag.right);
        //     this.lines.centerV = true;
        // }

        // // Право и вертикальный центр
        // if (right > centerX - 5 && right < centerX + 5) {
        //     item.x = centerX - (right - left) + (item.drag.x - item.drag.left);
        //     this.lines.centerV = true;
        // }

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
        //old

        const startAngle =
          item.drag.angle -
          Math.atan2(
            item.drag.my - (item.drag.oY + item.drag.top + item.drag.h / 2),
            item.drag.mx - (item.drag.oX + item.drag.left + item.drag.w / 2)
          ) *
            (180 / Math.PI);

        var dx = event.x - (item.drag.oX + item.drag.left + item.drag.w / 2),
          dy = event.y - (item.drag.oY + item.drag.top + item.drag.h / 2),
          angle = Math.atan2(dy, dx) * (180 / Math.PI);
        ///here
        let newAngle =
          angle + startAngle < 0
            ? 360 - Math.abs(angle + startAngle)
            : angle + startAngle;
        // if (item.width < 75) {
        //   newAngle *= 2;
        // }
        item.rotate = newAngle % 359;

        ///new
        // TODO: fixed angle on mobile
        // console.log(event);
        // const startAngleR =
        //   Math.atan2(
        //     elBounds.y + elBounds.height / 2,
        //     elBounds.x + elBounds.width / 2
        //   ) *
        //   (180 / Math.PI);
        // let boxCenter = [
        //   elBounds.x + elBounds.width / 2,
        //   elBounds.y + elBounds.height / 2
        // ];

        // let angleR =
        //   Math.atan2(event.y - boxCenter[1], event.x - boxCenter[0]) *
        //   (180 / Math.PI);

        // let newAR =
        //   angleR + startAngleR < 0
        //     ? 360 - Math.abs(angleR + startAngleR)
        //     : angleR + startAngleR;
        // // console.log("test new", newAR);
        // item.rotate = newAR % 359;
        // console.log(
        //   "angleR",
        //   angleR,
        //   "START ANGLE",
        //   startAngleR,
        //   "OLD",
        //   newAngle % 359,
        //   "NEW",
        //   newAR % 359
        // );

        if (item.rotate > 357 || item.rotate < 3) {
          item.rotate = 0;
        } else if (item.rotate > 177 && item.rotate < 183) {
          item.rotate = 180;
        } else if (item.rotate > 87 && item.rotate < 93) {
          item.rotate = 90;
        } else if (item.rotate > 267 && item.rotate < 273) {
          item.rotate = 270;
        }

        item.matrix = "1,0,0,1,0,0";
        item.matrix = `matrix(${Math.cos(item.rotate)},${-Math.sin(
          item.rotate
        )},${Math.sin(item.rotate)},${Math.cos(item.rotate)},0,0)`;
        let cX = item.x + item.width / 2;
        let cY = item.y + item.height / 2;

        item.matrix = toSVG(rotateDEG(item.rotate, cX, cY));
      }
      if (handle === CONSTRUCTOR_HANDLES.SCALE) {
        // item.width = Math.max(item.drag.w + event.x - item.drag.mx, 20);
        // item.height = Math.max(item.drag.h + event.y - item.drag.my, 20);

        // let centerToDot = Math.sqrt(Math.pow(item.drag.oX - item.drag.mx, 2) + Math.pow(item.drag.oY - item.drag.my, 2));
        // let distance    = Math.sqrt(Math.pow(event.clientX - item.drag.oX, 2) + Math.pow(event.clientY - item.drag.oY, 2));

        // // TODO Не знаю почему 1.95, но оно неплохо работает
        // distance = (distance - centerToDot) * 1.95; // * (distance / centerToDot) ??? fix
        // if(this.size) {
        //   const realItemsWidth = (item.drag.w + distance)/this.sideArea.width*this.size.width;
        //   const realItemsHeight = (item.drag.h + distance)/this.sideArea.height*this.size.height;
        // }

        // if((item.drag.w + distance) < 1 || (item.drag.h + distance) < 1) {
        //   return
        // }
        // if(item.drag.w + distance > 500 || item.drag.h + distance * ratio > 500 || (this.maxPrintSize && (realItemsWidth >= this.maxPrintSize.real_width || realItemsHeight >= this.maxPrintSize.real_height)) ) {
        //    this.$store.commit(CONSTRUCTOR_SET_SIDE_INVALID, {id: this.side.id, invalid: true})
        //   return
        // } else if (item.width < item.drag.w + distance && this.isReachMax()) {
        //   return
        // }
        const diff_before_w = (item.width - 500) / 2;
        const diff_before_h = (item.height - 500) / 2;
        const ratio = item.drag.h / item.drag.w;
        item.width = Math.max(item.drag.w + event.x - item.drag.mx, 20);
        item.height = item.width * ratio;
        const diff_current_w = (item.width - 500) / 2;
        const diff_current_h = (item.height - 500) / 2;
        item.x = item.x + diff_before_w - diff_current_w;
        item.y = item.y + diff_before_h - diff_current_h;

        if (item.type == "text") {
          const index = this.sideItems.indexOf(item);
          const tSpans = document.querySelectorAll(
            `#group-${index} svg > text > tspan`
          );
          let addHeight = 2;
          if (tSpans && tSpans.length) {
            if (tSpans[0] && tSpans[0].getBBox()) {
              addHeight +=
                tSpans[0].getBBox().height / item.text.length - item.fontSize;
              if (addHeight < 2) {
                addHeight = 2;
              }
            }
          }
          item.fontSize = (item.height - addHeight) / item.text.length;
        }
        item = this.checkItemPosition(item);
      }
      this.checkPrintSize();
    },
    hideLines() {
      this.lines.left = false;
      this.lines.right = false;
      this.lines.top = false;
      this.lines.bottom = false;
      this.lines.centerH = false;
      this.lines.centerV = false;
    },
    toggleColor() {
      this.showcolors = !this.showcolors;
    },

    addTextField() {
      const item = this.createTextField();
      let checked = this.checkItemPosition(item);
      this.$store.commit(CONSTRUCTOR_ADD_ITEM, checked);
      this.$store.commit(
        CONSTRUCTOR_SET_SELECTED_ITEM,
        this.sideItems[this.sideItems.length - 1]
      );
      eventBus.$emit(UPDATE_ELEMENT_SIZE);
    },
    addImgField(file) {
      const item = this.createImgField(file);
      let checked = this.checkItemPosition(item);
      this.$store.commit(CONSTRUCTOR_ADD_ITEM, checked);
      this.$store.commit(
        CONSTRUCTOR_SET_SELECTED_ITEM,
        this.sideItems[this.sideItems.length - 1]
      );
      this.$store.commit("setActiveSidebar", Sidebar.PRODUCT);
      this.$nextTick(() => {
        this.checkPrintSize();
      });
    },
    createTextField() {
      return {
        side: this.side.id,
        sideName: this.side.name,
        type: "text",
        textAnchor: "start",
        x: 150 + ((this.sideItems.length + 2) % 20) * 10,
        y: 150 + ((this.sideItems.length + 2) % 20) * 10,
        text: ["Текст"],
        width: 48,
        height: 25,
        font: { name: "CyrillicHover" },
        fontSize: 20,
        node: null,
        name: "Текст",
        color: this.color.color.includes("FFF") ? "#000" : "#fff",
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
        x: 150 + ((this.sideItems.length + 2) % 20) * 10,
        y: 150 + ((this.sideItems.length + 2) % 20) * 10,
        width:
          file.width && file.width / file.height < 1
            ? (file.width / file.height) * 150
            : 150,
        url: file.url,
        name: file.name,
        height:
          file.height && file.height / file.width < 1
            ? (file.height / file.width) * 150
            : 150,
        node: null,
        rotate: 0,
        o: {
          x: 0,
          y: 0
        },
        selected: false,
        spinner: true
      };
    },
    checkItemPosition(item) {
      const left = item.x;
      const right = item.x + item.width;
      const top = item.y;
      const bottom = item.y + item.height;
      if (
        left < +this.sideArea.x ||
        right > +this.sideArea.x + +this.sideArea.width ||
        top < +this.sideArea.y ||
        bottom > +this.sideArea.y + +this.sideArea.height
      ) {
        item.invalid = true;
      } else {
        item.invalid = false;
      }
      if (!this.maxPrintSize) {
        item.invalid = false;
      }

      return item;
    },
    updateSizes() {
      //setTimeout(() => {
      // const index = this.items.indexOf(this.selectedElement);
      // const tSpans = document.querySelectorAll(
      //   `#group-${index} svg > text > tspan`
      // );
      // let addHeight = 2;
      // const widths = Array.from(tSpans).map((x, i) => {
      //   if (i == 0 && x.getBBox()) {
      //     addHeight +=
      //       x.getBBox().height / this.selectedElement.text.length -
      //       this.selectedElement.fontSize;
      //     if (addHeight < 0) {
      //       addHeight = 0;
      //     }
      //   }
      //   return x.getComputedTextLength();
      // });
      // const maxWidth = widths.length ? Math.max(...widths) : 115;
      // if (this.selectedElement && this.selectedElement.fontSize) {
      //   this.selectedElement.height =
      //     this.selectedElement.fontSize * this.selectedElement.text.length +
      //     addHeight;
      //   this.selectedElement.height +=
      //     this.selectedElement.text.length > 1 ? addHeight : 0;
      //   this.selectedElement.width = maxWidth;
      //   this.selectedElement = this.checkItemPosition(this.selectedElement);
      // }

      setTimeout(() => {
        this.sideItems.forEach((item, i) => {
          const tSpans = document.querySelectorAll(
            `#group-${i} svg > text > tspan`
          );
          let addHeight = 2;
          const widths = Array.from(tSpans).map((x, i) => {
            if (i == 0 && x.getBBox()) {
              addHeight +=
                x.getBBox().height / item.text.length - item.fontSize;
              if (addHeight < 0) {
                addHeight = 0;
              }
            }
            return x.getComputedTextLength();
          });
          const maxWidth = widths.length ? Math.max(...widths) : 115;
          if (item && item.fontSize) {
            item.height = item.fontSize * item.text.length + addHeight;
            item.height += item.text.length > 1 ? addHeight : 0;
            item.width = maxWidth;
            item = this.checkItemPosition(item);
          }
        });
        this.checkPrintSize();
      }, 100);
      // });
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
        this.$store.commit("setActiveSidebar", Sidebar.PRODUCT);
      }
      this.$nextTick(() => {
        this.checkPrintSize();
      });
    },

    onKeyUp(event) {
      if (event.key === "Delete") {
        this.removeActiveItem();
      }
      return event.preventDefault();
    }
  },
  mounted() {
    this.currSize = this.size;
    this.svg = document.querySelector("#editor");
    const svgBounds = this.svg.getBoundingClientRect();
    this.width = svgBounds.width;
    this.height = svgBounds.height;
    this.handleResize();

    eventBus.$on(UPDATE_ELEMENT_SIZE, () => {
      this.updateSizes();
    });

    eventBus.$on("scaleChanged", sign => {
      if (sign === "-") {
        if (this.scaleWidth > 100) {
          this.scaleWidth -= 20;
          this.scaleMargin += 10;
        }
      } else {
        if (this.scaleWidth < 180) {
          this.scaleWidth += 20;
          this.scaleMargin -= 10;
        }
      }
    });

    this.editableAreaEl = document.querySelector(
      ".constructor #editor #editable-area"
    );
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("keyup", this.onKeyUp);
    //  window.addEventListener("mousemove", this.checkPrintSize);
    // window.addEventListener("touchmove", this.checkPrintSize)
  }
};
var swapArrayElements = function(arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};
</script>

<style lang="scss" scoped>
.main {
  transition: all 0.3s ease-out;
  &__alert-message {
    color: red;
    position: absolute;
    text-align: center;
    z-index: 3;
  }
}
.constructor {
  width: 100%;
  height: 100%;
  z-index: 2;
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: auto;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    margin-bottom: 20px;
  }
}

#editor {
  width: 100%;
  height: 100%;
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
    &.invalid {
      stroke: red;
    }
  }
}
</style>