<template>
  <div class="sidebar-layers d-flex flex-column">
    <div class="sidebar-card-header">
      <div class="sidebar-card-header__с-icon">
        <svg
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 210.1 210.1"
          style="enable-background:new 0 0 210.1 210.1;"
          xml:space="preserve"
        >
          <path
            class="st0"
            d="M168.5,0H80.2C67.4,0,57,10.4,57,23.3v2.9H41.6c-12.8,0-23.3,10.4-23.3,23.3v137.5c0,12.8,10.4,23.3,23.3,23.3   h88.3c12.8,0,23.3-10.4,23.3-23.3V184h15.4c12.8,0,23.3-10.4,23.3-23.3V23.3C191.8,10.4,181.3,0,168.5,0z M176.8,160.7   c0,4.6-3.7,8.3-8.3,8.3h-15.4V49.4c0-12.8-10.4-23.3-23.3-23.3H72v-2.9c0-4.6,3.7-8.3,8.3-8.3h88.3c4.6,0,8.3,3.7,8.3,8.3   L176.8,160.7L176.8,160.7z"
          />
        </svg>
      </div>
      <div class="sidebar-card-header__title">Управление слоями</div>
      <div @click="close" class="sidebar-card-header__close">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="17px"
          height="17px"
          viewBox="0 0 357 357"
        >
          <polygon
            points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"
          />
        </svg>
      </div>
    </div>
    <perfect-scrollbar ref="scrollContainer" :options="{suppressScrollX: true}">
      <div class="sidebar-layers__layers">
        <div :key="index" v-for="(side, index) in renderSides">
          <div class="sidebar-layers__side-head">
            <div class="sidebar-layers__side-head__title">{{side.name}}</div>
            <!-- <div class="sidebar-layers__side-head__tools">
              <svg
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="replay"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 76.398 76.398"
                style="enable-background:new 0 0 76.398 76.398;"
                xml:space="preserve"
              >
                <path
                  d="M58.828,16.208l-3.686,4.735c7.944,6.182,11.908,16.191,10.345,26.123C63.121,62.112,48.954,72.432,33.908,70.06   C18.863,67.69,8.547,53.522,10.912,38.477c1.146-7.289,5.063-13.694,11.028-18.037c5.207-3.79,11.433-5.613,17.776-5.252   l-5.187,5.442l3.848,3.671l8.188-8.596l0.002,0.003l3.668-3.852L46.39,8.188l-0.002,0.001L37.795,0l-3.671,3.852l5.6,5.334   c-7.613-0.36-15.065,1.853-21.316,6.403c-7.26,5.286-12.027,13.083-13.423,21.956c-2.879,18.313,9.676,35.558,27.989,38.442   c1.763,0.277,3.514,0.411,5.245,0.411c16.254-0.001,30.591-11.85,33.195-28.4C73.317,35.911,68.494,23.73,58.828,16.208z"
                />
              </svg>

              <svg
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="opposite"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 472.774 472.774"
                style="enable-background:new 0 0 472.774 472.774;"
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
            </div>-->
          </div>
          <draggable
            :list="draggList[index].items"
            group="sides"
            @start="startDrag"
            @change="change"
            @end="endDrag"
          >
            <div
              class="sidebar-layers__side-layer"
              :key="itemIndex"
              v-for="(layer, itemIndex) in draggList[index].items"
            >
              <div v-if="layer.type === 'text'" class="d-flex justify-content-start">
                <div class="sidebar-layers__side-layer__icon">
                  <span>T</span>
                </div>
                <span class="sidebar-layers__side-layer__text">{{layer.text.join(' ') }}</span>
              </div>
              <div v-if="layer.type === 'img'" class="d-flex justify-content-start">
                <div class="sidebar-layers__side-layer__icon">
                  <img :src="layer.url ? layer.url : layer.dataUrl" />
                </div>
                <div class="sidebar-layers__side-layer__text">{{layer.name}}</div>
              </div>

              <div class="sidebar-layers__side-layer__tools">
                <div
                  @click.prevent="onSelectLayer(index, itemIndex)"
                  @touchstart.prevent="onSelectLayer(index, itemIndex)"
                >
                  <checkbox :checked="layer.selected" />
                </div>

                <div
                  title="Дублировать"
                  @click.prevent="duplicateLayer({...layer, x: layer.x + 10, y: layer.y + 10})"
                  @touchstart.prevent="duplicateLayer({...layer, x: layer.x + 10, y: layer.y + 10})"
                >
                  <svg
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                    style="enable-background:new 0 0 512 512;"
                    xml:space="preserve"
                  >
                    <path
                      d="M368.64,0H20.48C9.175,0,0,9.175,0,20.48v348.16c0,11.305,9.175,20.48,20.48,20.48h348.16    c11.305,0,20.48-9.175,20.48-20.48V20.48C389.12,9.175,379.945,0,368.64,0z M348.16,348.16H40.96V40.96h307.2V348.16z"
                    />
                    <path
                      d="M471.04,419.84v51.2h-51.2V512h71.68c11.305,0,20.48-9.175,20.48-20.48v-71.68H471.04z"
                    />
                    <rect x="262.349" y="471.04" width="110.182" height="40.96" />
                    <path
                      d="M163.84,471.04v-51.2h-40.96v71.68c0,11.305,9.175,20.48,20.48,20.48h71.68v-40.96H163.84z"
                    />
                    <path
                      d="M491.52,122.88h-71.68v40.96h51.2v51.2H512v-71.68C512,132.055,502.825,122.88,491.52,122.88z"
                    />
                    <rect x="471.04" y="262.349" width="40.96" height="110.182" />
                  </svg>
                </div>
                <div
                  title="Удалить"
                  @click.prevent="removeItem(index, itemIndex)"
                  @touchstart.prevent="removeItem(index, itemIndex)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="512pt"
                    viewBox="-18 0 511 512"
                    width="512pt"
                  >
                    <path
                      d="m454.5 76c-6.28125 0-110.601562 0-117 0v-56c0-11.046875-8.953125-20-20-20h-160c-11.046875 0-20 8.953125-20 20v56c-6.398438 0-110.703125 0-117 0-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h37v376c0 11.046875 8.953125 20 20 20h320c11.046875 0 20-8.953125 20-20v-376h37c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm-277-36h120v36h-120zm200 432h-280v-356h280zm-173.332031-300v244c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-244c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm106.664062 0v244c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-244c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm0 0"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="sidebar-layers__side-layer empty-space d-flex justify-content-center">
              <div v-if="drag">Перетащите сюда</div>
            </div>
          </draggable>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import Checkbox from "./Checkbox";
import { Sidebar } from "../consts";
import { mapGetters, mapMutations } from "vuex";
import draggable from "vuedraggable";
import {
  CONSTRUCTOR_SET_ITEMS,
  CONSTRUCTOR_ADD_ITEM,
  CONSTRUCTOR_SET_SELECTED_SIDE,
  CONSTRUCTOR_SET_SELECTED_LAYERS_SIDE
} from "../store/mutations.type";
export default {
  components: {
    Checkbox,
    draggable
  },
  data() {
    return {
      drag: false,
      lastTouchY: 0,
      directTop: false
    };
  },
  methods: {
    ...mapMutations([
      CONSTRUCTOR_SET_ITEMS,
      CONSTRUCTOR_ADD_ITEM,
      CONSTRUCTOR_SET_SELECTED_SIDE,
      CONSTRUCTOR_SET_SELECTED_LAYERS_SIDE
    ]),
    close() {
      this.$store.commit("setActiveSidebar", Sidebar.PRODUCT);
    },
    startDrag() {
      this.drag = true;

      this.$refs.scrollContainer.$el.addEventListener("ps-scroll-y", () => {
        if (this.drag) {
          document.ontouchmove = event => {
            if (this.lastTouchY > event.changedTouches[0].clientY) {
              this.directTop = true;
            } else {
              this.directTop = false;
            }
            this.lastTouchY = event.changedTouches[0].clientY;
          };

          if (this.directTop) {
            this.$refs.scrollContainer.$el.scrollTop--;
          } else {
            this.$refs.scrollContainer.$el.scrollTop++;
          }
        }
      });
    },
    endDrag() {
      this.drag = false;
      this.lastTouchY = 0;
    },
    change() {
      const items = [];
      let side = null;
      this.draggList.forEach((item, index) => {
        let list = [...item.items];
        list.map(lay => {
          lay.side = this.renderSides[index].id;
          lay.selected = false;
          side = this.renderSides[index];
        });
        items.push(...list);
      });
      this.$store.commit(CONSTRUCTOR_SET_ITEMS, items);
      this.$store.commit(CONSTRUCTOR_SET_SELECTED_SIDE, side);
    },
    duplicateLayer(item) {
      this.$store.commit(CONSTRUCTOR_ADD_ITEM, { ...item, selected: false });
    },
    removeItem(index, itemIndex) {
      const sides = [...this.draggList];
      let items = [];
      sides[index].items.splice(itemIndex, 1);
      sides.forEach(item => items.push(...item.items.reverse()));
      this.$store.commit(CONSTRUCTOR_SET_ITEMS, items);
    },
    onSelectLayer(index, itemIndex) {
      const sides = [...this.draggList];
      let items = [];
      sides[index].items[itemIndex].selected = !sides[index].items[itemIndex]
        .selected;
      let sideId = sides[index].id;
      sides.forEach((side, i) => {
        if (index != i) {
          side.items.forEach(item => (item.selected = false));
        }
      });
      let side = this.sidesList.find(item => item.id == sideId);
      if (side) {
        this.$store.commit(CONSTRUCTOR_SET_SELECTED_SIDE, side);
      }
      sides.forEach(item => items.push(...item.items.reverse()));
      this.$store.commit(CONSTRUCTOR_SET_SELECTED_LAYERS_SIDE, sideId);
      this.$store.commit(CONSTRUCTOR_SET_ITEMS, items);
    }
  },
  computed: {
    ...mapGetters(["renderSides", "sidesList"]),
    draggList: {
      get() {
        let sidesList = this.renderSides.slice();
        sidesList.forEach(item => {
          if (item.items) item.items.reverse();
        });
        return sidesList;
      }
    }
  },
  name: "SidebarLayers"
};
</script>

<style lang="scss" scoped>
.sidebar-layers {
  .sidebar-card-header {
    margin-bottom: 5px;
  }
  &__layers {
    height: 500px;
    margin-right: 10px;
  }
  &__side {
    &-head {
      margin-top: 20px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__title {
        font-size: 14px;
      }
      &__tools {
        display: flex;
        align-items: center;
        margin-right: 15px;

        svg {
          fill: #757575;
          &:not(:last-child) {
            margin-right: 5px;
          }
        }

        svg.replay {
          width: 15px;
          height: 17px;
        }
        svg.opposite {
          width: 15px;
          height: 15px;
        }
      }
    }

    &-layer {
      border: 1px dashed rgb(225, 225, 225);
      border-radius: 8px;
      background-color: rgb(255, 255, 255);
      box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.07);
      width: 100%;
      height: 60px;
      margin-bottom: 5px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      position: relative;
      z-index: 4;

      &.empty-space {
        font-size: 14px;
        font-weight: 300;
        color: #72b425;
      }
      &__icon {
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      &__text {
        width: 100%;
        height: 35px;
        overflow: hidden;
        line-height: 1.3;
        padding-right: 83px;
        font-family: "MuseoSansCyrl", sans-serif;
        font-weight: 300;
        font-size: 14px;
        word-break: break-word;
        display: flex;
        align-items: center;
      }
      &__tools {
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80px;
        position: absolute;
        right: 10px;
        z-index: 5;
        svg {
          fill: #747474;
          height: 20px;
          width: 20px;
        }
      }
    }
  }
}
</style>