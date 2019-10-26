<template>
    <span class="number-input">
        <button @click="decrement">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 1">
            <rect width="15" height="1" rx="0.5" fill="#011129"/>
            </svg>
        </button>
        <input :value="innerValue" @keypress="onKeyPress" @keyup="onKeyUp">
        <button @click="increment">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <path d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216    v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"/>
            </svg>
        </button>
    </span>
</template>

<script>
    export default {
        data() {
            return {
                innerValue: 0
            }
        },
        props: ['value', 'min', 'max', 'pattern'],
        name: "NumberInput",
        methods: {
            onKeyUp(evt) {
                this.innerValue = evt.target.value;
                this.emitValue();
            },
            onKeyPress(evt) {
                const pattern = this.pattern || /[0-9.]+/;
                if (!pattern.test(evt.key)) {
                    evt.preventDefault();
                }
            },
            increment() {
                this.innerValue = +this.innerValue >= +this.max ? this.innerValue : +this.innerValue + 1;
                this.emitValue();
            },
            decrement() {
                this.innerValue = +this.innerValue <= +this.min ? this.innerValue : +this.innerValue - 1;
                this.emitValue();
            },
            emitValue() {
                this.$emit('input', this.innerValue);
            }
        },
        created() {
            this.innerValue = this.value;
        }
    }
</script>

<style lang="scss" scoped>
    .number-input {
        display: flex;
        align-items: center;

        input {
            border: 1px solid rgb(208, 208, 208);
            width: 70px;
            height: 30px;
            border-radius: 12px;
            text-align: center;
            margin: 0 15px;
            font-size: 16px;
            font-weight: 600;
            &:focus, &:active {
                outline: none;
            }
        }
        button {
            background-color: transparent;
            padding: 0;
            border: 0;
            line-height: 0;

            svg {
                width: 15px;
                height: 15px;
            }
            &:active, &:focus {
                outline: none;
            }
        }
    }
</style>
