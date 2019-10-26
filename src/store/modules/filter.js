const getDefaultState = () => ({
    product: '',
    color: '',
    size: '',
    side: '',
    id: '',
    sides: [],
    category: '',    
    showPreview: false,    
});

const state = getDefaultState();

const getters = {
}

const actions = {
   
}

const mutations = {
    setFilterCategory(state, value) {
        state.category = value;
    },
    setFilterProduct(state, value) {
        state.product = value;
    },
    filterSetColor(state, value) {
        state.color = value;
    },
    setFilterSize(state, value) {
        state.size = value;
    },
    filterReset(state) {
        Object.assign(state, getDefaultState()) //{ ...state, ...filterDefault };
    },
    showFilterPreview(state, value) {
       state.showPreview = value;
    },    
}

export default {
    state, getters, actions, mutations
}