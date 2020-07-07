<template>
  <div class="sizes">
    <div class="modal-head">
      <div class="modal-head__icon">
        <img src="../assets/icons/measuring-tape.png" alt />
      </div>
      <div class="modal-head__title">Выберите ваш размер</div>
      <div class="modal-head__close" @click="onHide()">
        <svg
          data-v-0cb6d606
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="17px"
          height="17px"
          viewBox="0 0 357 357"
        >
          <polygon
            data-v-0cb6d606
            points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"
          />
        </svg>
      </div>
    </div>
    <div class="sizes__content">
      <div class="sizes__content-table">
        <div class="table__head" :class="{isAdditional: isAdditionalSizes}">
          <div :style="{width: cellWidth}">Размер</div>
          <div :style="{width: cellWidth}">A, см</div>
          <div :style="{width: cellWidth}">B, см</div>
          <template v-if="isAdditionalSizes">
            <div
              v-for="label in additionalSizesNames.slice(0, additionalsLength)"
              :style="{width: cellWidth}"
              :key="label"
            >{{label}}</div>
          </template>
        </div>
        <div class="table__body d-flex flex-column justify-content-between">
          <div
            class="table__body-item"
            :style="{ pointerEvents: readonly ? 'none' : 'auto' }"
            :class="{active: size && item.id == size.id && !readonly, isDisabled: item.isDisabled }"
            v-for="item in sizes"
            :key="item.id"
            @click="setSelectedSize(item)"
          >
            <div class="wrapper-item" :class="{isAdditional: isAdditionalSizes}">
              <div class="size" :style="{width: cellWidth}">{{item.name}}</div>
              <div class="length" :style="{width: cellWidth}">{{item.width}}</div>
              <div class="length" :style="{width: cellWidth}">{{item.height}}</div>
              <template v-if="isAdditionalSizes">
                <div
                  class="length"
                  v-for="adSize in item.additionalArray"
                  :key="adSize"
                  :style="{width: cellWidth}"
                >{{adSize ? adSize : ''}}</div>
              </template>
            </div>
          </div>
        </div>
        <p>* возможна погрешность 2 см</p>
      </div>
      <div class="sizes__content-img d-flex flex-column justify-content-start">
        <img :src="imgUrl" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { MODALS } from "../consts";
import { eventBus } from "../main";
import { mapMutations, mapGetters } from "vuex";
import { CONSTRUCTOR_SET_SIZE } from "../store/mutations.type";
import { API_URL } from "../consts";
export default {
  props: ["readonly"],
  data() {
    return {
      additionalsLength: 0,
      sizes: [],
      cellWidth: "33%",
      additionalSizesNames: ["C", "D", "E", "F", "G", "H", "I", "K", "L"]
    };
  },
  methods: {
    ...mapMutations([CONSTRUCTOR_SET_SIZE]),
    onHide() {
      if (this.readonly) {
        eventBus.$emit("hideModal", MODALS.SIZES_READONLY);
      }
      eventBus.$emit("hideModal", MODALS.SIZES);
    },
    setSelectedSize(size) {
      if (this.readonly || size.isDisabled) {
        return;
      }
      this.$store.commit(CONSTRUCTOR_SET_SIZE, size);
      eventBus.$emit("hideModal", MODALS.SIZES);
    },
    getAdditionalSizes() {
      this.sizes = this.avaliableSizes.slice();
      this.additionalsLength = 0;
      this.sizes.forEach((item, i) => {
        if (item.additional) {
          item.additionalArray = item.additional.slice().split(":");
          if (
            item.additionalArray &&
            item.additionalArray.length > this.additionalsLength
          ) {
            this.additionalsLength = item.additionalArray.length;
          }
        }
      });
      this.cellWidth = 100 / (this.additionalsLength + 3) + "%";
    }
  },
  computed: {
    ...mapGetters(["size", "base", "avaliableSizes"]),
    imgUrl() {
      let link =
        API_URL +
        (this.base.size_image[0] == "/" ? "" : "/") +
        this.base.size_image;
      return link;
    },
    isAdditionalSizes() {
      return this.avaliableSizes.find(item => item.additional);
    }
  },
  mounted() {
    this.getAdditionalSizes();
  }
};
</script>

<style lang="scss" scoped>
.sizes {
  &__content {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
    &-table {
      width: 100%;
      margin-right: 50px;
      line-height: 1;
      font-size: 14px;
      order: 3;
      p {
        font-size: 12px;
        font-weight: 300;
      }
      .table__head {
        & > div {
          text-align: center;
        }
        border-bottom: 2px solid #ebebeb;
        padding-bottom: 12px;
        display: flex;
        justify-content: space-between;
        &.isAdditional {
          justify-content: start;
        }
      }
      .table__body {
        padding-top: 5px;
        margin-left: -15px;
        margin-right: -15px;
        margin-bottom: 15px;
        &-item {
          padding-left: 16px;
          padding-right: 16px;
          border-radius: 23px;
          border: 1px solid transparent;
          &.isDisabled {
            opacity: 0.5;
          }
          .wrapper-item {
            padding: 15px 10px;
            cursor: pointer;
            border-bottom: 1px solid #ebebeb;
            display: flex;
            justify-content: space-between;

            .size {
              width: 20px;
              font-weight: 600;
              text-align: center;
              padding: 0 3px;
              white-space: nowrap;
            }
            .length {
              font-weight: 300;
              text-align: center;
              padding: 0 3px;
              white-space: nowrap;
            }
            &.isAdditional {
              justify-content: start;
            }
          }
          &.active {
            background-color: #81b241;
            border: 1px solid #81b241;
            color: #fff;
            .wrapper-item {
              border-bottom: 1px solid transparent;
            }
          }
          &:hover:not(.isDisabled) {
            border: 1px solid #81b241;
            .wrapper-item {
              border-bottom: 1px solid transparent;
            }
          }
        }
      }
    }
    &-img {
      width: 250px;
      flex-shrink: 0;
      order: 5;
      img {
        width: 100%;
      }
      @media screen and (max-width: 768px) {
        width: 100%;
        order: 1;
        margin-bottom: 30px;
      }
    }
  }
}
</style>