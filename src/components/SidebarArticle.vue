<template>
    <div class="sidebar-article">
        <div class="sidebar-card-header">
            <div @click="back()" class="sidebar-card-header__icon">
                <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 451.847 451.847">
                    <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0   c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744   c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"/>
                </svg>
            </div>
            <div class="sidebar-card-header__title">
                Подробности об артикуле
            </div>
            <div @click="close()" class="sidebar-card-header__close">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="17px" height="17px" viewBox="0 0 357 357">
                    <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"/>
                </svg>
            </div>
        </div>

        <div class="sidebar-article__item-price">
            <div class="sidebar-article__group-title">Стоимость изделия</div>
            <div class="sidebar-article__item-price__item">
                <div class="sidebar-article__item-price__item-name">Мужская футболка возможно название длинное</div>
                <div class="sidebar-article__item-price__item-price">150 UAH</div>
            </div>
        </div>
        <hr>

        <div class="sidebar-article__prints">
            <div class="sidebar-article__group-title sidebar-article__prints-label">Стоимость принтов</div>
            <template v-for="(side, index) in sides">
                <div :key="index" v-if="filteredItems(side.id).length">
                    <div class="sidebar-article__prints-side-name">{{side.label}}</div>
                    <ul class="sidebar-article__prints-list">
                        <li :key="index" v-for="(el, index) in filteredItems(side.id)">
                            <div v-if="el.type === 'text'">
                                <span class="sidebar-article__prints-list__text-mark"><span>T</span></span>
                                <span class="sidebar-article__prints-list__text">{{el.text}}</span>
                            </div>
                            <img v-if="el.type === 'image'" :src="el.image">

                            <div class="sidebar-article__prints-list__price">
                                <span v-if="el.price > 0">{{el.price}} UAH</span>
                                <span class="sidebar-article__prints-list__price-free" v-if="el.price === 0">Бесплатно</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </template>
        </div>

        <div class="sidebar-article__printing">
            <div class="sidebar-article__group-title sidebar-article__printing-label">Стоимость печати</div>
            <div class="sidebar-article__printing__item">
                <div class="sidebar-article__printing__item-name">Размер печати А4</div>
                <div class="sidebar-article__printing__item-price">150 UAH</div>
            </div>
        </div>
        <hr>

        <div class="sidebar-article__group-title">
            Стоимость изделия: 350 UAH
        </div>
    </div>
</template>

<script>
    import {Sidebar, SIDES} from '../consts';
    import {eventBus} from "../main";

    export default {
        name: "SidebarArticle",
        data() {
            return {
                items: [
                    {
                        side: SIDES.FRONT,
                        type: 'image',
                        image: require('../assets/cloud.svg'),
                        price: 50
                    },
                    {
                        side: SIDES.FRONT,
                        type: 'text',
                        text: 'Halo',
                        price: 0
                    },
                    {
                        side: SIDES.BACK,
                        type: 'image',
                        image: require('../assets/cloud.svg'),
                        price: 20
                    },
                    {
                        side: SIDES.BACK,
                        type: 'image',
                        image: require('../assets/cloud.svg'),
                        price: 20
                    },
                    {
                        side: SIDES.BACK,
                        type: 'text',
                        text: 'Halo',
                        price: 0
                    },
                ]
            }
        },
        computed: {
            sides() {
                return Object.keys(SIDES).map(x => ({
                    id: SIDES[x],
                    label: SIDES[x] === SIDES.FRONT ? 'Перед' : SIDES[x] === SIDES.BACK ? 'Спина' : SIDES[x] === SIDES.LEFT ? 'Лево' : 'Право'
                }));
            }
        },
        methods: {
            back() {
                this.$store.commit('setActiveSidebar', Sidebar.PRICE);
            },
            filteredItems(side) {
                return this.items.filter(x => x.side === side);
            },
            close() {
                this.$store.commit('setActiveSidebar', Sidebar.PRODUCT);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar-article {
        $font-gray: #7d8695;

        .sidebar-card-header__icon {
            cursor: pointer;
        }

        .sidebar-card-header {
            margin-bottom: 20px;
        }

        &__group {
            &-title {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 15px;
            }
        }

        &__item-price, &__printing {
            &__item {
                display: flex;
                justify-content: space-between;

                &-name {
                    font-size: 14px;
                    color: $font-gray;
                }
                &-price {
                    min-width: 72px;
                    font-size: 14px;
                    font-weight: 500;
                    text-align: right;
                }
            }
        }

        &__prints {
            &-label {
                margin-bottom: 0;
            }
            &-side-name {
                font-weight: 500;
                font-size: 14px;
                margin-bottom: 10px;
                margin-top: 15px;
                color: $font-gray
            }
            &-list {
                border-top: 1px solid #ebebeb;
                li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    /*padding: 10px 0;*/
                    height: 60px;
                    border-bottom: 1px solid #ebebeb;
                    img {
                        max-width: 200px;
                        max-height: 35px;
                    }
                }

                &__price {
                    font-size: 14px;
                    font-weight: 500;
                    text-transform: uppercase;
                    &-free {
                        color: #81b241;
                    }
                }

                &__text {

                }
                &__text-mark {
                    margin-right: 20px;
                    position: relative;
                    span {
                        font-size: 25px;
                        /*font-weight: 300;*/
                        position: absolute;
                        top: -8px
                    }
                }
            }
        }

        &__printing {
            &-label {
                margin-top: 20px;
            }
        }
    }
</style>