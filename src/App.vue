<template>
  <b-container class="position-relative main-container">
    <app-menu />
    <app-main />
    <app-settings />
  </b-container>
</template>

<script>
import "./assets/main.scss";
import AppMenu from "./components/AppMenu";
import AppSettings from "./components/AppSettings";
import AppMain from "./components/AppMain";

export default {
  name: "app",
  components: {
    AppMenu,
    AppSettings,
    AppMain
  }
};
</script>

<style>
.main-container {
  min-height: 900px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
