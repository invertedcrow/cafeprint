<template>
  <div class="list d-flex flex-column">
    <perfect-scrollbar>
      <div class="d-flex flex-wrap">
        <div class="list__item" v-for="(item, index) in getAllFiles" :key="index">
          <div class="list__item-remove" @click="onRemoveFile(index)">
            <svg
              width="25"
              height="25"
              viewBox="0 0 28 28"
              xmlns="http://www.w3.org/2000/svg"
              fill="'#ababab'"
              style="cursor: pointer"
            >
              <path
                d="M24.11 9.39L22.7 7.97l-6.63 6.63-6.62-6.63-1.41 1.42 6.62 6.62-6.62 6.63 1.41 1.41 6.62-6.62 6.63 6.62 1.41-1.41-6.62-6.63 6.62-6.62z"
              />
            </svg>
          </div>
          <div class="list__item-preview">
            <img :src="imgUrl(item)" alt />
          </div>
          <div class="list__item-about">
            <div class="list__item-name">{{item.name}}</div>
            <button class="baseBtn secondary" @click="onSelectImg(item)">Добавить</button>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { MODALS, API_URL } from "../consts";
import { eventBus } from "../main";
import { UPLOAD_REMOVE_FILE } from "../store/mutations.type";

export default {
  computed: {
    ...mapGetters(["getAllFiles"])
  },
  methods: {
    ...mapMutations(["addImg", UPLOAD_REMOVE_FILE]),
    imgUrl(item) {
      return API_URL + "/" + item.url;
    },
    onSelectImg(img) {
      this.addImg(img);
      eventBus.$emit("hideModal", MODALS.UPLOAD);
    },
    onRemoveFile(index) {
      this.$store.commit(UPLOAD_REMOVE_FILE, index);
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
    width: calc(33% - 10px);
    height: 286px;
    margin-right: 10px;
    margin-bottom: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    position: relative;
    &-remove {
      position: absolute;
      right: 3px;
      top: 3px;
    }
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
    @media screen and (max-width: 768px) {
      width: calc(50% - 12px);
    }
  }
}
</style>