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
import { mapActions } from "vuex";
import {
  GET_BASES_CATEGORIES,
  GET_BASES_LIST,
  GET_DESIGN_CATEGORIES,
  GET_DESIGN
} from "./store/actions.type";

export default {
  name: "app",
  components: {
    Editor,
    Modals
  },
  methods: {
    ...mapActions([
      GET_BASES_CATEGORIES,
      GET_BASES_LIST,
      GET_DESIGN_CATEGORIES,
      GET_DESIGN
    ])
  },
  mounted() {
    this.$store.dispatch(GET_BASES_CATEGORIES);
    this.$store.dispatch(GET_BASES_LIST, { limit: 10 });
    this.$store.dispatch(GET_DESIGN_CATEGORIES);
    this.$store.dispatch(GET_DESIGN);
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
