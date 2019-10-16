import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex)

const productDefault = {
    product: '',
    color: '',
    size: '',
    side: '',
    id: '', 
}
const productFilterDefault = {
    ...productDefault,
    category: '',    
    showPreview: false,    
}

export default new Vuex.Store({
    state: {
        activeSettings: 'products',
        addText: false,
        isShowProductFilter: false, 
        isShowProductDesign: false,
        activeProduct: {...productDefault},
        productFilter: {...productFilterDefault},
        productPreview: {...productDefault},   
        designs: {
            list: [],  
            preview: ''          
        },
        constructor: {
            items: []
        }
         
    },
    mutations: {
        setActiveSettings(state, value) {
           state.activeSettings = value;
        },
        setActiveColor(state, value) {
            state.activeProduct.color = value;
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
            state.productPreview = {...productDefault};
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
        },
        setActiveProduct(state) {
            state.activeProduct = {...state.productPreview}
        },
        showDesignModal(state, value) {
            state.isShowProductDesign = value;
        }, 


        setDesigns(state, value) {
            state.designs.list = value;
        },
        setDesignPreview(state, value) {
            state.designs.preview = value;
        },


        addText(state, value) {
            state.addText = value;
        },
        addItemToConstructor(state, value) {
            state.constructor.items.push(value)
        },
        setItemsConstructor(state, value) {           
            state.constructor.items = value
        },
        

    },
    actions: {
        searchDesign({commit}, searchParams) {
            let list = []
            if(searchParams) {
                list = [1,2,3,4,5,6,7,8,9,12,11,13,14,15,16,17]
            }

            commit("setDesigns", list)
        }
    }    
})
