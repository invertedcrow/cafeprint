<template>
    <div class="float-right">
        <button @click="plus" class="scale-button plus">
            <img src="../assets/icons/plus.svg">
        </button>
        <button @click="minus" class="scale-button">
            <img src="../assets/icons/minus.svg">
        </button>
    </div>
</template>

<script>
    import {eventBus} from "../main.js";
    export default {
        name: "Zoom",
        methods: {
            plus() {
                eventBus.$emit('scaleChanged', '+');
            },
            minus() {
                eventBus.$emit('scaleChanged', '-');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .plus {
        margin-bottom: 10px;
    }
    .scale-button {
        width: 35px;
        height: 35px;
        display: block;
        border-radius: 50%;
        border: 1px solid #dcdcdc;
        background-color: transparent;
        line-height: 0;
        transition: .3s;

        &:hover {
            background-color: #ebebeb;
        }
        &:focus {
            outline: none;
        }
    }
</style>