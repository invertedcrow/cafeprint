import { UPLOAD_ADD_FILE, UPLOAD_REMOVE_FILE } from '../mutations.type';
const state = {
    items: [],
    selectedElement: null,
}

const getters = {
   getAllFiles: (state) => state.items
}

const actions = {
   
}

const mutations = {
    [UPLOAD_ADD_FILE]: (state, file) => state.items = [...state.items, file],
    [UPLOAD_REMOVE_FILE]: (state, index) => {
        state.items = [...state.items.slice(0, index), ...state.items.slice(index + 1)]
    }
}

export default {
    state, getters, actions, mutations
}