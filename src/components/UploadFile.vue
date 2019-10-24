<template>
  <div class="upload">
    <b-button squared variant="info" class="upload__btn">
      <img src="../assets/icons/import.svg" /> Upload an image
    </b-button>
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :useCustomSlot="true"
      :options="dropzoneOptions"
    >
      <div class="dropzone__content">
        <img src="../assets/icons/plus.svg" />
        <p>
          <b>Upload or drag your image here</b>
        </p>
        <p class="dropzone__content-formats">PNG, JPG, GIF, SVG, AI, CDR</p>
      </div>
    </vue-dropzone>
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
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.upload {
  width: 296px;
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
  border: dashed 2px lightgrey;
  margin-top: 20px;
  height: 100%;
  .dropzone {
    &__content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #8c8c8c;
      img {
        width: 30px;
        margin-bottom: 20px;
      }
      &-formats {
        font-size: 12px;
      }
    }
  }
}
</style>