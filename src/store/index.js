import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex)

const productFilterDefault = {
    category: '',
    product: '',
    color: '',
    size: '',
    showPreview: false,    
}

const productPreviewDefault = {
    id: '',
    product: '',
    color: '',
    size: '',
    side: ''
}

export default new Vuex.Store({
    state: {
        activeMenu: 'products',
        activeColor: '',  
        isShowProductFilter: false, 
        productFilter: {...productFilterDefault},
        productPreview: {...productPreviewDefault},   
         
    },
    mutations: {
        setActiveMenu(state, value) {
           state.activeMenu = value;
        },
        setActiveColor(state, value) {
            state.activeColor = value;
        },
        setFilterCategory(state, value) {
            state.productFilter.category = value;
        },
        setFilterProduct(state, value) {
            state.productFilter.product = value;
        },
        filterSetColor(state, value) {
            state.productFilter.color = value;
        },
        setFilterSize(state, value) {
            state.productFilter.size = value;
        },
        filterReset(state) {
            state.productFilter = {...productFilterDefault};
        },
        showFilterPreview(state, value) {
           state.productFilter.showPreview = value;
        },
        filterResetPreview(state) {
            state.productPreview = {...productPreviewDefault};
        },       
        setPreviewColor(state, value) {     
            state.productPreview.color = value;
        },
        setPreviewSize(state, value) {     
            state.productPreview.size = value;
        }, 
        setPreviewSide(state, value) {     
            state.productPreview.side = value;
        },
        showFilterModal(state, value) {
            state.isShowProductFilter = value;
        }  
    }   
})
