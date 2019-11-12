import Vue from "vue";
import { SAVE_SIDES_ELEMS_SAVE, SAVE_TO_CART } from '../actions.type';
import { SAVE_SET_SIDES_LIST } from '../mutations.type'
import qs  from 'qs';

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
        const response =  await Vue.axios.post('/constructor-new/save/profile', encParams, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }});        
   },
   [SAVE_TO_CART]: async (state, params) => {
   const encParams = qs.stringify(params);
    const response =  await Vue.axios.post('/constructor-new/cart', encParams, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }});
}

}

const mutations = {
    [SAVE_SET_SIDES_LIST]: (state, sides) => state.sidesElems = sides,
}

export default {
    state, getters, actions, mutations
}

