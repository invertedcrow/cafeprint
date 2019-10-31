const getDefaultState = () => ({    
    activeCategory: '', 
    categories: [] 
});

const state = getDefaultState();

const subCategories = ["Регланы", "Поло", "Кенгуру", "Мантия", "Лонгсливы", "Футболки"];
const categories = [
    { title: "Мужские", subCategories: [...subCategories]},
    { title: "Женские", subCategories: [...subCategories]},
    { title: "Детские", subCategories: [...subCategories]},
    { title: "Аксессуары", subCategories: [...subCategories]}
];

const getters = {
    categories: (state) => state.categories,
    activeCategory: (state) => state.activeCategory
}

const actions = {
   fetchCategories: (state) => state.commit('setCategories', categories)   
}

const mutations = {
    setCategories: (state, categories) => state.categories = categories,
    setFilterCategory: (state, category) => state.activeCategory = category,
}

export default {
    state, getters, actions, mutations
}