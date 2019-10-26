<template>
  <div class="list">
    <perfect-scrollbar>
      <div class="d-flex flex-wrap">
        <div v-for="(item, index) in getAllFiles" :key="index">
          <div class="list__item">
            <div class="list__item-preview">
              <img :src="item.dataURL" alt />
            </div>
            <div class="list__item-about">
              <div class="list__item-name">{{item.name}}</div>
              <b-button class="baseBtn seconadary" @click="onSelectImg(item)">Добавить</b-button>
            </div>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAllFiles"])
  },
  methods: {
    onSelectImg(file) {
      this.$store.commit("addImg", file);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  height: 330px;
  background-color: whitesmoke;
  padding: 10px;
  padding-right: 0;
  display: flex;
  border: 1px whitesmoke solid;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  &__item {
    background-color: #fff;
    border-radius: 10px;
    border: 1px whitesmoke solid;
    overflow: hidden;
    width: 170px;
    height: 286px;
    margin-right: 10px;
    margin-bottom: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    &-preview {
      flex-shrink: 0;
      background-color: whitesmoke;
      height: 170px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &-name {
      margin-bottom: 10px;
      word-wrap: break-word;
      height: 42px;
      overflow: hidden;
      color: #031127;
      font-size: 14px;
    }
    &-about {
      height: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>