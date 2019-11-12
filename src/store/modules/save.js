import Vue from "vue";
import { SAVE_SIDES_ELEMS_SAVE, SAVE_TO_CART } from '../actions.type';
import { SAVE_SET_SIDES_LIST } from '../mutations.type'

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
        const response =  await Vue.axios.post('/constructor-new/save/profile', params);        
   },
   [SAVE_TO_CART]: async (state, params) => {
    const response =  await Vue.axios.post('/constructor-new/cart', params);
}

}

const mutations = {
    [SAVE_SET_SIDES_LIST]: (state, sides) => state.sidesElems = sides,
}

export default {
    state, getters, actions, mutations
}

