<template>
  <div class="upload">
    <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">

    <div class="upload__list">
      <div class="d-flex flex-wrap">
        <div v-for="(item, index) in items" :key="index" class="d-flex justify-content-center upload__item">
          123
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.upload.items;
    }
  },
  methods: {

    uploadImage(event) {

      const URL = 'http://foobar.com/upload'; 

      let data = new FormData();
      data.append('name', 'my-picture');
      data.append('file', event.target.files[0]); 

      let config = {
        header : {
          'Content-Type' : 'image/png'
        }
      }

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
  &__list {
  }
  &__item {
    margin: 5px;
    border: 1px solid gray;
    background-color: gray; 
    height: calc(20% - 10px); 
    width: calc(20% - 10px);
  }  
}

</style>