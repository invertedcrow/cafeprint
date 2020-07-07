import Vue from "vue";
import { BLANKLOAD_GET, BLANKLOAD_CART_GET, BLANKLOAD_PROFILE_GET, BLANKLOAD_ORDER_GET, CONSTRUCTOR_LOAD_RESOURCES, GET_BASES_CATEGORIES, GET_DESIGN_CATEGORIES, GET_DESIGN, GET_FONTS, USER_GET_ROLE } from '../actions.type';
import {      
    CONSTRUCTOR_SET_LOADING, 
    CONSTRUCTOR_SET_BASE, 
    CONSTRUCTOR_SET_SELECTED_SIDE, 
    CONSTRUCTOR_SET_COLOR, 
    CONSTRUCTOR_SET_SIZE, 
    PRICE_SET_SIZES_LIST, 
    CONSTRUCTOR_SET_MAX_PRINT_SIZE,
    CONSTRUCTOR_SET_EDIT_PRODUCT,
    CONSTRUCTOR_SET_ITEMS,
    CONSTRUCTOR_SET_EDIT_PROFILE_PRODUCT,
    CONSTRUCTOR_SET_EDIT_CART_PRODUCT,
    CONSTRUCTOR_SET_EDIT_ORDER_PRODUCT,
    CONSTRUCTOR_SET_FEATURES,
    CONSTRUCTOR_RESET_FEATURES,
    CONSTRUCTOR_CHECK_PRINTSIZES_SIDES
 } from '../mutations.type';

import renderSvg from '../../utils/renderSvg';

const initialState = () => ({
    sidesElems: []
})

const state =  initialState();

const getters = {
    
}

const actions = {
   [BLANKLOAD_GET]: async (context, id) => {
    context.commit(CONSTRUCTOR_SET_LOADING, true);
    const response = await Vue.axios.get(`constructor-new/clip-arts/products/${id}`)   
    const base = response.data.mainBlank;
    const prints = response.data.prints;
    const color = response.data.preview_colormainblank_id;
    const blankColor = base.colorMainBlanks.find(item => item.id == color);  
    
    //set default features 
    if(base.features && base.features.length) {
        let features = base.features;
        features.forEach((item, index) => {
            if(item.values) {
                item.values.forEach(val => {
                    if(val.is_default == '1') {
                        context.commit(CONSTRUCTOR_SET_FEATURES, {index, id: val.id});
                    }
                })
            }
            
        })
    } else {
        context.commit(CONSTRUCTOR_RESET_FEATURES);
    }

    context.commit(CONSTRUCTOR_SET_ITEMS, [])
    context.commit(CONSTRUCTOR_SET_EDIT_PRODUCT, id);
    context.commit(CONSTRUCTOR_SET_BASE, base);
    context.commit(CONSTRUCTOR_SET_SELECTED_SIDE, base.sides[0]);
    context.commit(CONSTRUCTOR_SET_COLOR, blankColor || base.colors[0]);
   
    context.commit(PRICE_SET_SIZES_LIST, base.sizes);   
    context.commit(CONSTRUCTOR_SET_MAX_PRINT_SIZE, base.printSizes);
    let sizeId = Object.values(prints)[0].size_id;

    let size = base.sizes.find(item => item.id == sizeId);
    if(size) {
        context.commit(CONSTRUCTOR_SET_SIZE, size)
    } else {
        context.commit(CONSTRUCTOR_SET_SIZE, base.sizes[0])
    }

    for(let side in prints) {      
        let svg = prints[side].svg;   
        renderSvg(context, svg, side);
    }  

    context.commit(CONSTRUCTOR_SET_LOADING, false);
    context.dispatch(CONSTRUCTOR_LOAD_RESOURCES);
    context.commit(CONSTRUCTOR_CHECK_PRINTSIZES_SIDES, base.sides[0].id)
   },
   [BLANKLOAD_CART_GET]: async (context, id) => {
    context.commit(CONSTRUCTOR_SET_LOADING, true);
    const response = await Vue.axios.get(`constructor-new/clip-arts/cart/${id}`)

    const base =  response.data.colorMainBlank.mainBlank;
    const size_id = response.data.size_id;
    const sides = response.data.sides;
    const features = response.data.features;
    let side = base.sides.find(item => item.id == response.data.preview_side_id);
    let color = { 
        id: response.data.colorMainBlank.id,
        color: response.data.colorMainBlank.color
    };
    let size = base.sizes.find(item => item.id == size_id);
    if(!size) {
        size = base.sizes[0]
    }
    context.commit(CONSTRUCTOR_SET_ITEMS, [])
    context.commit(CONSTRUCTOR_SET_EDIT_CART_PRODUCT, id);
    context.commit(CONSTRUCTOR_SET_BASE, base);
    context.commit(CONSTRUCTOR_SET_SELECTED_SIDE, side ? side : base.sides[0]);
    context.commit(CONSTRUCTOR_SET_COLOR, color);
   
    context.commit(PRICE_SET_SIZES_LIST, base.sizes);   
    context.commit(CONSTRUCTOR_SET_MAX_PRINT_SIZE, base.printSizes);
    context.commit(CONSTRUCTOR_SET_SIZE, size);

    sides.forEach(item => {  
        setTimeout(() => {
            renderSvg(context, item.svg, item.sideId);
        })
        
    })  
    ///set saved features here
    if(features && features.length) {       
        features.forEach((item, index) => {
            for(let key in item) {
                let index = base.features.findIndex((f) => f.id == key);               
                context.commit(CONSTRUCTOR_SET_FEATURES, {index, id: item[key]});
            }            
        })
    } else {
        //set default if selected features empty
        let $features = base.features;
        if($features && $features.length) {
            $features.forEach((item, index) => {
            if(item.values) {
                item.values.forEach(val => {
                    if(val.is_default == '1') {
                        context.commit(CONSTRUCTOR_SET_FEATURES, {index, id: val.id});
                    }
                })
            }            
        })
        }
       
    }
    context.commit(CONSTRUCTOR_SET_LOADING, false);
    context.dispatch(CONSTRUCTOR_LOAD_RESOURCES);
    context.commit(CONSTRUCTOR_CHECK_PRINTSIZES_SIDES, side ? side.id : base.sides[0].id)
   },
   [BLANKLOAD_PROFILE_GET]: async (context, id) => {
    context.commit(CONSTRUCTOR_SET_LOADING, true);
    const response = await Vue.axios.get(`constructor-new/clip-arts/profile/${id}`);

    const base =  response.data.colorMainBlank.mainBlank
    const sides = response.data.sides;
   
    let side = base.sides.find(item => item.id == response.data.preview_side_id);
    let color = { 
        id: response.data.colorMainBlank.id,
        color: response.data.colorMainBlank.color
    };
    context.commit(CONSTRUCTOR_SET_ITEMS, []);
    context.commit(CONSTRUCTOR_SET_EDIT_PROFILE_PRODUCT, id);
    context.commit(CONSTRUCTOR_SET_BASE, base);
    context.commit(CONSTRUCTOR_SET_SELECTED_SIDE, side ? side : base.sides[0]);
    context.commit(CONSTRUCTOR_SET_COLOR, color);
   
    context.commit(PRICE_SET_SIZES_LIST, base.sizes);   
    context.commit(CONSTRUCTOR_SET_MAX_PRINT_SIZE, base.printSizes);
    context.commit(CONSTRUCTOR_SET_SIZE, base.sizes[0]);

    sides.forEach(item => {  
        setTimeout(() => {
            renderSvg(context, item.svg, item.sideId);
        })
        
    })  

    context.commit(CONSTRUCTOR_SET_LOADING, false);
    context.dispatch(CONSTRUCTOR_LOAD_RESOURCES);
    context.commit(CONSTRUCTOR_CHECK_PRINTSIZES_SIDES, side ? side.id : base.sides[0].id);
   },
   [BLANKLOAD_ORDER_GET]: async (context, id) => {
    context.commit(CONSTRUCTOR_SET_LOADING, true);
    const response = await Vue.axios.get(`constructor-new/clip-arts/order/${id}`);

    const base =  response.data.colorMainBlank.mainBlank
    const sides = response.data.sides;
    const features = response.data.features;
    let side = base.sides.find(item => item.id == response.data.preview_side_id);
    let color = { 
        id: response.data.colorMainBlank.id,
        color: response.data.colorMainBlank.color
    };
    context.commit(CONSTRUCTOR_SET_ITEMS, []);
    context.commit(CONSTRUCTOR_SET_EDIT_ORDER_PRODUCT, id);
    context.commit(CONSTRUCTOR_SET_BASE, base);
    context.commit(CONSTRUCTOR_SET_SELECTED_SIDE, side ? side : base.sides[0]);
    context.commit(CONSTRUCTOR_SET_COLOR, color);
   
    context.commit(PRICE_SET_SIZES_LIST, base.sizes);   
    context.commit(CONSTRUCTOR_SET_MAX_PRINT_SIZE, base.printSizes);
    context.commit(CONSTRUCTOR_SET_SIZE, base.sizes[0]);

    sides.forEach(item => {  
        setTimeout(() => {
            renderSvg(context, item.svg, item.sideId);
        })
        
    })  

    ///set saved features here
    if(features && features.length) {       
        features.forEach((item) => {
            for(let key in item) {               
                let index = base.features.findIndex((f) => f.id == key)
                context.commit(CONSTRUCTOR_SET_FEATURES, {index, id: item[key]});
            }            
        })
    } else {
        //set default if selected features empty
        let $features = base.features;
        if($features && $features.length) {
            $features.forEach((item, index) => {
            if(item.values) {
                item.values.forEach(val => {
                    if(val.is_default == '1') {
                        context.commit(CONSTRUCTOR_SET_FEATURES, {index, id: val.id});
                    }
                })
            }            
        })
        }
       
    }
    context.commit(CONSTRUCTOR_SET_LOADING, false);
    context.dispatch(CONSTRUCTOR_LOAD_RESOURCES);
    context.commit(CONSTRUCTOR_CHECK_PRINTSIZES_SIDES, side ? side.id : base.sides[0].id)
   },
   [CONSTRUCTOR_LOAD_RESOURCES]: async (context) => {
    context.dispatch(GET_BASES_CATEGORIES);
    context.dispatch(GET_DESIGN_CATEGORIES);
    context.dispatch(GET_DESIGN, {
      page: 1,
      search: ""
      // category_ids: []
    });
    context.dispatch(GET_FONTS);
    
   }
}

const mutations = {
}

export default {
    state, getters, actions, mutations
}
