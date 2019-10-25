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
    <b-button @click="chooseFiles()" squared variant="info" class="upload__btn">Выбрать изображение</b-button>
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
        thumbnailMethod: "contain",
        previewsContainer: false
        // thumbnailWidth: 150,
        // maxFilesize: 0.5,
        // headers: { "My-Awesome-Header": "header value" }
      }
    };
  },
  methods: {
    loadedThumbs(file, dataUrl) {
      this.$store.commit("addFile", { file, dataUrl });
    },
    chooseFiles() {
      document.getElementById("fileUpload").click();
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
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
}

#dropzone {
  border: none;
  background-color: whitesmoke;
  height: 100%;
  .dropzone {
    &__content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #8c8c8c;
    }
  }
}
</style>