import Vue from "vue";
import { SAVE_SIDES_ELEMS_SAVE, SAVE_TO_CART, SAVE_CHANGES } from '../actions.type';
import { SAVE_SET_SIDES_LIST } from '../mutations.type'
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
    [SAVE_SIDES_ELEMS_SAVE]: async (state, params) => {
        const encParams = qs.stringify(params);
            const response =  await Vue.axios.post('/constructor-new/save/profile', encParams);        
    },
    [SAVE_TO_CART]: async (state, params) => {
        const encParams = qs.stringify(params);
        const response =  await Vue.axios.post('/constructor-new/cart', encParams);  
        if(response.data) {
            eventBus.$emit("showModal", MODALS.MESSAGE, MESSAGE.ADD_CART_SUCCES);
        }   
    },
    [SAVE_CHANGES]: async (state, params) => {
       // const encParams = qs.stringify(params);
        const response =  await Vue.axios.put('/constructor-new/save/product', params);     
        if(response.data) {
            eventBus.$emit("showModal", MODALS.MESSAGE, MESSAGE.UPDATE_SUCCES);
        }   
    },

}

const mutations = {
    [SAVE_SET_SIDES_LIST]: (state, sides) => state.sidesElems = sides,
}

export default {
    state, getters, actions, mutations
}

