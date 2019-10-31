
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
    addFile: (state, file) => state.items = [...state.items, file],
    remove: (state, value) => {
        // TODO: add mutation to remove files from state
    }
}

export default {
    state, getters, actions, mutations
}