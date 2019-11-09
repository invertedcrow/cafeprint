<template>
  <div class="d-flex flex-column h-100">
    <div class="modal-head">
      <div class="modal-head__icon">
        <svg
          width="20"
          height="20"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0)">
            <path
              d="M19.3256 5.93455L13.6711 0.280081C13.4915 0.100407 13.2484 0 13 0C12.7463 0 12.5032 0.100407 12.3289 0.280081L6.67438 5.93455C6.30446 6.30447 6.30446 6.90691 6.67438 7.28211C7.0443 7.65203 7.64674 7.65203 8.02194 7.28211L12.0488 3.25V19.6638C12.0488 20.187 12.4768 20.615 13 20.615C13.5232 20.615 13.9512 20.187 13.9512 19.6638V3.25L17.9833 7.28211C18.1683 7.46707 18.4114 7.5622 18.6545 7.5622C18.8976 7.5622 19.1406 7.46707 19.3256 7.28211C19.6955 6.9122 19.6955 6.30976 19.3256 5.93455Z"
              fill="#72B425"
            />
            <path
              d="M23.252 17.7772C22.7289 17.7772 22.3008 18.2053 22.3008 18.7284V24.0975H3.69919V18.7284C3.69919 18.2053 3.27114 17.7772 2.74797 17.7772C2.2248 17.7772 1.79675 18.2053 1.79675 18.7284V25.0488C1.79675 25.5719 2.2248 26 2.74797 26H23.252C23.7805 26 24.2033 25.5719 24.2033 25.0488V18.7284C24.2033 18.2053 23.7752 17.7772 23.252 17.7772Z"
              fill="#72B425"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="26" height="26" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="modal-head__title">Загрузить свое изображение</div>
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
    <div class="upload h-100">
      <b-tabs>
        <b-tab :title="titleTab" active>
          <upload-file />
        </b-tab>
        <b-tab title="Загруженные изображения">
          <upload-list />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import UploadFile from "./UploadFile";
import UploadList from "./UploadList";
import { eventBus } from "../main";
import { MODALS } from "../consts";
export default {
  components: {
    UploadFile,
    UploadList
  },
  data() {
    return {
      selectedItem: null,
      titleTab: window.innerWidth > 768 ? "Загрузить свое" : "Загрузить"
    };
  },
  computed: {
    items() {
      return this.$store.state.upload.items;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.titleTab =
          window.innerWidth > 768 ? "Загрузить свое" : "Загрузить";
      });
    });
  },
  methods: {
    onHide() {
      eventBus.$emit("hideModal", MODALS.UPLOAD);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>