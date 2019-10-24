<template>
    <div>
        <b-container class="position-relative main-container">
            <editor/>
        </b-container>
        <modals/>
    </div>
</template>

<script>
    import "./assets/main.scss";

    import Editor from "./components/Editor";
    import Modals from "./components/Modals";

    export default {
        name: "app",
        components: {
            Editor,
            Modals
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
    .sides {
        position: absolute;
        top: 85vh;
    }
</style>
