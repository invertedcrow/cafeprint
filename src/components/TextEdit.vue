<template>
    <div class="text d-flex flex-column">
        <div class="text__input">
            <b-form-textarea
                    id="textarea"
                    v-model="text"
                    @keyup="updateInput"
                    placeholder="Your text here..."
                    rows="2"
                    max-rows="2"
            ></b-form-textarea>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: ""
            };
        },
        watch: {
            selectedElement: function (val) {
                    this.text = (val && val.text && val.text.join('\n')) || '';
            }
        },
        computed: {
            items() {
                return this.$store.state.constructor.items;
            },
            selectedElement() {
                return this.$store.state.constructor.selectedElement;
            }
        },
        methods: {
            updateInput() {
                this.selectedElement.text = this.text.split('\n');
            // .map(x => `<tpan x="0" dy=".6em">${x}</tpan>`).join()
                setTimeout(() => {
                    this.$store.commit("setItemsConstructor", this.items);
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .text {
        background-color: #fff;
        border: 1px solid lightgrey;
        margin-bottom: 15px;
        &__input {
            padding: 7px;
        }
    }
</style>