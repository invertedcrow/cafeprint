<template>
  <div class="upload">
    <div class="scroll-wrapper">
      <perfect-scrollbar>
        <div class="drop-wrapper">
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            :useCustomSlot="true"
            :thumbnailMethod="null"
            :options="dropzoneOptions"
            @vdropzone-sending="sendingEvent"
            @vdropzone-success="(file, response) => onLoadFile(file)"
          >
            <div class="dropzone__content">Перетащите файлы сюда...</div>
          </vue-dropzone>
        </div>
      </perfect-scrollbar>
    </div>

    <div class="upload__btn-wrapper">
      <div class="upload__btn-wrapper__text">Выбрать файлы</div>
      <button class="baseBtn" @click="onAddFile()">Выбрать изображение</button>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations } from "vuex";
import { UPLOAD_ADD_FILE } from "../store/mutations.type";
import { API_URL } from "../consts";

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      length: 0,
      dropzoneOptions: {
        url: `${API_URL}/constructor-new/temp-files`,
        thumbnailMethod: "contain",
        previewTemplate: this.templatePreview(),
        uploadMultiple: true,
        parallelUploads: 20
      }
    };
  },
  methods: {
    ...mapMutations([UPLOAD_ADD_FILE]),
    sendingEvent(file, xhr, formData) {
      console.log("sendingEvent");
    },
    onAddFile() {
      this.$refs.myVueDropzone.$el.click();
    },
    onLoadFile(file) {
      console.log("ON LOAD FILE");
      console.log(file);
      this.$store.commit(UPLOAD_ADD_FILE, file);
    },
    templatePreview() {
      return `     
       <div class="custom dz-preview dz-file-preview">    
          <div class="dz-image" style="width: 200px;height: 180px">
              <img data-dz-thumbnail />
          </div>
          <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
          <div class="dz-error-message"><span data-dz-errormessage></span></div>
          <div class="dz-success-mark"><i class="fa fa-check"></i></div>
          <div class="dz-error-mark"><i class="fa fa-close"></i></div>
           <div class="dz-filename"><span data-dz-name></span></div>
           <div data-dz-remove class="remove">
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
        </div>
        <div class="">
            <select class="form-control" title="" name="image_type">
                <options v-for="type in image_type" value="type.value">{{ type.title }}</options>
            </select>
        </div>     
        `;
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
  font-family: "MuseoSansCyrl", sans-serif;
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
      box-shadow: 0 9px 35px rgba(0, 0, 0, 0.07);
    }
    &__text {
      color: lightgrey;
    }
    @media screen and (max-width: 768px) {
      border: none;
      justify-content: center;
      &__text {
        display: none;
      }
    }
  }
}
.scroll-wrapper {
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: whitesmoke;
}
.drop-wrapper {
  height: 250px;
}
#dropzone {
  border: none;
  background-color: whitesmoke;
  padding: 5px;
  padding-left: 15px;
  min-height: 250px;
  .dropzone {
    &__content {
      height: 100%;
      margin-top: 100px;
      color: #8c8c8c;
    }
  }
}
</style>