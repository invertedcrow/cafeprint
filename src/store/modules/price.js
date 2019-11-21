import Vue from "vue";
import { GET_PRICE } from '../actions.type';
import { PRICE_SET_SIZES_LIST, PRICE_SET_ITEM, PRICE_RESET, PRICE_ARTICLE_SET, PRICE_SET_LOADING } from '../mutations.type'
import qs  from 'qs';

const initialState = () => ({
    sizesList: [], 
    article: null,
    isPriceLoading: true
})

const state =  initialState();

const getters = {
    sizesList: (state) => state.sizesList,
    quantity: (state) =>  {
        let totalQuantity = 0;
        state.sizesList.forEach(item => totalQuantity += +item.quantity)
        return totalQuantity
    },
    totalPrice: (state) => {
        let total = 0;
        state.sizesList.forEach((item) => {
            total += item.quantity*item.item_total
        })
        return total
    },
    productMinPrice: (state) => {
        let minSize = state.sizesList.find(item => item.quantity);
        if(minSize) {
              state.sizesList.forEach(item => {
            if (minSize.item_total > item.total_item && item.quantity) {
                minSize  = item.item_total;                
            }
        })
        return minSize; 
        }
     
    },
    article: (state) => state.article,
    isPriceLoading: (state) => state.isPriceLoading
}

const actions = {
    [GET_PRICE]: async (state, params) => {    
        state.commit(PRICE_SET_LOADING, true);
        const query =  qs.stringify(params);
        const price = await Vue.axios.get('/constructor-new/cart/price?' + query);  
       // TODO: fix handle. response changed
        let prices = price.data.totals[params.id];               
        let list = state.state.sizesList.slice();
        if(list.length) {
            list.forEach(item => {
                item.item_total = +prices[item.id]
            })            
        } else {
            list.push({item_total: +prices[0], id: 0, quantity: 1 })
        }       
        state.commit(PRICE_SET_SIZES_LIST, list);
        state.commit(PRICE_ARTICLE_SET, price.data[params.id]);
        state.commit(PRICE_SET_LOADING, false)
    }
}

const mutations = {
    [PRICE_SET_SIZES_LIST]: (state, list) => state.sizesList = list,
    [PRICE_SET_ITEM]: (state, item) => {
        const index = state.sizesList.findIndex(i => i.id == item.id)      
        let arr = [...state.sizesList.slice()];
        arr[index] = item;      
        state.sizesList = arr;
       
    },    
    [PRICE_RESET]: (state) => state.sizesList = [...state.sizesList.map(item => {item.quantity = 0; return item})],
    [PRICE_ARTICLE_SET]: (state, article) => state.article = article, 
    [PRICE_SET_LOADING]: (state, isLoading) => state.isPriceLoading = isLoading
}

export default {
    state, getters, actions, mutations
}
