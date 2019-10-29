import Vuex from 'vuex';
import Vue from 'vue'

import constructor from './constructor.module';

import upload from './modules/upload';
import filter from './modules/filter';
import design from './modules/design';
import { SIDES, Sidebar } from '../consts';

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
export default new Vuex.Store({
    modules: {
        constructor: constructor,
        upload,
        filter,
        design
    },
    state: {
        activeSidebar: Sidebar.PRODUCT,
        addText: false,
        addImg: null,  
        selectedProduct: {...productDefault}
    },
    getters: {
        selectedSide(state) {
            return state.selectedProduct.sides.find(x => x.key === state.constructor.selectedSide);
        },
        items(state) {
            return state.constructor.items.filter(x => x.side === state.constructor.selectedSide);
        },
        activeSize: (state) => state.selectedProduct.size
    },
    mutations: {
        setActiveSidebar(state, value) {
           state.activeSidebar = value;
        },
        setActiveColor(state, value) {
            state.selectedProduct.color = value;
        },      
        setPreviewColor(state, value) {     
            state.productPreview.color = value;
        },
        setPreviewSize(state, value) {     
            state.productPreview.size = value;
        }, 
        setPreviewSide(state, value) {     
            state.productPreview.side = value;
        },       
        setActiveProduct(state) {
            state.activeProduct = {...state.productPreview}
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
        setSelectedSize(state, value) {
            state.selectedProduct.size = value;
        },
        updateElementSize() {},
    },
    actions: {
       
    }    
})
