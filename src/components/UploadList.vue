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
  height: 300px;
  padding: 10px;
  padding-right: 0;
  display: flex;
  border: 1px whitesmoke solid;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  &__item {
    border-radius: 5px;
    border: 1px whitesmoke solid;
    overflow: hidden;
    width: 160px;
    margin-right: 10px;
    &-preview {
      background-color: whitesmoke;
      height: 160px;
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
      height: 50px;
      overflow: hidden;
    }
    &-about {
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>