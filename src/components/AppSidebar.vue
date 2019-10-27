<template>
    <div class="sidebar">
        <template v-if="activeSidebar === Sidebar.PRODUCT">
            <sidebar-product/>
        </template>
        <template v-if="activeSidebar !== Sidebar.PRODUCT">
            <div class="sidebar-card">
                <div class="sidebar-card-body" v-bind:class="{ 'pb-0': activeSidebar === Sidebar.FONT }">
                    <template v-if="activeSidebar === Sidebar.TEXT">
                        <sidebar-text/>
                        <!--<b-button @click="randomColor" pill>Color</b-button>-->

                        <!--<b-button pill @click="setTextAlignment(TEXT_ALIGNMENT.START)"-->
                        <!--:variant="isTextAlignment(TEXT_ALIGNMENT.START) ? 'danger' : 'secondary'">Left-->
                        <!--</b-button>-->
                        <!--<b-button pill @click="setTextAlignment(TEXT_ALIGNMENT.MIDDLE)"-->
                        <!--:variant="isTextAlignment(TEXT_ALIGNMENT.MIDDLE) ? 'danger' : 'secondary'">Center-->
                        <!--</b-button>-->
                        <!--<b-button pill @click="setTextAlignment(TEXT_ALIGNMENT.END)"-->
                        <!--:variant="isTextAlignment(TEXT_ALIGNMENT.END) ? 'danger' : 'secondary'">Right-->
                        <!--</b-button>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--<div class="row mt-2">-->
                        <!--<div class="col">-->
                        <!--Font size-->
                        <!--<b-button pill @click="setFontSize('-')">-</b-button>-->
                        <!--{{fontSize}}-->
                        <!--<b-button pill @click="setFontSize('+')">+</b-button>-->
                    </template>
                    <template v-if="activeSidebar === Sidebar.FONT">
                        <sidebar-font></sidebar-font>
                    </template>
                    <template v-if="activeSidebar === Sidebar.PRICE">
                        <sidebar-price></sidebar-price>
                    </template>
                    <template v-if="activeSidebar === Sidebar.ARTICLE">
                        <sidebar-article></sidebar-article>
                    </template>
                    <template v-if="activeSidebar === Sidebar.LAYERS">
                        <sidebar-layers></sidebar-layers>
                    </template>
                </div>
            </div>
        </template>

        <button class="get-price">Узнать стоимость</button>
    </div>
</template>

<script>
    import SidebarProduct from "./SidebarProduct";
    import SidebarText from "./SidebarText";
    import SidebarFont from "./SidebarFont";
    import SidebarPrice from "./SidebarPrice";
    import {TextAlignment, Sidebar} from "../consts";
    import SidebarArticle from "./SidebarArticle";
    import SidebarLayers from "./SidebarLayers";

    export default {
        components: {
            SidebarLayers,
            SidebarArticle,
            SidebarProduct,
            SidebarFont,
            SidebarText,
            SidebarPrice
        },
        data() {
            return {
                TextAlignment,
                Sidebar
            }
        },
        computed: {
            activeSidebar() {
                return this.$store.state.activeSidebar;
            },
            selectedElement() {
                return this.$store.state.constructor.selectedElement;
            },
            // isBold() {
            //     return this.selectedElement && this.selectedElement.bold;
            // },
            // isItalic() {
            //     return this.selectedElement && this.selectedElement.italic;
            // },
            // fontSize() {
            //     return this.selectedElement && Math.round(this.selectedElement.fontSize);
            // }
        },
        methods: {
            randomColor() {
                if (this.selectedElement) {
                    this.$store.state.constructor.selectedElement.color = '#' + (function co(lor) {
                        return (lor +=
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)])
                        && (lor.length == 6) ? lor : co(lor);
                    })('');
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
    .sidebar {
        margin-top: 50px;
    }
    button.get-price {
        padding: 8px 30px;
        border-radius: 30px;
        background-color: #72b425;
        color: #fff;
        border: 0;
        &:focus, &:active {
            outline: none;
        }
    }
</style>