import Vue from 'vue';

import {
    FILTER_SET_CATEGORIES,
    FILTER_SET_PARAMS,
    FILTER_SET_BASES
} from '../mutations.type';

import {
    GET_BASES_LIST,
    GET_BASES_CATEGORIES,
    GET_BASE
} from '../actions.type.js';

const getDefaultState = () => ({    
    filterParams: {
        sex: null,
        limit: 0
    }, 
    categories: [],
    bases: [] 
});

const state = getDefaultState();


const getters = {
    currentLimit: (state) => state.filterParams.limit,
    categories: (state) => state.categories,
    filterParams: (state) => state.filterParams,
    bases: (state) => state.bases
}

const actions = {
   [GET_BASES_CATEGORIES]: async (state) => {
    const response = await Vue.axios.get('/constructor-new/categories')   
    const baseCat = Object.values(response.data)
    const { children } = baseCat.find(item => item.uname == 'odezhda');   
    const male = {
        name: 'Мужское',
        children,
        sex: 'male'
    }
    const female = {
        name: 'Женское',
        children,
        sex: 'female'
    }
    const kid = {
        name: 'Детское',
        children,
        sex: 'kid'
    }
    const categories = [male, female, kid, ...baseCat]
    
    state.commit(FILTER_SET_CATEGORIES, categories)
},
   [GET_BASES_LIST]: async (state, params) => {
    const bases = await Vue.axios.get('/constructor-new/bases', {params});
    if(params.init) {
        state.dispatch(GET_BASE, bases.data[0].id)
        delete params.init
    }
    state.commit(FILTER_SET_PARAMS, params);  
    state.commit(FILTER_SET_BASES, bases.data);

   },
}

const mutations = {
    [FILTER_SET_CATEGORIES]: (state, categories) => state.categories = categories,
    [FILTER_SET_PARAMS]: (state, params) => state.filterParams = params,
    [FILTER_SET_BASES]: (state, bases) => state.bases = bases
}

export default {
    state, getters, actions, mutations
}