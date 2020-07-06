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
  USER_GET_ROLE,
  BLANKLOAD_GET,
  BLANKLOAD_CART_GET,
  BLANKLOAD_PROFILE_GET,
  BLANKLOAD_ORDER_GET
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
      USER_GET_ROLE,
      BLANKLOAD_GET,
      BLANKLOAD_CART_GET,
      BLANKLOAD_ORDER_GET
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
    let init = true;
    const url = new URL(window.location);
    window.history.pushState(null, null, window.location.href);
    const id = url.searchParams.get("product");
    const uid = url.searchParams.get("cart-item");
    const save_uid = url.searchParams.get("save_uid");
    const order_id = url.searchParams.get("order_product");

    if (id) {
      this.$store.dispatch(BLANKLOAD_GET, id);
      init = false;
    } else if (uid) {
      this.$store.dispatch(BLANKLOAD_CART_GET, uid);
      init = false;
    } else if (save_uid) {
      this.$store.dispatch(BLANKLOAD_PROFILE_GET, save_uid);
      init = false;
    } else if (order_id) {
      this.$store.dispatch(BLANKLOAD_ORDER_GET, order_id);
      init = false;
    }
    // this.$store.dispatch(GET_BASES_CATEGORIES);
    this.$store.dispatch(GET_BASES_LIST, { page: 1, init });

    // this.$store.dispatch(GET_DESIGN_CATEGORIES);
    // this.$store.dispatch(GET_DESIGN, {
    //   limit: 16,
    //   search: ""
    //   // category_ids: []
    // });
    // this.$store.dispatch(GET_FONTS);
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
