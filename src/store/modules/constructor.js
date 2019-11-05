import Vue from "vue";
import {SIDES} from "../../consts";
import {
    CONSTRUCTOR_ADD_ITEM, CONSTRUCTOR_SET_ITEMS, CONSTRUCTOR_SET_SELECTED_ITEM,
    CONSTRUCTOR_SET_SELECTED_SIDE, PRODUCT_SET_COLOR, PRODUCT_SET_SIZE,
    CONSTRUCTOR_MOVE_LAYER_UP, CONSTRUCTOR_MOVE_LAYER_DOWN, CONSTRUCTOR_DELETE_ITEM, CONSTRUCTOR_SET_BASE
} from '../mutations.type';

import {
    GET_BASE
} from '../actions.type';

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
    base:  productDefault()
});

export const state = initialState;

const getters = {
  base: (state) => state.base,
  selectedElement: (state) => state.selectedElement,
  activeSize: (state) => state.base.size,
  selectedSide: (state) => state.base.sides.find(x => x.key === state.selectedSide),  
  selectedLayers: (state) => state.items.filter(item => item.selected),      
  items: (state) => state.items.filter(x => x.side === state.selectedSide),  
  renderSides: (state) => {
    const sides = state.base.sides;
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

const actions = {
    [GET_BASE]: async (state, id) => {
        const base = await Vue.axios.get(`/constructor-new/bases/${id}`)
        console.log(base)
        state.commit(CONSTRUCTOR_SET_BASE, base);
        
    }
};

const mutations = {
    [CONSTRUCTOR_SET_BASE]: (state, base) => state.base = base,
    [CONSTRUCTOR_ADD_ITEM]: (state, value) => state.items = [...state.items, value],
    [CONSTRUCTOR_SET_ITEMS]: (state, value) => state.items = value,
    [CONSTRUCTOR_SET_SELECTED_ITEM]: (state, value) => state.selectedElement = value,
    [CONSTRUCTOR_SET_SELECTED_SIDE]: (state, value) => state.selectedSide = value,
    [PRODUCT_SET_SIZE]: (state, value) => state.base.size = value,
    [PRODUCT_SET_COLOR]: (state, value) => state.base.color = value,
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