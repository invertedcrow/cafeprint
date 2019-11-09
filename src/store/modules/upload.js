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
    [UPLOAD_REMOVE_FILE]: (state, value) => {
        // TODO: add mutation to remove files from state
    }
}

export default {
    state, getters, actions, mutations
}