import Vue from "vue";
import {
    DESIGN_SET_CATEGORIES,
    DESIGN_SET_ACTIVE_CATEGORIES,
    DESIGN_SET_LIST,
    DESIGN_SET_SEARCHTEXT,
    DESIGN_SET_FILTER
} from '../mutations.type';
import {
    GET_DESIGN,
    GET_DESIGN_CATEGORIES,
    GET_DESIGN_ITEM
} from '../actions.type.js';

const getDefaultState = () => ({   
    designCategories: [],
    designs: [],
    designFilter: {
        category_ids: "",
        search: '',
        limit: 0,
    }
});

const state = getDefaultState();

const getters = {
    category_ids: (state) => {

        if(state.designFilter.category_ids) {
            return state.designFilter.category_ids.split(",");
        }
        return [];
    },
    designCategories: (state) => state.designCategories,   
    designList: (state) => state.designs,
    designFilter: (state) => state.designFilter
}

const actions = {
   [GET_DESIGN_CATEGORIES]: async (state) => {  
    const categories = await Vue.axios.get('/constructor-new/clip-art-categories')  
    state.commit(DESIGN_SET_CATEGORIES, categories.data)   
   },
   [GET_DESIGN]: async (state, params) => {      
    if(params.category_ids && typeof params.category_ids != 'string') {
        params.category_ids = params.category_ids.join(",")
    }
   
    const designs = await Vue.axios.get('/constructor-new/clip-arts', {params})  
    
    state.commit(DESIGN_SET_FILTER, params);
    state.commit(DESIGN_SET_LIST, designs.data || []);
   },
   [GET_DESIGN_ITEM]: async (state, id) => {     
    const img = await Vue.axios.get(`/constructor-new/clip-arts/${id}`)
    state.commit('addImg', img.data.url)
   } 
}

const mutations = {
    [DESIGN_SET_CATEGORIES]: (state, categories) => state.designCategories = categories,
    [DESIGN_SET_LIST]: (state, designs) => state.designs = designs,
    [DESIGN_SET_SEARCHTEXT]: (state, search) => state.designFilter.search = search,
    [DESIGN_SET_ACTIVE_CATEGORIES]: (state, categories) => state.category_ids = categories,
    [DESIGN_SET_FILTER]: (state, filter) => state.designFilter = filter
}

export default {
    state, getters, actions, mutations
}