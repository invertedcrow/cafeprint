<template>
  <div class="sides d-flex justify-content-center">
    <div v-for="(side) in renderSides" :key="side.key" @click="setActiveSide(side)">
      <div class="sides__item d-flex flex-column" :class="{active: side.key == selectedSide.key }">
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
                v-bind:xlink:href="item.file.dataURL"
                :x="0"
                :y="0"
                :height="item.height"
                :width="item.width"
              />
              <text
                v-bind:key="index"
                v-for="(text, index) in item.text"
                :x="0"
                :y="item.fontSize"
                :height="item.height"
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      TextAlignment
    };
  },
  methods: {
    setActiveSide(side) {
      this.$store.commit("setSelectedSide", side.key);
      this.$store.commit("setSelectedElement", null);
    }
  },
  computed: {
    ...mapGetters(["selectedSide", "renderSides"])
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
    opacity: 0.11;
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