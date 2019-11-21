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
  GET_FONTS,
  USER_GET_ROLE
} from "./store/actions.type";
import { USER_ROLE } from "./consts";
export default {
  name: "app",
  components: {
    Editor,
    Modals,
    Spinner
  },
  computed: {
    ...mapGetters(["isLoading", "prevRole", "userRole"])
  },
  methods: {
    ...mapActions([
      GET_BASES_CATEGORIES,
      GET_BASES_LIST,
      GET_DESIGN_CATEGORIES,
      GET_DESIGN,
      GET_FONTS,
      USER_GET_ROLE
    ]),
    checkUserRole() {
      if (
        this.prevRole != USER_ROLE.guest &&
        this.userRole == USER_ROLE.guest
      ) {
        alert("Session was closed");
      }
    }
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
    this.$store.dispatch(USER_GET_ROLE);
    setInterval(() => {
      this.$store.dispatch(USER_GET_ROLE);
      this.checkUserRole();
    }, 300000);
  }
};
</script>

<style>
.constructor-container {
  max-width: 1440px;
}
</style>
