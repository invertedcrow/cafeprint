<template>
  <div>
    <div class="row">
      <div class="constructor__menu col-lg-2 col-12">
        <app-menu />
      </div>

      <div class="col-lg-6 col-md-7">
        <app-main />
        <sides-toggle />

        <div class="row controls-wrapper">
          <div class="col-lg-10">
            <sides />
          </div>
          <div class="col-lg-2">
            <scale />
          </div>
        </div>
      </div>

      <div class="constructor__sidebar col-lg-4 col-md-5">
        <app-sidebar />
      </div>
    </div>
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

<style lang="scss" scoped>
.controls-wrapper {
  @media screen and (max-width: 1200px) {
    display: none;
  }
}

.constructor {
  &__menu,
  &__sidebar {
    z-index: 3;
  }
}
</style>