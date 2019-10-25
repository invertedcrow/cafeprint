<template>
  <div>
    <b-container>
      <editor />
    </b-container>
    <modals />
  </div>
</template>

<script>
import "./assets/scss/main.scss";

import Editor from "./components/Editor";
import Modals from "./components/Modals";

export default {
  name: "app",
  components: {
    Editor,
    Modals
  }
};
</script>

<style>
.main-container {
  /*min-height: 900px;*/
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
