<template>
  <div class="app-constructor__select">
    <b-form-select
      class="app-constructor__select-input"
      v-model="selected"
      :options="feature.values"
      value-field="id"
      text-field="name"
      @input="selectFeature"
    >
      <template v-slot:first>
        <option :value="null" disabled>{{feature.name}}</option>
      </template>
    </b-form-select>
  </div>
</template>

<script>
import { CONSTRUCTOR_SET_FEATURES } from "../store/mutations.type";

export default {
  props: ["feature", "selected", "index"],
  methods: {
    selectFeature() {
      this.$store.commit(CONSTRUCTOR_SET_FEATURES, {
        index: this.index,
        id: this.selected
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-constructor__select {
  &-input {
    height: 40px;
    border-radius: 20px;
    border: 1px solid #dcdcdc;
    background-color: #fff;
    opacity: 0.85;
    color: rgba(1, 17, 41, 0.85);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.14px;
    padding-left: 23px;
    &:active,
    &:hover,
    &:focus {
      box-shadow: none;
      outline: none;
      border-color: #72b425;
    }
  }
}
</style>