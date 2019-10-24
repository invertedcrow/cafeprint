<template>
    <div class="upload">
        <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">

        <div class="upload__list">
            <div v-for="(item, index) in items" @click="selectItem(item)" :key="index" class="d-flex justify-content-center upload__item">
                <img :src="item.image" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectedItem: null
            }
        },
        computed: {
            items() {
                return this.$store.state.upload.items;
            }
        },
        methods: {
            selectItem(item) {
                console.log(item);
            },
            uploadImage(event) {

                const URL = 'http://foobar.com/upload';

                let data = new FormData();
                data.append('name', 'my-picture');
                data.append('file', event.target.files[0]);

                let config = {
                    header: {
                        'Content-Type': 'image/png'
                    }
                }

                // axios.put(
                //   URL,
                //   data,
                //   config
                // ).then(
                //   response => {
                //     console.log('image upload response > ', response)
                //   }
                // )
            }
        }
    };
</script>

<style lang="scss" scoped>

    .upload {
        &__list {
            display: flex;
            flex: 1 1 auto;
            flex-wrap: wrap;
            width: calc(100% - 337px - 1rem);
        }
        &__item {
            margin: 5px;
            padding: 5px;
            border: 1px solid gray;
            background-color: #f2f2f2;
            height: 20%;
            width: 20%;

            &:hover {
                background-color: #e5e5e5;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

</style>