<template>
  <div class="position-relative">
    <spinner v-if="isLoading" />
    <editor />
    <modals />
  </div>
</template>

<script>
import "./assets/scss/main.scss";
import Spinner from "./components/Spinner";
import Editor from "./components/Editor";
import Modals from "./components/Modals";
import { mapActions, mapGetters } from "vuex";
import {
  GET_BASES_CATEGORIES,
  GET_BASES_LIST,
  GET_DESIGN_CATEGORIES,
  GET_DESIGN,
  GET_FONTS
} from "./store/actions.type";

export default {
  name: "app",
  components: {
    Editor,
    Modals,
    Spinner
  },
  computed: {
    ...mapGetters(["isLoading"])
  },
  methods: {
    ...mapActions([
      GET_BASES_CATEGORIES,
      GET_BASES_LIST,
      GET_DESIGN_CATEGORIES,
      GET_DESIGN,
      GET_FONTS
    ])
  },
  mounted() {
    this.$store.dispatch(GET_BASES_CATEGORIES);
    this.$store.dispatch(GET_BASES_LIST, { limit: 10, init: true });
    this.$store.dispatch(GET_DESIGN_CATEGORIES);
    this.$store.dispatch(GET_DESIGN, {
      limit: 16,
      search: "",
      category_ids: []
    });
    this.$store.dispatch(GET_FONTS);
  }
};
</script>

<style>
.constructor-container {
  max-width: 1440px;
}
</style>
