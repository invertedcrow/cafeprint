import Vue from "vue";
import {
    CONSTRUCTOR_ADD_ITEM, CONSTRUCTOR_SET_ITEMS, CONSTRUCTOR_SET_SELECTED_ITEM,
    CONSTRUCTOR_SET_SELECTED_SIDE, CONSTRUCTOR_SET_COLOR, CONSTRUCTOR_SET_SIZE,
    CONSTRUCTOR_MOVE_LAYER_UP, CONSTRUCTOR_MOVE_LAYER_DOWN, CONSTRUCTOR_DELETE_ITEM, CONSTRUCTOR_SET_BASE, CONSTRUCTOR_SET_FONTS, PRICE_SET_SIZES_LIST,
    CONSTRUCTOR_SET_PRINT_SIZE, SIDEBAR_SET_ACTIVE, CONSTRUCTOR_SET_MAX_PRINT_SIZE, CONSTRUCTOR_SET_LOADING, CONSTRUCTOR_SET_SIDE_INVALID,
    CONSTRUCTOR_SET_EDIT_PRODUCT, CONSTRUCTOR_SET_EDIT_PROFILE_PRODUCT, CONSTRUCTOR_SET_EDIT_CART_PRODUCT, CONSTRUCTOR_SET_FEATURES, CONSTRUCTOR_RESET_FEATURES, CONSTRUCTOR_SET_EDIT_ORDER_PRODUCT, CONSTRUCTOR_SET_SELECTED_LAYERS_SIDE, CONSTRUCTOR_SET_ALL_ITEMS_PARAMS, CONSTRUCTOR_CHECK_PRINTSIZES_SIDES
} from '../mutations.type';

import {
    GET_BASE,
    GET_FONTS
} from '../actions.type';

import { API_URL, Sidebar } from '../../consts';

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
    selectedLayersSide: null,
    side: {id: 123},
    size: {},
    printSize: {},
    baseColor: {},    
    fonts: [],
    maxPrintSize: null,
    isLoading: true,
    base:  initialBase(),
    editProduct: null,
    editProfileProduct: null,
    editCartProduct: null,
    editOrderProduct: null,
    features: [],
    allItemsParams: null
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
  size: (state) => {
      if(!state.size && state.side) {
          let size = {
            width: state.side.real_width,
            height: state.side.real_height
          }
          return size;
      }
      return state.size;
  },
  baseSizes: (state) => state.base.sizes,
  printSize: (state) => state.printSize,
  side: (state) => {
    let side = {...state.side };
    if(!side.items || !side.items.length ) {
        side.printSize = null
    }
    return side
  },  
  description: (state) => state.base.description,
  selectedLayers: (state) => state.items.filter(item => item.selected),      
  items: (state) => state.items, 
  renderSides: (state) => {
    const sides = state.base.sides;
    const items = state.items;
    if (sides && sides.length) {
        for (let i = 0; i < sides.length; i++) {
            sides[i].items = items.filter(
            layer => layer.side == sides[i].id
          );
          const sideImg = state.base.images.find(item => item.sidemainblank_id == sides[i].id && item.colormainblank_id == state.baseColor.id);
            if(sideImg) {
                sides[i].image = API_URL + '/' + sideImg.url;
            } 
        }
      }
    return sides
  },
  sidesList: (state) => state.base.sides,
  maxPrintSize: (state) => state.maxPrintSize,
  isLoading: (state) => state.isLoading,
  isValid: (state) => {
        if(state.base) {
            let findInvalid = state.base.sides.find(item => item.invalid);
            if(findInvalid && state.maxPrintSize) {
                return false
            }

      return true
      }
      
  },
  editProduct: (state) => state.editProduct,
  editProfileProduct: (state) => state.editProfileProduct,
  editCartProduct: (state) => state.editCartProduct,
  editOrderProduct: (state) => state.editOrderProduct,
  baseFeatures: (state) => state.base.features,
  features: (state) => state.features,
  selectedLayersSide: (state) => state.selectedLayersSide,
  allItemsParams: (state) => state.allItemsParams
};

const actions = {
    [GET_BASE]: async (state, id) => {
        state.commit(CONSTRUCTOR_SET_LOADING, true);
        const base = await Vue.axios.get(`/constructor-new/bases/${id}`)
             
        if(state.state.items.length) {
            let renSides = [...state.getters.renderSides]     
            let sides = [...base.data.sides];           

            let items =[]
            if(renSides && renSides.length) {
                sides.forEach((item, i) => {
                    if(renSides[i]) {
                        renSides[i].items.forEach((layer) => {
                            layer.side = item.id
                            layer.sideName = item.name
                            items.push(layer)
                        })
                    }
                })
            }
           
            state.commit(CONSTRUCTOR_SET_ITEMS, items)
        }      
        
        state.commit(CONSTRUCTOR_SET_BASE, base.data);
        state.commit(CONSTRUCTOR_SET_SELECTED_SIDE, base.data.sides[0]);
        state.commit(CONSTRUCTOR_SET_COLOR, base.data.colors[0]);
        state.commit(CONSTRUCTOR_SET_SIZE, base.data.sizes[0])
        state.commit(PRICE_SET_SIZES_LIST, base.data.sizes);
        state.commit(SIDEBAR_SET_ACTIVE, Sidebar.PRODUCT);
        state.commit(CONSTRUCTOR_SET_MAX_PRINT_SIZE, base.data.printSizes)

        if(base.data.features && base.data.features.length) {
            let features = base.data.features;
            features.forEach((item, index) => {
                if(item.values) {
                    item.values.forEach(val => {
                        if(val.is_default == '1') {
                            state.commit(CONSTRUCTOR_SET_FEATURES, {index, id: val.id});
                        }
                    })
                }
                
            })
        } else {
            state.commit(CONSTRUCTOR_RESET_FEATURES);
        }
        cleanUri();
        state.commit(CONSTRUCTOR_SET_EDIT_PRODUCT, null)
        state.commit(CONSTRUCTOR_SET_LOADING, false)
       // console.log(state.state)
    },
    [GET_FONTS]: async (state) => {
        const fonts = await Vue.axios.get('/constructor-new/fonts');
 
        state.commit(CONSTRUCTOR_SET_FONTS, fonts.data)
    }   
};

const mutations = {
    [CONSTRUCTOR_SET_BASE]: (state, base) => state.base = base,
    [CONSTRUCTOR_ADD_ITEM]: (state, value) => state.items = [...state.items, {...value}],
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
    [CONSTRUCTOR_SET_PRINT_SIZE]: (state, value) => {
        let index = state.base.sides.findIndex(item => item.id == value.sideId);
        let side = {...state.base.sides[index]};       
        if(side) {
            side.printSize = value.printSize
        }
        state.base.sides = [...state.base.sides.slice(0, index), side, ...state.base.sides.slice(index + 1)] 
        state.side = side;       
    },
    [CONSTRUCTOR_SET_MAX_PRINT_SIZE]: (state, sizes) => {        
        state.maxPrintSize = sizes[0]
    },
    [CONSTRUCTOR_SET_LOADING]: (state, isLoading) => state.isLoading = isLoading,
    [CONSTRUCTOR_SET_SIDE_INVALID]: (state, side) => {
        let sides = state.base.sides.slice();
        sides.forEach(item => {
            if(item.id == side.id) {
                item.invalid = side.invalid
            }
        })
        state.base.sides = sides;
    },
    [CONSTRUCTOR_SET_EDIT_PRODUCT]: (state, product) => state.editProduct = product,
    [CONSTRUCTOR_SET_FEATURES]: (state, feature) => {
        let feat = state.features.slice();
        if(feature.index != undefined) {
            feat[feature.index] = feature.id;
            state.features = feat;
        }       
    },
    [CONSTRUCTOR_RESET_FEATURES]: (state) => state.features = [],
    [CONSTRUCTOR_SET_EDIT_PROFILE_PRODUCT]: (state, product) => state.editProfileProduct = product,
    [CONSTRUCTOR_SET_EDIT_CART_PRODUCT]: (state, product) => state.editCartProduct = product,
    [CONSTRUCTOR_SET_EDIT_ORDER_PRODUCT]: (state, product) => state.editOrderProduct = product,
    [CONSTRUCTOR_SET_SELECTED_LAYERS_SIDE]: (state, id) => state.selectedLayersSide = id,
    [CONSTRUCTOR_SET_ALL_ITEMS_PARAMS]: (state, params) => state.allItemsParams = params,
    [CONSTRUCTOR_CHECK_PRINTSIZES_SIDES]: (state, id) => {
        state.isLoading = true;

        let sides = state.base.sides;
        let previewSide = sides.find(item => item.id == id)
        sides.forEach(side => {
            if(side.id != id) {
                state.side = side
            }            
        })
        setTimeout(() => {
             state.side = previewSide;
             state.isLoading = false;
        }, 100); 
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};

function cleanUri() {
    const uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
        const clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    }
}
