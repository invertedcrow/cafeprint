<template>
  <div class="design d-flex justify-content-between">
    <div class="design__search-pane d-flex flex-column" v-if="!showPreview">
      <design-selection-search />
      <design-selection-categories />
    </div>
    <div class="design__list">
      <design-selection-list v-if="list.length" :list="list" />
      <div
        v-else
        class="h-100 d-flex flex-column justify-content-center align-items-center"
      >No search result found</div>
    </div>
    <div class="design__preview" v-if="showPreview">
      <design-selection-preview />
    </div>

    <b-button
      class="design__back-btn position-absolute"
      squared
      variant="info"
      @click="resetPreview"
      v-if="showPreview"
    >Back</b-button>
  </div>
</template>

<script>
import DesignSelectionSearch from "./DesignSelectionSearch";
import DesignSelectionCategories from "./DesignSelectionCategories";
import DesignSelectionList from "./DesignSelectionList";
import DesignSelectionPreview from "./DesignSelectionPreview";

export default {
  components: {
    DesignSelectionSearch,
    DesignSelectionCategories,
    DesignSelectionList,
    DesignSelectionPreview
  },
  computed: {
    list() {
      return this.$store.state.designs.list;
    },
    showPreview() {
      return this.$store.state.designs.preview;
    }
  },
  methods: {
    resetPreview() {
      this.$store.commit("setDesignPreview", "");
    }
  }
};
</script>

<style lang="scss" scoped>
.design {
  max-height: 750px;
  overflow: hidden;
  &__search-pane {
    padding: 15px;
    width: 296px;
    flex-shrink: 0;
  }
  &__list {
    width: 100%;
    overflow-y: scroll;
  }
  &__preview {
    width: 296px;
    flex-shrink: 0;
  }
  &__back-btn {
    position: absolute;
    left: 0;
    top: 45%;
    height: 100px;
  }
}
</style>