<template>
  <div class="upload">
    <div class="upload__upload-pane">
      <upload-file />
    </div>
  </div>
</template>

<script>
import UploadFile from "./UploadFile";
export default {
  components: {
    UploadFile
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
  methods: {
    selectItem(item) {
      console.log(item);
    },
    uploadImage(event) {
      const URL = "http://foobar.com/upload";

      let data = new FormData();
      data.append("name", "my-picture");
      data.append("file", event.target.files[0]);

      let config = {
        header: {
          "Content-Type": "image/png"
        }
      };

      // axios.put(
      //   URL,
      //   data,
      //   config
      // ).then(
      //   response => {
      //     console.log('image upload response > ', response)
      //   }
      // )
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
}
</style>