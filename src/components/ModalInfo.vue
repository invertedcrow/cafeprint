<template>
  <div class="info">
    <div class="modal-head">
      <div class="modal-head__icon">
        <img src="../assets/icons/information2.png" alt />
      </div>
      <div class="modal-head__title">Общая информация</div>
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
    <div class="info__text">
      <p>Футболка Fruit of the loom Valueweight, подойдет для любого типа фигуры. Свободные проймы рукавов не стесняют движений.</p>
      <p>Материал: 100% хлопок нить Belcoro.</p>
      <p>Плотность: Белая – 160 г/м², Цветная – 165 г/м²</p>
    </div>
    <div class="divider"></div>
    <div class="modal-head">
      <div class="modal-head__icon">
        <img src="../assets/icons/wash.png" alt />
      </div>
      <div class="modal-head__title">Уход за одеждой</div>
    </div>
    <div class="info__text">
      <p>Машинная стирка в деликатном режиме при температуре не выше 40 градусов. Отжим на минимальных оборотах или без отжима. Ручная стирка при температуре не выше 40 градусов, после стирки не выкручивать.</p>
      <p>Гладить при температуре не выше 110 градусов. При глажке выворачивать наизнанку.</p>
      <p>Не применять отбеливатели и улучшители стирального порошка.</p>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";
import { MODALS } from "../consts";
export default {
  methods: {
    onHide() {
      eventBus.$emit("hideModal", MODALS.INFO);
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  &__text {
    font-weight: 300;
    font-size: 14px;
  }
}
</style>