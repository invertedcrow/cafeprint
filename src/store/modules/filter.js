import Vue from 'vue';

import {
    FILTER_SET_CATEGORIES,
    FILTER_SET_ACTIVE_CATEGORY,
    FILTER_SET_BASES
} from '../mutations.type';

import {
    GET_BASES_LIST,
    GET_BASES_CATEGORIES
} from '../actions.type.js'
import { async } from 'q';

const getDefaultState = () => ({    
    activeCategory: '', 
    categories: [],
    bases: [] 
});

const state = getDefaultState();

const subCategories = ["Регланы", "Поло", "Кенгуру", "Мантия", "Лонгсливы", "Футболки"];
const categories = [
    { title: "Мужские", subCategories: [...subCategories]},
    { title: "Женские", subCategories: [...subCategories]},
    { title: "Детские", subCategories: [...subCategories]},
    { title: "Аксессуары", subCategories: [...subCategories]}
];

const getters = {
    categories: (state) => state.categories,
    activeCategory: (state) => state.activeCategory,
    bases: (state) => state.bases
}

const actions = {
   [GET_BASES_CATEGORIES]: async (state) => {
    // const response = await Vue.axios.get('/constructor/categories')
    // console.log(response)
    state.commit(FILTER_SET_CATEGORIES, categories)
},
   [GET_BASES_LIST]: async (state) => {
//    const response = await Vue.axios.get('/constructor/bases');
//    console.log(response)
   const bases = [
    { id: 123,},
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 }
  ]
    state.commit(FILTER_SET_BASES, bases);
   },
}

const mutations = {
    [FILTER_SET_CATEGORIES]: (state, categories) => state.categories = categories,
    [FILTER_SET_ACTIVE_CATEGORY]: (state, category) => state.activeCategory = category,
    [FILTER_SET_BASES]: (state, bases) => state.bases = bases
}

export default {
    state, getters, actions, mutations
}