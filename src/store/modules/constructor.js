import {SIDES} from "../../consts";
import {
    CONSTRUCTOR_ADD_ITEM, CONSTRUCTOR_SET_ITEMS, CONSTRUCTOR_SET_SELECTED_ITEM,
    CONSTRUCTOR_SET_SELECTED_SIDE, PRODUCT_SET_COLOR, PRODUCT_SET_SIZE,
    CONSTRUCTOR_MOVE_LAYER_UP, CONSTRUCTOR_MOVE_LAYER_DOWN, CONSTRUCTOR_DELETE_ITEM
} from '../mutations.type';

const productDefault = () => ({
    product: '',
    color: '',
    size: '',
    side: '',
    id: '',
    sides: [
        {
            items: [],
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
            items: [],
            key: SIDES.BACK,
            title: 'Back',
            area: {
                x: 138,
                y: 124.966,
                width: 210,
                height: 300
            },
            preview: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/2/appearances/2,width=50,height=50,version=1564376579.png',
            image: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/2/appearances/2,width=800,height=800,version=1564376579.png'
        },
        {
            items: [],
            key: SIDES.LEFT,
            title: 'Left',
            area: {
                x: 138,
                y: 200.966,
                width: 210,
                height: 150
            },
            preview: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/3/appearances/2,width=50,height=50,version=1564376579.png',
            image: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/3/appearances/2,width=800,height=800,version=1564376579.png'
        },
        {
            items: [],
            key: SIDES.RIGHT,
            title: 'Right',
            area: {
                x: 138,
                y: 200,
                width: 210,
                height: 150
            },
            preview: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/4/appearances/2,width=50,height=50,version=1564376579.png',
            image: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/4/appearances/2,width=800,height=800,version=1564376579.png'
        }
    ]
});

const initialState = () => ({
    items: [],
    selectedElement: null,
    selectedLayers: [],
    selectedSide: SIDES.FRONT,
    selectedProduct:  productDefault()
});

export const state = initialState;

const getters = {
  selectedProduct: (state) => state.selectedProduct,
  selectedElement: (state) => state.selectedElement,
  activeSize: (state) => state.selectedProduct.size,
  selectedSide: (state) => state.selectedProduct.sides.find(x => x.key === state.selectedSide),  
  selectedLayers: (state) => state.items.filter(item => item.selected),      
  items: (state) => state.items.filter(x => x.side === state.selectedSide),  
  renderSides: (state) => {
    const sides = state.selectedProduct.sides;
    const items = state.items;
    if (sides && sides.length) {
        for (let i = 0; i < sides.length; i++) {
            sides[i].items = items.filter(
            layer => layer.side == sides[i].key
          );
        }
      }
    return sides
  },
};

const actions = {};

const mutations = {
    [CONSTRUCTOR_ADD_ITEM]: (state, value) => state.items.push(value),
    [CONSTRUCTOR_SET_ITEMS]: (state, value) => state.items = value,
    [CONSTRUCTOR_SET_SELECTED_ITEM]: (state, value) => state.selectedElement = value,
    [CONSTRUCTOR_SET_SELECTED_SIDE]: (state, value) => state.selectedSide = value,
    [PRODUCT_SET_SIZE]: (state, value) => state.selectedProduct.size = value,
    [PRODUCT_SET_COLOR]: (state, value) => state.selectedProduct.color = value,
    [CONSTRUCTOR_DELETE_ITEM] (state, value) {
        const index = state.items.indexOf(value);
        if (index >= 0) {
            state.items = [
                ...state.items.slice(0, index),
                ...state.items.slice(index+1)
            ];
        }
    },
    [CONSTRUCTOR_MOVE_LAYER_UP]: (state, value) => {
        let foundIndex = 0;
        const index = state.items.indexOf(value);
        // Найти индекс ближайшего
        for (let i=index+1; i < state.items.length; i++) {
            if (foundIndex > 0) {
                continue;
            }
            if (state.items[i].side === value.side) {
                foundIndex = i;
            }
        }
        // Обмен
        if (foundIndex > 0) {
            const found = state.items.splice(index, 1)[0];
            state.items = [
                ...state.items.slice(0, foundIndex), found, ...state.items.slice(foundIndex)
            ];       
        }        
    },
    [CONSTRUCTOR_MOVE_LAYER_DOWN]: (state, value) => {
        let foundIndex = -1;
        const index = state.items.indexOf(value);
        // Найти индекс ближайшего
        for (let i=index-1; i >= 0; i--) {
            if (foundIndex > -1) {
                continue;
            }
            if (state.items[i].side === value.side) {
                foundIndex = i;
            }
        }
        // Обмен
        if (foundIndex > -1) {
            const found = state.items.splice(index, 1)[0];
            state.items = [
                ...state.items.slice(0, foundIndex), found, ...state.items.slice(foundIndex)
            ];       
        }       
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};