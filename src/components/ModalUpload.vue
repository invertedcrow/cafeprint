<template>
  <div>
    <div class="upload">
      <b-tabs>
        <b-tab title="Загрузить свое" active>
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
export default {
  components: {
    UploadFile,
    UploadList
  },
  data() {
    return {
      selectedItem: null
    };
  },
  computed: {
    items() {
      return this.$store.state.upload.items;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>