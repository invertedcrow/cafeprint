<template>
    <b-container class="position-relative main-container">
        <app-menu/>
        <app-main/>
        <app-settings/>

        <sides :sides="selectedProduct.sides" :setActiveSide="setActiveSide"/>
    </b-container>
</template>

<script>
    import "./assets/main.scss";
    import AppMenu from "./components/AppMenu";
    import AppSettings from "./components/AppSettings";
    import AppMain from "./components/AppMain";
    import Sides from "./components/Sides";

    export default {
        name: "app",
        components: {
            AppMenu,
            AppSettings,
            AppMain,
            Sides
        },
        computed: {
            selectedProduct() {
                return this.$store.state.selectedProduct;
            }
        },
        methods: {
            setActiveSide(side) {
                this.$store.commit('setSelectedSide', side.key);
                this.$store.commit('setSelectedElement', null);
            }
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
    .sides {
        position: absolute;
        top: 85vh;
    }
</style>
