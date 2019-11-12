<template>
  <div>
    <div class="row">
      <div class="col-lg-2 col-12">
        <app-menu />
      </div>

      <div class="col-lg-6 col-md-7">
        <div class="row">
          <div class="col">
            <app-main />
          </div>
        </div>

        <div class="row">
          <div class="col-lg-10">
            <sides />
          </div>
          <div class="col-lg-2">
            <scale />
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-md-5">
        <app-sidebar />
      </div>
    </div>

    <!--<div class="row">-->
    <!--<div class="col-lg-2">-->
    <!--<app-menu />-->
    <!--</div>-->
    <!--<div class="col-lg-6">-->
    <!--<app-main />-->
    <!--</div>-->
    <!--<div class="col-lg-4">-->
    <!--<app-sidebar />-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="row">-->
    <!--<div class="offset-lg-2 col-lg-5">-->
    <!--<sides />-->
    <!--</div>-->
    <!--<div class="col-lg-1">-->
    <!--<scale />-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import AppMenu from "./AppMenu";
import AppSidebar from "./AppSidebar";
import AppMain from "./AppMain";
import Sides from "./Sides";
import Scale from "./Scale";
import SidesToggle from "./SidesToggle";

export default {
  components: {
    AppMenu,
    AppSidebar,
    AppMain,
    Sides,
    Scale,
    SidesToggle
  }
};
</script>

<style lang="scss" scoped></style>