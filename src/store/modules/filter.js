import {
    FILTER_SET_CATEGORIES,
    FILTER_SET_ACTIVE_CATEGORY
} from '../mutations.type';

import {
    GET_BASES,
    GET_BASES_CATEGORIES
} from '../actions.type.js'

const getDefaultState = () => ({    
    activeCategory: '', 
    categories: [] 
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
    activeCategory: (state) => state.activeCategory
}

const actions = {
   [GET_BASES_CATEGORIES]: (state) => state.commit(FILTER_SET_CATEGORIES, categories),
   [GET_BASES]: (state) => {
      // searchText, activeCategory
   },
}

const mutations = {
    [FILTER_SET_CATEGORIES]: (state, categories) => state.categories = categories,
    [FILTER_SET_ACTIVE_CATEGORY]: (state, category) => state.activeCategory = category,
}

export default {
    state, getters, actions, mutations
}