<template>
  <div>
    <div class="app-constructor-features" v-for="(item, index) in baseFeatures" :key="index">
      <features-select :selected="features[index]" :feature="item" :index="index" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FeaturesSelect from "./FeaturesSelect";
export default {
  components: {
    FeaturesSelect
  },
  computed: {
    ...mapGetters(["baseFeatures", "features"])
  }
};
</script>

<style lang="scss" scoped>
.app-constructor-features {
  margin-bottom: 15px;
}
</style>