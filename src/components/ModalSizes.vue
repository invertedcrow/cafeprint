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
        <div class="table__head d-flex justify-content-between">
          <div>Размер</div>
          <div>A, см</div>
          <div>B, см</div>
        </div>
        <div class="table__body d-flex flex-column justify-content-between">
          <div
            class="table__body-item"
            :class="{active: activeSize && item.id == activeSize.id}"
            v-for="item in sizes"
            :key="item.id"
            @click="setSelectedSize(item)"
          >
            <div class="wrapper-item d-flex justify-content-between">
              <div class="size">{{item.s}}</div>
              <div class="length">{{item.a}}</div>
              <div class="length">{{item.b}}</div>
            </div>
          </div>
        </div>
        <p>* возможна погрешность 2 см</p>
      </div>
      <div class="sizes__content-img d-flex flex-column justify-content-start">
        <img src="../assets/temp-size.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { MODALS } from "../consts";
import { eventBus } from "../main";
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      sizes: [
        { id: 1, s: "XS", a: 45, b: 70 },
        { id: 2, s: "S", a: 49, b: 72 },
        { id: 3, s: "M", a: 52, b: 74 },
        { id: 4, s: "L", a: 56, b: 76 },
        { id: 5, s: "XL", a: 60, b: 77 },
        { id: 6, s: "XXL", a: 63, b: 78 },
        { id: 7, s: "3XL", a: 67, b: 80 },
        { id: 8, s: "4XL", a: 72, b: 83 },
        { id: 9, s: "5XL", a: 76, b: 85 }
      ]
    };
  },
  methods: {
    ...mapMutations(["setSelectedSize"]),
    onHide() {
      eventBus.$emit("hideModal", MODALS.SIZES);
    }
  },
  computed: {
    ...mapGetters(["activeSize"])
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
        border-bottom: 2px solid #ebebeb;
        padding-bottom: 12px;
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
          .wrapper-item {
            padding: 15px 10px;
            cursor: pointer;
            border-bottom: 1px solid #ebebeb;
            .size {
              width: 20px;
              font-weight: 600;
            }
            .length {
              font-weight: 300;
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
          &:hover {
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