import Vue from "vue";
import { SAVE_SIDES_ELEMS_SAVE, SAVE_TO_CART, SAVE_CHANGES, SAVE_ADD_PRODUCT, BLANKLOAD_GET, SAVE_UPDATE_CART_ITEM } from '../actions.type';
import { SAVE_SET_SIDES_LIST, CONSTRUCTOR_SET_LOADING } from '../mutations.type'
import qs  from 'qs';
import { MODALS, MESSAGE } from '../../consts';
import { eventBus } from '../../main';

const initialState = () => ({
    sidesElems: []
})

const state =  initialState();

const getters = {
    sidesElems: (state) => state.sidesElems,
    // previewSide: (state) => state.previewSide
    
}

const actions = {
    [SAVE_SIDES_ELEMS_SAVE]: async (context, params) => {
        context.commit(CONSTRUCTOR_SET_LOADING, true);
        const encParams = qs.stringify(params);
        try {
            const response =  await Vue.axios.post('/constructor-new/save/profile', encParams); 
            context.commit(CONSTRUCTOR_SET_LOADING, false);
            if(response.data) {
                eventBus.$emit("showModal", MODALS.MESSAGE, MESSAGE.SAVE_TO_PROFILE_SUCCES);
            } 
        } catch(e) {
            eventBus.$emit("showModal", MODALS.MESSAGE, e.response.data.message);
            context.commit(CONSTRUCTOR_SET_LOADING, false);
        }   
    },
    [SAVE_TO_CART]: async (context, params) => {
        context.commit(CONSTRUCTOR_SET_LOADING, true);
        const encParams = qs.stringify(params);
        try {
            const response =  await Vue.axios.post('/constructor-new/cart', encParams);  
            context.commit(CONSTRUCTOR_SET_LOADING, false);
            if(response.data) {
                eventBus.$emit("showModal", MODALS.CART_ADDED);
            }   
        } catch(e) {
            eventBus.$emit("showModal", MODALS.MESSAGE, e.response.data.message);
            context.commit(CONSTRUCTOR_SET_LOADING, false);
        }  
    },
    [SAVE_UPDATE_CART_ITEM]: async (context, data) => {
        context.commit(CONSTRUCTOR_SET_LOADING, true);
        const encParams = qs.stringify(data.params);
        try {
            const response =  await Vue.axios.put(`/constructor-new/cart/${data.id}`, encParams);  
            context.commit(CONSTRUCTOR_SET_LOADING, false);
            if(response.data) {
                eventBus.$emit("showModal", MODALS.CART_ADDED);
            }   
        } catch(e) {
            eventBus.$emit("showModal", MODALS.MESSAGE, e.response.data.message);
            context.commit(CONSTRUCTOR_SET_LOADING, false);
        }  
    },
    [SAVE_CHANGES]: async (context, params) => {
        context.commit(CONSTRUCTOR_SET_LOADING, true);
       // const encParams = qs.stringify(params);
        const tokenElement = document.querySelector('[name="csrf-token"]');
        const _csrf = tokenElement.getAttribute("content");
        try {
            const response =  await Vue.axios.put('/constructor-new/save/product', {data: params.data, selected_color: params.selected_color, _csrf });     
            context.commit(CONSTRUCTOR_SET_LOADING, false);
        
            if(response.data) {
                const id = params.data.productid;
                context.dispatch(BLANKLOAD_GET, id);
                eventBus.$emit("showModal", MODALS.MESSAGE, MESSAGE.UPDATE_SUCCES);
            }   
        } catch(e) {
            eventBus.$emit("showModal", MODALS.MESSAGE, e.response.data.message);
            context.commit(CONSTRUCTOR_SET_LOADING, false);
        }  

    },


    [SAVE_ADD_PRODUCT]:async (context, params) => {
        context.commit(CONSTRUCTOR_SET_LOADING, true);
       // const encParams = qs.stringify(params);
        const tokenElement = document.querySelector('[name="csrf-token"]');
        const _csrf = tokenElement.getAttribute("content");
        try {
            const response =  await Vue.axios.post('/product/add-product', {data: params.data, selected_color: params.selected_color, _csrf });     
            context.commit(CONSTRUCTOR_SET_LOADING, false);
            if(response.data) {
                eventBus.$emit("showModal", MODALS.MESSAGE, MESSAGE.PRODUCT_ADD_SUCCES);
            }   
        } catch(e) {
            eventBus.$emit("showModal", MODALS.MESSAGE, e.response.data.message);
            context.commit(CONSTRUCTOR_SET_LOADING, false);
        }  
    },

}

const mutations = {
    [SAVE_SET_SIDES_LIST]: (state, sides) => state.sidesElems = sides,
}

export default {
    state, getters, actions, mutations
}

