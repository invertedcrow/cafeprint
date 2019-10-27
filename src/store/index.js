import Vuex from 'vuex';
import Vue from 'vue'

import constructor from './constructor.module';
import upload from './modules/upload'
import filter from './modules/filter'
import { SIDES } from '../consts';

Vue.use(Vuex);

const productDefault = {
    product: '',
    color: '',
    size: '',
    side: '',
    id: '',
    sides: [
        {
            key: SIDES.FRONT,
            title: 'Front',
            area: {
                x: 138,
                y: 124.966,
                width: 210,
                height: 300
            },
            preview: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/1/appearances/2,width=50,height=50,version=1564376579.png',
            image: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/1/appearances/2,width=800,height=800,version=1564376579.png'
        },
        {
            key: SIDES.BACK,
            title: 'Back',
            area: {
                x: 221.998,
                y: 77.8434,
                width: 338.853575469,
                height: 449.761634486
            },
            preview: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/2/appearances/2,width=50,height=50,version=1564376579.png',
            image: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/2/appearances/2,width=800,height=800,version=1564376579.png'
        },
        {
            key: SIDES.LEFT,
            title: 'Left',
            area: {
                x: 280,
                y: 350,
                width: 250,
                height: 300
            },
            preview: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/3/appearances/2,width=50,height=50,version=1564376579.png',
            image: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/3/appearances/2,width=800,height=800,version=1564376579.png'
        },
        {
            key: SIDES.RIGHT,
            title: 'Right',
            area: {
                x: 280,
                y: 350,
                width: 250,
                height: 300
            },
            preview: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/4/appearances/2,width=50,height=50,version=1564376579.png',
            image: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/4/appearances/2,width=800,height=800,version=1564376579.png'
        }
    ]
};
// const productFilterDefault = {
//     ...productDefault,
//     category: '',    
//     showPreview: false,    
// }

export default new Vuex.Store({
    modules: {
        constructor: constructor,
        upload,
        filter
    },
    state: {
        activeSettings: 'price',
        addText: false,
        addImg: null,
        isShowProductFilter: false, 
        isShowProductDesign: false,
      //  productPreview: {...productDefault},   
        designs: {
            list: [],  
            preview: ''          
        },
        // constructor: {
        //     items: [],
        //     selectedElement: null,
        //     selectedSide: SIDES.FRONT
        // },
        selectedProduct: {...productDefault},
        upload: {
            items: Array(10).fill({id: 0, image: ''}).map((x, index) => ({ id: index, image: require('../assets/cloud.svg')}))
        }
    },
    getters: {
        selectedSide(state) {
            return state.selectedProduct.sides.find(x => x.key === state.constructor.selectedSide);
        },
        items(state) {
            return state.constructor.items.filter(x => x.side === state.constructor.selectedSide);
        }
    },
    mutations: {
        setActiveSettings(state, value) {
           state.activeSettings = value;
        },
        setActiveColor(state, value) {
            state.selectedProduct.color = value;
        },       
        // filterResetPreview(state) {
        //     state.productPreview = {...productDefault};
        // },       
        setPreviewColor(state, value) {     
            state.productPreview.color = value;
        },
        setPreviewSize(state, value) {     
            state.productPreview.size = value;
        }, 
        setPreviewSide(state, value) {     
            state.productPreview.side = value;
        },
        showFilterModal(state, value) {
            state.isShowProductFilter = value;
        },
        setActiveProduct(state) {
            state.activeProduct = {...state.productPreview}
        },
        showDesignModal(state, value) {
            state.isShowProductDesign = value;
        }, 


        setDesigns(state, value) {
            state.designs.list = value;
        },
        setDesignPreview(state, value) {
            state.designs.preview = value;
        },


        addText(state, value) {
            state.addText = value;
        },

        addImg(state, value) {
            state.addImg = value;
        },

        addItemToConstructor(state, value) {
            state.constructor.items.push(value)
        },
        setItemsConstructor(state, value) {           
            state.constructor.items = value
        },
        setSelectedElement(state, value) {
            state.constructor.selectedElement = value;
        },
        setSelectedSide(state, value) {
            state.constructor.selectedSide = value;
        },
        updateElementSize() {},
    },
    actions: {
        searchDesign({commit}, searchParams) {
            let list = []
            if(searchParams) {
                list = [1,2,3,4,5,6,7,8,9,12,11,13,14,15,16,17]
            }

            commit("setDesigns", list)
        }
    }    
})
