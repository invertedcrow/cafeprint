const getDefaultState = () => ({    
    designActiveCategory: '',
    searchText: '', 
    designCategories: [],
    designs: [] 
});

const state = getDefaultState();

const categories = ["Все принты", "Для него, для нее, для семьи", "Приколы", "Кино, сериалы, мультфильмы", "Супергерои", "Компьютерные игры, приколы", "Музыка", "Отдых, увлечения, спорт", "Я - Украинец"];

const designs = [1,2,3,4,5,6,7,8,9,12,11,13,14,15,16,17]


const getters = {
    designCategories: (state) => state.designCategories,
    designActiveCategory: (state) => state.designActiveCategory,
    designSearchText: (state) => state.searchtext,
    designList: (state) => state.designs
}

const actions = {
   fetchDesignCategories: (state) => {
    // TODO: fetch data from server  
    state.commit('setCategories', categories)   
   },
   fetchDesigns: (state) => {
    // TODO: fetch data from server  
    state.commit('setDesignList', designs) 
   }
}

const mutations = {
    setCategories: (state, value) => state.designCategories = value,
    setDesignList: (state, value) => state.designs = value,
    setSearchText: (state, value) => state.searchText = value,
    setActiveCategory: (state, value) => state.designActiveCategory =value
}

export default {
    state, getters, actions, mutations
}