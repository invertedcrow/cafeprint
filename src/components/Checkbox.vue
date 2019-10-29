<template>
    <span>
        <input @click="onCheckboxClick" v-model="innerValue" class="inp-cbx" type="checkbox" style="display: none">
        <label class="cbx" @click="onLabelClick">
          <span>
            <!--<svg width="12px" height="10px" viewbox="0 0 12 10">-->
              <!--<polyline points="1.5 6 4.5 9 10.5 1"/>-->
            <!--</svg>-->
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512">
                  <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z"/>
              </svg>

          </span>
          <span v-if="label">{{label}}</span>
        </label>
    </span>
</template>

<script>
    export default {
        data() {
            return {
                innerValue: false
            }
        },
        props: ['label', 'value'],
        name: "Checkbox",
        methods: {
            onLabelClick() {
                this.innerValue = !this.innerValue;
                this.$emit('input', this.innerValue);
            },
            onCheckboxClick() {
                // this.$emit('input', this.innerValue);
            }
        },
        created() {
            this.innerValue = this.value;
        }
    }
</script>

<style lang="scss" scoped>
    .cbx {
        /*margin: auto;*/
        -webkit-user-select: none;
        user-select: none;
        cursor: pointer;
        margin-bottom: 4px;

        span {
            display: inline-block;
            vertical-align: middle;
            /*transform: translate3d(0,0,0);*/
            &:first-child {
                position: relative;
                width: 20px;
                height: 20px;
                border-radius: 3px;
                /*transform: scale(1);*/
                vertical-align: middle;
                border: 1px solid #747474;
                /*transition: all .2s ease;*/
                svg {
                    width: 14px;
                    height: 14px;
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    fill: none;
                    /*stroke: #FFFFFF;*/
                    /*stroke-width: 2;*/
                    /*stroke-linecap: round;*/
                    /*stroke-linejoin: round;*/
                    /*stroke-dasharray: 16px;*/
                    /*stroke-dashoffset: 16px;*/
                    /*transition: all .3s ease;*/
                    /*transition-delay: .1s;*/
                    /*transform: translate3d(0,0,0);*/
                }
                /*&:before {*/
                    /*content: "";*/
                    /*width: 100%;*/
                    /*height: 100%;*/
                    /*background: #506EEC;*/
                    /*display: block;*/
                    /*!*transform: scale(0);*!*/
                    /*opacity: 1;*/
                    /*border-radius: 50%;*/
                /*}*/
            }
            &:last-child {
                padding-left: 8px;
            }
        }
        &:hover span:first-child {
            border-color: #81b241
        }
    }

    .inp-cbx:checked + .cbx {
        span {
            &:first-child {
                background: #81b241;
                border-color: #81b241;
                svg {
                    fill: #fff;
                    /*stroke-dashoffset: 0;*/
                }
            }
        }
    }
</style>