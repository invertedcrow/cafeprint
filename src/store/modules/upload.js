
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
    addFile(state, value) {
        state.items.push(...value)
    }
}

export default {
    state, getters, actions, mutations
}