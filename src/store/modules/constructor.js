import Vue from "vue";
import {
    CONSTRUCTOR_ADD_ITEM, CONSTRUCTOR_SET_ITEMS, CONSTRUCTOR_SET_SELECTED_ITEM,
    CONSTRUCTOR_SET_SELECTED_SIDE, CONSTRUCTOR_SET_COLOR, CONSTRUCTOR_SET_SIZE,
    CONSTRUCTOR_MOVE_LAYER_UP, CONSTRUCTOR_MOVE_LAYER_DOWN, CONSTRUCTOR_DELETE_ITEM, CONSTRUCTOR_SET_BASE, CONSTRUCTOR_SET_FONTS
} from '../mutations.type';

import {
    GET_BASE,
    GET_FONTS
} from '../actions.type';

import { API_URL } from '../../consts';

const initialBase = () => ({
    addPriceGroups: [],
    category: {},
    category_id: "",
    colorMainBlanks: [],
    colors: [],
    defaultColor: null,
    description: "",
    features: [],
    id: "",
    ignoreSizes: [],
    images: [],
    is_default: "",
    is_enabled: "",
    layers_opacity: "",
    male: "",
    manufacture_price: "",
    name: "",
    position: "",
    preview_image: "",
    printSizeMainblanks: [],
    printSizes: [],
    show_in_constructor: "",
    sides: [],
    size_image: "",
    sizes: [],
    uname: "",
    vendor_code: ""
})
const initialState = () => ({
    items: [],
    selectedElement: {},
    selectedLayers: [],
    side: {id: 123},
    size: {},
    baseColor: {},    
    fonts: [],
    base:  initialBase()
});

export const state = initialState;

const getters = {
  base: (state) => state.base,
  color: (state) => state.baseColor,
  fonts: (state) =>  state.fonts,
  baseImg: (state) => {
    const currentImg = state.base.images.find(item => item.sidemainblank_id == state.side.id && item.colormainblank_id == state.baseColor.id);
    if(currentImg) {
        return  (API_URL + '/' + currentImg.url)
    }    
  },
  selectedElement: (state) => state.selectedElement,
  size: (state) => state.size,
  side: (state) => state.side,  
  description: (state) => state.base.description,
  selectedLayers: (state) => state.items.filter(item => item.selected),      
  items: (state) => state.items.filter(x => x.side === state.side.id),  
  renderSides: (state) => {
    const sides = state.base.sides;
    const items = state.items;
    if (sides && sides.length) {
        for (let i = 0; i < sides.length; i++) {
            sides[i].items = items.filter(
            layer => layer.side.id == sides[i].id
          );
          const sideImg = state.base.images.find(item => item.sidemainblank_id == sides[i].id && item.colormainblank_id == state.baseColor.id);
            if(sideImg) {
                sides[i].image = API_URL + '/' + sideImg.url;
            } 
        }
      }
    return sides
  },
};

const actions = {
    [GET_BASE]: async (state, id) => {
        const base = await Vue.axios.get(`/constructor-new/bases/${id}`)
       
        state.commit(CONSTRUCTOR_SET_BASE, base.data);
        state.commit(CONSTRUCTOR_SET_SELECTED_SIDE, base.data.sides[0]);
        state.commit(CONSTRUCTOR_SET_COLOR, base.data.colors[0]);
        state.commit(CONSTRUCTOR_SET_SIZE, base.data.sizes[0])
        console.log(state.state)
        
    },
    [GET_FONTS]: async (state) => {
        const fonts = await Vue.axios.get('/constructor-new/fonts');
 
        state.commit(CONSTRUCTOR_SET_FONTS, fonts.data)
    }
};

const mutations = {
    [CONSTRUCTOR_SET_BASE]: (state, base) => state.base = base,
    [CONSTRUCTOR_ADD_ITEM]: (state, value) => state.items = [...state.items, value],
    [CONSTRUCTOR_SET_ITEMS]: (state, value) => state.items = value,
    [CONSTRUCTOR_SET_SELECTED_ITEM]: (state, value) => state.selectedElement = value,
    [CONSTRUCTOR_SET_SELECTED_SIDE]: (state, value) => state.side = value,
    [CONSTRUCTOR_SET_SIZE]: (state, value) => state.size = value,
    [CONSTRUCTOR_SET_COLOR]: (state, value) => state.baseColor = value,
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
    [CONSTRUCTOR_SET_FONTS]: (state, value) => state.fonts = value,
};

export default {
    state,
    getters,
    actions,
    mutations
};