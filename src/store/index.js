import Vuex from 'vuex';
import Vue from 'vue'

import constructor from './modules/constructor';
import upload from './modules/upload';
import filter from './modules/filter';
import design from './modules/design';
import { SIDES, Sidebar } from '../consts';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        constructor,
        upload,
        filter,
        design
    },
    state: {
        activeSidebar: Sidebar.PRODUCT,
        addText: false,
        addImg: null,  
    },
    getters: {     
       
    },
    mutations: {
        setActiveSidebar: (state, value) => state.activeSidebar = value,       
        addText: (state, value) => state.addText = value,
        addImg: (state, value) => state.addImg = value,       
        updateElementSize() {},
    },
    actions: {
       
    }    
})
