import Vue from "vue";
import { GET_PRICE } from '../actions.type';
import { PRICE_SET_SIZES_LIST, PRICE_SET_ITEM, PRICE_RESET } from '../mutations.type'
import qs  from 'qs';

const initialState = () => ({
    sizesList: [], 
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
    productMinPrice: (state) => Math.min(...state.sizesList.map(item => item.item_total))
}

const actions = {
    [GET_PRICE]: async (state, params) => {             
        const query =  qs.stringify(params);
        const price = await Vue.axios.get('/constructor-new/cart/price?' + query);  
        console.log(price)
        let prices = price.data.items;               
        let list = state.state.sizesList.slice();       
        list.forEach(item => {
            let sizePrice = prices.find(price => price.size_id == item.id);
            if(sizePrice) {
                item.item_total = +sizePrice.item_total
            }            
        })
        state.commit(PRICE_SET_SIZES_LIST, list)
        
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
    [PRICE_RESET]: (state) => state.sizesList = [...state.sizesList.map(item => {item.quantity = 0; return item})]
}

export default {
    state, getters, actions, mutations
}
