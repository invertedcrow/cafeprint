import Vue from "vue";
import {
    DESIGN_SET_CATEGORIES,
    DESIGN_SET_ACTIVE_CATEGORIES,
    DESIGN_SET_LIST,
    DESIGN_SET_SEARCHTEXT,
    DESIGN_SET_FILTER,
    DESIGN_SET_LIST_LOADING
} from '../mutations.type';
import {
    GET_DESIGN,
    GET_DESIGN_CATEGORIES,
    GET_DESIGN_ITEM
} from '../actions.type.js';
import renderSvg from '../../utils/renderSvg';

const getDefaultState = () => ({   
    isDesignListLoading: true,
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
    designFilter: (state) => state.designFilter,
    isDesignListLoading: (state) => state.isDesignListLoading
}

const actions = {
   [GET_DESIGN_CATEGORIES]: async (state) => {  
    const categories = await Vue.axios.get('/constructor-new/clip-art-categories')  
    state.commit(DESIGN_SET_CATEGORIES, categories.data)   
   },
   [GET_DESIGN]: async (state, params) => {     
    state.commit(DESIGN_SET_LIST_LOADING, true); 
    if(params.category_ids && typeof params.category_ids != 'string') {
        params.category_ids = params.category_ids.join(",")
    }
   
    const designs = await Vue.axios.get('/constructor-new/clip-arts', {params})  
    
    state.commit(DESIGN_SET_FILTER, params);
    state.commit(DESIGN_SET_LIST, designs.data || []);
    state.commit(DESIGN_SET_LIST_LOADING, false);
   },
   [GET_DESIGN_ITEM]: async (context, design) => {  
    const prints = await Vue.axios.get(`/constructor-new/clip-arts/${design.id}`)
    let arrPrints = Object.values(prints.data);

    if(arrPrints.length) {
        if(arrPrints.length > 1) {
            let sidesEditor = context.rootState.constructor.base.sides;
            arrPrints.forEach((item, i) => {
                if(sidesEditor[i]) {
                    renderSvg(context, item.svg, sidesEditor[i].id);
                }
            })
        } else {
            let activeSideId = context.rootState.constructor.side.id;   
            renderSvg(context, arrPrints[0].svg, activeSideId);    
        }  
    }
   } 
}

const mutations = {
    [DESIGN_SET_CATEGORIES]: (state, categories) => state.designCategories = categories,
    [DESIGN_SET_LIST]: (state, designs) => state.designs = designs,
    [DESIGN_SET_SEARCHTEXT]: (state, search) => state.designFilter.search = search,
    [DESIGN_SET_ACTIVE_CATEGORIES]: (state, categories) => state.category_ids = categories,
    [DESIGN_SET_FILTER]: (state, filter) => state.designFilter = filter,
    [DESIGN_SET_LIST_LOADING]: (state, isLoading) => state.isDesignListLoading = isLoading
}

export default {
    state, getters, actions, mutations
}