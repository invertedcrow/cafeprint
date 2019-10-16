<template>
  <div class="text d-flex flex-column">
    <div class="text__input">
      <b-form-textarea
        id="textarea"
        v-model="activeItem.text"
        @input="updateInput"
        placeholder="Your text here..."
        rows="2"
        max-rows="2"
      ></b-form-textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  computed: {
    items() {
      return this.$store.state.constructor.items;
    },
    activeItem() {
      return this.items.find(item => item.active) || { text: "" };
    }
  },
  methods: {
    updateInput() {
      this.$store.commit("setItemsConstructor", this.items);
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  background-color: #fff;
  border: 1px solid lightgrey;
  margin-bottom: 15px;
  &__input {
    padding: 7px;
  }
}
</style>