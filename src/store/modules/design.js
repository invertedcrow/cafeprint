import Vue from "vue";
import {
    DESIGN_SET_CATEGORIES,
    DESIGN_SET_ACTIVE_CATEGORIES,
    DESIGN_SET_LIST,
    DESIGN_SET_SEARCHTEXT
} from '../mutations.type';
import {
    GET_DESIGN,
    GET_DESIGN_CATEGORIES
} from '../actions.type.js';

const getDefaultState = () => ({    
    designActiveCategory: '',
    searchText: '', 
    designCategories: [],
    designs: [] 
});

const state = getDefaultState();

const categories = ["Все принты", "Для него, для нее, для семьи", "Приколы", "Кино, сериалы, мультфильмы", "Супергерои", "Компьютерные игры, приколы", "Музыка", "Отдых, увлечения, спорт", "Я - Украинец"];

const designs = [1,2,3,4,5,6,7,8,9,12,11,13,14,15,16,17]


const getters = {
    designCategories: (state) => state.designCategories,
    designActiveCategory: (state) => state.designActiveCategory,
    designSearchText: (state) => state.searchtext,
    designList: (state) => state.designs
}

const actions = {
   [GET_DESIGN_CATEGORIES]: (state) => {
    // TODO: fetch data from server
    state.commit(DESIGN_SET_CATEGORIES, categories)   
   },
   [GET_DESIGN]: async (state) => {
    // TODO: fetch data from server  
    //const response = await Vue.axios.get('/constructor/clip-arts')
    //console.log(response)
    state.commit(DESIGN_SET_LIST, designs) 
   }
}

const mutations = {
    [DESIGN_SET_CATEGORIES]: (state, categories) => state.designCategories = categories,
    [DESIGN_SET_LIST]: (state, designs) => state.designs = designs,
    [DESIGN_SET_SEARCHTEXT]: (state, searchText) => state.searchText = searchText,
    [DESIGN_SET_ACTIVE_CATEGORIES]: (state, category) => state.designActiveCategory = category
}

export default {
    state, getters, actions, mutations
}