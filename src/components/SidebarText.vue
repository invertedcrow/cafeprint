<template>
    <div>

        <div class="sidebar-card-header">
            <div class="sidebar-card-header__с-icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -45 517.33333 517" width="20px">
                    <path d="m240 384.167969h-21.332031v-341.335938h128v21.335938c0 11.796875 9.535156 21.332031 21.332031 21.332031s21.332031-9.535156 21.332031-21.332031v-42.667969c0-11.796875-9.535156-21.332031-21.332031-21.332031h-346.667969c-11.796875 0-21.332031 9.535156-21.332031 21.332031v42.667969c0 11.796875 9.535156 21.332031 21.332031 21.332031s21.335938-9.535156 21.335938-21.332031v-21.335938h133.332031v341.335938h-21.332031c-11.796875 0-21.335938 9.535156-21.335938 21.332031s9.539063 21.332031 21.335938 21.332031h85.332031c11.796875 0 21.332031-9.535156 21.332031-21.332031s-9.535156-21.332031-21.332031-21.332031zm0 0"/><path d="m496 192.167969h-170.667969c-11.796875 0-21.332031 9.535156-21.332031 21.332031v37.332031c0 11.796875 9.535156 21.335938 21.332031 21.335938s21.335938-9.539063 21.335938-21.335938v-16h42.664062v149.335938h-10.664062c-11.796875 0-21.335938 9.535156-21.335938 21.332031s9.539063 21.332031 21.335938 21.332031h64c11.796875 0 21.332031-9.535156 21.332031-21.332031s-9.535156-21.332031-21.332031-21.332031h-10.667969v-149.335938h42.667969v10.667969c0 11.796875 9.535156 21.332031 21.332031 21.332031s21.332031-9.535156 21.332031-21.332031v-32c0-11.796875-9.535156-21.332031-21.332031-21.332031zm0 0"/>
                </svg>
            </div>
            <div class="sidebar-card-header__title">
                Управление текстом
            </div>
            <div class="sidebar-card-header__close">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="17px" height="17px" viewBox="0 0 357 357">
                    <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"/>
                </svg>
            </div>
        </div>

        <div class="sidebar-text__input">
            <textarea
                    v-model="text"
                    @keyup="updateInput"
                    placeholder="Your text here..."
            ></textarea>
        </div>
        <div class="sidebar-text__tools">
            <button class="sidebar-text__tools-item active">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 467.765 467.765">
                    <path d="m360.345 233.882c29.835-24.139 48.949-61.04 48.949-102.324 0-72.545-59.013-131.558-131.559-131.558h-219.264v58.471h29.235v350.824h-29.235v58.471h219.265c72.546 0 131.559-59.013 131.559-131.559-.001-41.285-19.115-78.186-48.95-102.325zm-82.61 175.412h-131.559v-146.176h131.559c40.299 0 73.088 32.79 73.088 73.088s-32.789 73.088-73.088 73.088zm0-204.647h-131.559v-146.176h131.559c40.299 0 73.088 32.79 73.088 73.088s-32.789 73.088-73.088 73.088z"/>
                </svg>
            </button>
            <button class="sidebar-text__tools-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 467.765 467.765">
                    <path d="m409.294 58.471v-58.471h-175.412v58.471h43.373l-150.352 350.823h-68.432v58.471h175.412v-58.471h-43.373l150.351-350.823z"/>
                </svg>
            </button>
            <button class="sidebar-text__tools-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409.294 409.294">
                    <path id="path-1_357_" d="m0 116.941h292.353v58.471h-292.353z" transform="translate(1 5)"/>
                    <path id="path-2_27_" d="m0 233.882h409.294v58.471h-409.294z" transform="translate(1 9)"/>
                    <path id="path-1_356_" d="m0 350.824h292.353v58.471h-292.353z" transform="translate(1 13)"/>
                    <path id="path-2_26_" d="m0 0h409.294v58.471h-409.294z" transform="translate(1 1)"/>
                </svg>
            </button>
            <button class="sidebar-text__tools-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409.294 409.294">
                    <path id="path-1" d="m58.471 116.941h292.353v58.471h-292.353z" transform="translate(3 5)"/>
                    <path id="path-2" d="m0 233.882h409.294v58.471h-409.294z" transform="translate(1 9)"/>
                    <path id="path-1_1_" d="m58.471 350.824h292.353v58.471h-292.353z" transform="translate(3 13)"/>
                    <path id="path-2_1_" d="m0 0h409.294v58.471h-409.294z" transform="translate(1 1)"/>
                </svg>
            </button>
            <button class="sidebar-text__tools-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409.294 409.294">
                    <path id="path-1_5_" d="m116.941 116.941h292.353v58.471h-292.353z" transform="translate(5 5)"/>
                    <path id="path-2_5_" d="m0 233.882h409.294v58.471h-409.294z" transform="translate(1 9)"/>
                    <path id="path-1_4_" d="m116.941 350.824h292.353v58.471h-292.353z" transform="translate(5 13)"/>
                    <path id="path-2_4_" d="m0 0h409.294v58.471h-409.294z" transform="translate(1 1)"/>
                </svg>
            </button>
            <button class="sidebar-text__tools-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409.294 409.294">
                    <path id="path-1_97_" d="m0 116.941h409.294v58.471h-409.294z" transform="translate(1 5)"/>
                    <path id="path-1_96_" d="m0 233.882h409.294v58.471h-409.294z" transform="translate(1 9)"/>
                    <path d="m0 350.824h292.353v58.471h-292.353z"/>
                    <path id="path-1_95_" d="m0 0h409.294v58.471h-409.294z" transform="translate(1 1)"/>
                </svg>
            </button>
        </div>
        <hr class="mb-0">

        <div class="sidebar-text__font-select" @click="fontSelect()">
            Arial
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 451.847 451.847">
                    <path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0   c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744   c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"/>
                </svg>
            </span>
        </div>
        <hr class="mt-0">

        <div class="sidebar-text__colors">
            <div class="settings-text__colors-label">Цвет:</div>
            <Color :colors="colors"></Color>
        </div>
        <hr class="sidebar-text__line-colors-bottom">

        <div class="sidebar-text__font-size">
            Размер текста
            <number-input :min="1" v-model="fontSize"></number-input>
        </div>
        <hr>

        <div class="sidebar-text__layer-tools">
            <div class="sidebar-text__layer-tools-item">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
                    <path d="M369.1,142.9V0H0v369.1h142.9V512H512V142.9H369.1z M178.6,257.4l78.8-78.8h36.5L178.6,293.9V257.4z M178.6,226.6v-48h48  L178.6,226.6z M178.6,324.7l146.1-146.1h38L178.6,362.7V324.7z M178.6,393.5l214.9-214.9h38L178.6,431.5V393.5z M142.9,142.9v190.5  H35.7V35.7h0h297.7v107.2H142.9z M178.6,462.3l283.7-283.7h14v24L202.6,476.3h-24V462.3z M476.3,271.4L273.7,476.3h-40.3  l242.9-242.9V271.4z M476.3,302.4v37.7L340.1,476.3h-35.9L476.3,302.4z M476.3,370.9V409l-66.8,67.2h-38.6L476.3,370.9z   M440.2,476.3l36.1-36.3v36.3H440.2z"/>
                </svg><br>
                На передний план
            </div>
            <div class="sidebar-text__layer-tools-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M142.9,369.1V512H512V142.9H369.1V0H0v369.1H142.9z M476.3,178.6v297.7H178.6V178.6L476.3,178.6L476.3,178.6z M35.7,35.7  h297.7v107.2H142.9v190.5H35.7L35.7,35.7L35.7,35.7z"/>
                    <rect x="53.9" y="-12.2" transform="matrix(0.7071 0.7071 -0.7071 0.7071 64.7976 -26.8357)" width="21.8" height="154.1"/>
                    <rect x="85.1" y="-25.5" transform="matrix(0.7071 0.7071 -0.7071 0.7071 99.4768 -38.2975)" width="21.8" height="252.9"/>
                    <rect x="118.5" y="-34.1" transform="matrix(0.7071 0.7071 -0.7071 0.7071 134.2797 -51.5417)" width="21.8" height="340.8"/>
                    <polygon points="11.4,338.4 2,316 311.3,7.8 326.7,23.2 "/>
                    <polygon points="58.8,359.8 43.4,344.4 166.8,221.1 161.9,256.7 "/>
                    <polygon points="123.4,366.5 108,351.1 156.7,299.6 172.1,315 "/>
                    <polygon points="244.5,173.1 229.1,157.7 358,30.9 353.1,66.5 "/>
                    <polygon points="320,166 304.6,150.6 342.8,114.8 358.2,130.2 "/>
                </svg><br>
                На задний план
            </div>
            <div class="sidebar-text__layer-tools-item">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
                    <path d="M496,128c8.832,0,16-7.168,16-16V16c0-8.832-7.168-16-16-16h-96c-8.832,0-16,7.168-16,16v32H128V16    c0-8.832-7.168-16-16-16H16C7.168,0,0,7.168,0,16v96c0,8.832,7.168,16,16,16h32v256H16c-8.832,0-16,7.168-16,16v96    c0,8.832,7.168,16,16,16h96c8.832,0,16-7.168,16-16v-32h256v32c0,8.832,7.168,16,16,16h96c8.832,0,16-7.168,16-16v-96    c0-8.832-7.168-16-16-16h-32V128H496z M32,96V32h64v64H32z M96,480H32v-64h64V480z M384,400v32H128v-32c0-8.832-7.168-16-16-16H80    V128h32c8.832,0,16-7.168,16-16V80h256v32c0,8.832,7.168,16,16,16h32v256h-32C391.168,384,384,391.168,384,400z M480,416v64h-64    v-64H480z M416,96V32h64v64H416z"/>
                </svg><br>
                Область печати
            </div>
            <div class="sidebar-text__layer-tools-item">
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                    <path d="M368.64,0H20.48C9.175,0,0,9.175,0,20.48v348.16c0,11.305,9.175,20.48,20.48,20.48h348.16    c11.305,0,20.48-9.175,20.48-20.48V20.48C389.12,9.175,379.945,0,368.64,0z M348.16,348.16H40.96V40.96h307.2V348.16z"/>
                    <path d="M471.04,419.84v51.2h-51.2V512h71.68c11.305,0,20.48-9.175,20.48-20.48v-71.68H471.04z"/>
                    <rect x="262.349" y="471.04" width="110.182" height="40.96"/>
                    <path d="M163.84,471.04v-51.2h-40.96v71.68c0,11.305,9.175,20.48,20.48,20.48h71.68v-40.96H163.84z"/>
                    <path d="M491.52,122.88h-71.68v40.96h51.2v51.2H512v-71.68C512,132.055,502.825,122.88,491.52,122.88z"/>
                    <rect x="471.04" y="262.349" width="40.96" height="110.182"/>
                </svg><br>
                Дублировать
            </div>
            <div class="sidebar-text__layer-tools-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-18 0 511 512">
                    <path d="m454.5 76c-6.28125 0-110.601562 0-117 0v-56c0-11.046875-8.953125-20-20-20h-160c-11.046875 0-20 8.953125-20 20v56c-6.398438 0-110.703125 0-117 0-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h37v376c0 11.046875 8.953125 20 20 20h320c11.046875 0 20-8.953125 20-20v-376h37c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20zm-277-36h120v36h-120zm200 432h-280v-356h280zm-173.332031-300v244c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-244c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm106.664062 0v244c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-244c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm0 0"/>
                </svg><br>
                Удалить
            </div>
        </div>
    </div>
</template>

<script>
    import Color from './Color';
    import NumberInput from './NumberInput';

    export default {
        components: {
            Color,
            NumberInput
        },
        data() {
            return {
                colors: ["tomato", "green", "gold", "gray"],
                text: "",
                fontSize: 1
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
                setTimeout(() => {
                    this.$store.commit("setItemsConstructor", this.items);
                })
            },
            fontSelect() {
                this.$store.commit('setActiveSettings', 'font-select');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .sidebar-text {
        &__line-colors-bottom {
            margin-top: 5px;
        }

        &__input {
            margin-top: 20px;
            textarea {
                display: block;
                border: 1px dashed rgb(225, 225, 225);
                border-radius: 8px;
                width: 100%;
                height: 100px;
                font-size: 14px;
                color: #98a0af;
                padding: 6px;

                &:focus, &:active {
                    outline: none;
                }
            }
        }

        &__tools {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;

            &-item {
                display: block;

                width: 38px;
                height: 38px;
                border: 1px solid rgb(208, 208, 208);
                border-radius: 6px;
                line-height: 0;
                background-color: #fff;

                svg {
                    width: 16px;
                    height: 16px;
                    fill: #999999;
                }

                &:focus, &:active {
                    outline: none;
                }
                &:hover {
                    border-color: #81b241;
                    svg {
                        fill: #81b241;
                    }
                }

                &.active {
                    background-color: #81b241;
                    border-color: #81b241;
                    svg {
                        fill: #fff;
                    }
                }
            }
        }

        &__colors-label {
            font-size: 14px;
            margin-bottom: 10px;
        }

        &__font-size {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
        }

        &__font-select {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            font-weight: 600;
            padding: 20px;
            margin-left: -20px;
            margin-right: -20px;
            cursor: pointer;

            span {
                cursor: pointer;
                svg {
                    fill: #81b241;
                    height: 16px;
                    width: auto;
                    -webkit-transform: rotate(180deg);
                    -moz-transform: rotate(180deg);
                    -ms-transform: rotate(180deg);
                    -o-transform: rotate(180deg);
                    transform: rotate(180deg);
                }
            }

            &:hover {
                background-color: #f7f7f7;
            }
        }

        &__layer-tools {
            display: flex;
            justify-content: space-between;

            &-item {
                display: block;
                max-width: 60px;
                font-size: 10px;
                text-align: center;
                color: #929292;
                line-height: 1.2;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                cursor: pointer;

                svg {
                    margin-bottom: 12px;
                    width: 20px;
                    height: 20px;
                    fill: #999999;
                }

                &:hover {
                    color: #81b241;
                    svg {
                        fill: #81b241;
                    }
                }
            }
        }
    }
</style>