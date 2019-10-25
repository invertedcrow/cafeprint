<template>
  <div class="upload">
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :useCustomSlot="true"
      :thumbnailMethod="null"
      :options="dropzoneOptions"
      @vdropzone-thumbnail="(file, dataUrl) => loadedThumbs(file, dataUrl)"
    >
      <div class="dropzone__content">Перетащите файлы сюда...</div>
    </vue-dropzone>

    <div class="upload__btn-wrapper">
      <div class="upload__btn-wrapper__text">Выбрать файлы</div>
      <button class="baseBtn" @click="addFile()">Выбрать изображение</button>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailMethod: "contain"
        //addRemoveLinks: true
        // thumbnailWidth: 150,
        // maxFilesize: 0.5,
        // headers: { "My-Awesome-Header": "header value" }
      }
    };
  },
  methods: {
    loadedThumbs(file, dataUrl) {
      this.$store.commit("addFile", file);
    },
    chooseFiles() {},
    addFile() {
      console.log("CLICK");
      this.$refs.myVueDropzone.$el.click();
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  &__btn {
    height: 50px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-right: 10px;
      max-height: 20px;
    }
  }
  &__dropzone {
    margin-top: 20px;
  }
  &__btn-wrapper {
    height: 40px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    align-items: center;
    border: 1px solid whitesmoke;
    border-radius: 40px;
    .baseBtn {
      height: 100%;
      padding-left: 20px;
      padding-right: 20px;
    }
    &__text {
      color: lightgrey;
    }
  }
}

#dropzone {
  border: none;
  background-color: whitesmoke;
  height: 250px;
  .dropzone {
    &__content {
      height: 100%;
      margin-top: 80px;
      color: #8c8c8c;
    }
  }
}
</style>