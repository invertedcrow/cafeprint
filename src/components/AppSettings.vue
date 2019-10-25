<template>
    <div class="settings">
        <template v-if="activeSettings === 'products'">
            <products-settings/>
        </template>
        <template v-if="activeSettings === 'text'">
            <text-edit/>
            <div class="row">
                <div class="col">
                    <b-button @click="randomColor" pill>Color</b-button>
                    <b-button pill @click="setFontBold" :variant="isBold ? 'danger' : 'secondary'">B</b-button>
                    <b-button pill @click="setFontItalic" :variant="isItalic ? 'danger' : 'secondary'">I</b-button>

                    <b-button pill @click="setTextAlignment(TEXT_ALIGNMENT.START)"
                              :variant="isTextAlignment(TEXT_ALIGNMENT.START) ? 'danger' : 'secondary'">Left
                    </b-button>
                    <b-button pill @click="setTextAlignment(TEXT_ALIGNMENT.MIDDLE)"
                              :variant="isTextAlignment(TEXT_ALIGNMENT.MIDDLE) ? 'danger' : 'secondary'">Center
                    </b-button>
                    <b-button pill @click="setTextAlignment(TEXT_ALIGNMENT.END)"
                              :variant="isTextAlignment(TEXT_ALIGNMENT.END) ? 'danger' : 'secondary'">Right
                    </b-button>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    Font size
                    <b-button pill @click="setFontSize('-')">-</b-button>
                    {{fontSize}}
                    <b-button pill @click="setFontSize('+')">+</b-button>
                </div>
            </div>
        </template>
        <button class="btn-get-price">Узнать стоимость</button>
    </div>
</template>

<script>
    import ProductsSettings from "./ProductsSettings";
    import {TEXT_ALIGNMENT} from "../consts";
    import TextEdit from "./TextEdit";

    export default {
        components: {
            ProductsSettings,
            TextEdit
        },
        data() {
            return {
                TEXT_ALIGNMENT
            }
        },
        computed: {
            activeSettings() {
                return this.$store.state.activeSettings;
            },
            selectedElement() {
                return this.$store.state.constructor.selectedElement;
            },
            isBold() {
                return this.selectedElement && this.selectedElement.bold;
            },
            isItalic() {
                return this.selectedElement && this.selectedElement.italic;
            },
            fontSize() {
                return this.selectedElement && Math.round(this.selectedElement.fontSize);
            }
        },
        methods: {
            isTextAlignment(value) {
                return this.selectedElement && this.selectedElement.textAnchor === value;
            },
            randomColor() {
                if (this.selectedElement) {
                    this.$store.state.constructor.selectedElement.color = '#' + (function co(lor) {
                        return (lor +=
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)])
                        && (lor.length == 6) ? lor : co(lor);
                    })('');
                }
            },
            setFontBold() {
                if (this.selectedElement) {
                    this.selectedElement.bold = !this.selectedElement.bold;
                    setTimeout(() => {
                        this.$store.commit('updateElementSize');
                    });
                }
            },
            setFontItalic() {
                if (this.selectedElement) {
                    this.selectedElement.italic = !this.selectedElement.italic;
                    setTimeout(() => {
                        this.$store.commit('updateElementSize');
                    });
                }
            },
            setTextAlignment(alignment) {
                if (this.selectedElement) {
                    this.selectedElement.textAnchor = alignment;
                }
            },
            setFontSize(value) {
                if (this.selectedElement) {
                    if (value === '+') {
                        this.selectedElement.fontSize++;
                    }
                    if (value === '-') {
                        this.selectedElement.fontSize--;
                    }
                    setTimeout(() => {
                        this.$store.commit('updateElementSize');
                    });
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .settings {
        margin-top: 50px;
    }
    .btn-get-price {
        margin-top: 25px;
        padding: 8px 30px;
        border-radius: 30px;
        background-color: #72b425;
        color: #fff;
        border: 0;
    }
</style>