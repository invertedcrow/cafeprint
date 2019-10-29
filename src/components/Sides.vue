<template>
  <div class="sides d-flex justify-content-center">
    <div v-for="(side) in renderSides" :key="side.key" @click="setActiveSide(side)">
      {{side.title}}
      <div class="sides__item d-flex flex-column">
        <svg id="editor" :viewBox="'0 0 500 500'" width="100%" height="100%">
          <image v-bind:xlink:href="side.image" />
          <g
            v-for="(item, index) in side.items"
            ref="groupEls"
            :key="index"
            :transform="'translate('+side.area.x+', '+side.area.y+') rotate('+item.rotate+' '+item.width/2+' '+item.height/2+')'"
          >
            <image
              v-if="item.type=='img'"
              v-bind:xlink:href="item.file.dataURL"
              :x="item.x - side.area.x"
              :y="item.y"
              :height="item.height"
              :width="item.width"
            />
            <text
              v-bind:key="index"
              v-for="(text, index) in item.text"
              :x="item.x"
              :y="item.y"
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
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { TextAlignment } from "../consts";

export default {
  data() {
    return {
      TextAlignment
    };
  },
  methods: {
    setActiveSide(side) {
      this.$store.commit("setSelectedSide", side.key);
      this.renderSides();
      this.$store.commit("setSelectedElement", null);
    }
  },
  computed: {
    renderSides() {
      const sidesList = this.$store.state.selectedProduct.sides;
      const items = this.$store.state.constructor.items;
      if (sidesList && sidesList.length) {
        for (let i = 0; i < sidesList.length; i++) {
          sidesList[i].items = items.filter(
            layer => layer.side == sidesList[i].key
          );
        }
      }
      return sidesList;
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
    width: 65px;
    height: 65px;
    border: 1px solid grey;
    margin: 2px;
    background-color: #fff;
    image {
      width: 100%;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>