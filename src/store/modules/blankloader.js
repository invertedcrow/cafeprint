import Vue from "vue";
import { BLANKLOAD_GET, GET_BASE, BLANKLOAD_CART_GET, BLANKLOAD_PROFILE_GET } from '../actions.type';
import { 
    CONSTRUCTOR_ADD_ITEM, 
    CONSTRUCTOR_SET_LOADING, 
    CONSTRUCTOR_SET_BASE, 
    CONSTRUCTOR_SET_SELECTED_SIDE, 
    CONSTRUCTOR_SET_COLOR, 
    CONSTRUCTOR_SET_SIZE, 
    PRICE_SET_SIZES_LIST, 
    CONSTRUCTOR_SET_MAX_PRINT_SIZE,
    CONSTRUCTOR_SET_EDIT_PRODUCT,
    CONSTRUCTOR_SET_ITEMS,
    CONSTRUCTOR_SET_EDIT_PROFILE_PRODUCT,
    CONSTRUCTOR_SET_EDIT_CART_PRODUCT } from '../mutations.type';

import renderSvg from '../../utils/renderSvg';

const initialState = () => ({
    sidesElems: []
})

const state =  initialState();

const getters = {
    
}

const actions = {
   [BLANKLOAD_GET]: async (context, id) => {
    context.commit(CONSTRUCTOR_SET_LOADING, true);
    const response = await Vue.axios.get(`constructor-new/clip-arts/products/${id}`)
    let blankLayers = [];
    const base = response.data.mainBlank;
    const prints = response.data.prints;
    context.commit(CONSTRUCTOR_SET_ITEMS, [])
    context.commit(CONSTRUCTOR_SET_EDIT_PRODUCT, id);
    context.commit(CONSTRUCTOR_SET_BASE, base);
    context.commit(CONSTRUCTOR_SET_SELECTED_SIDE, base.sides[0]);
    context.commit(CONSTRUCTOR_SET_COLOR, base.colors[0]);
   
    context.commit(PRICE_SET_SIZES_LIST, base.sizes);   
    context.commit(CONSTRUCTOR_SET_MAX_PRINT_SIZE, base.printSizes);
    let sizeId = Object.values(prints)[0].size_id;

    let size = base.sizes.find(item => item.id == sizeId);
    if(size) {
        context.commit(CONSTRUCTOR_SET_SIZE, size)
    } else {
        context.commit(CONSTRUCTOR_SET_SIZE, base.sizes[0])
    }

    for(let side in prints) {      
        let svg = await Vue.axios.get(prints[side].url_zip);    
        renderSvg(context, svg.data, side);
    }  

    context.commit(CONSTRUCTOR_SET_LOADING, false);
    
   },
   [BLANKLOAD_CART_GET]: async (context, id) => {
    context.commit(CONSTRUCTOR_SET_LOADING, true);
    const response = await Vue.axios.get(`constructor-new/clip-arts/cart/${id}`)

    const base =  response.data.colorMainBlank.mainBlank
    const sides = response.data.sides;
   
    let side = base.sides.find(item => item.id == response.data.preview_side_id)
    context.commit(CONSTRUCTOR_SET_ITEMS, [])
    context.commit(CONSTRUCTOR_SET_EDIT_CART_PRODUCT, id);
    context.commit(CONSTRUCTOR_SET_BASE, base);
    context.commit(CONSTRUCTOR_SET_SELECTED_SIDE, side ? side : base.sides[0]);
    context.commit(CONSTRUCTOR_SET_COLOR, { id: response.data.colorMainBlank.id });
   
    context.commit(PRICE_SET_SIZES_LIST, base.sizes);   
    context.commit(CONSTRUCTOR_SET_MAX_PRINT_SIZE, base.printSizes);
    context.commit(CONSTRUCTOR_SET_SIZE, base.sizes[0]);

    sides.forEach(item => {  
        setTimeout(() => {
            renderSvg(context, item.svg, item.sideId);
        })
        
    })  

    context.commit(CONSTRUCTOR_SET_LOADING, false);
   },
   [BLANKLOAD_PROFILE_GET]: async (context, id) => {
    context.commit(CONSTRUCTOR_SET_LOADING, true);
    const response = await Vue.axios.get(`constructor-new/clip-arts/profile/${id}`);

    const base =  response.data.colorMainBlank.mainBlank
    const sides = response.data.sides;
   
    let side = base.sides.find(item => item.id == response.data.preview_side_id);
    context.commit(CONSTRUCTOR_SET_ITEMS, []);
    context.commit(CONSTRUCTOR_SET_EDIT_PROFILE_PRODUCT, id);
    context.commit(CONSTRUCTOR_SET_BASE, base);
    context.commit(CONSTRUCTOR_SET_SELECTED_SIDE, side ? side : base.sides[0]);
    context.commit(CONSTRUCTOR_SET_COLOR, { id: response.data.colorMainBlank.id });
   
    context.commit(PRICE_SET_SIZES_LIST, base.sizes);   
    context.commit(CONSTRUCTOR_SET_MAX_PRINT_SIZE, base.printSizes);
    context.commit(CONSTRUCTOR_SET_SIZE, base.sizes[0]);

    sides.forEach(item => {  
        setTimeout(() => {
            renderSvg(context, item.svg, item.sideId);
        })
        
    })  

    context.commit(CONSTRUCTOR_SET_LOADING, false);
   }
}

const mutations = {
}

export default {
    state, getters, actions, mutations
}

// function renderBase(context, svg, side) {
//     let element = new DOMParser().parseFromString(svg, "text/html");    
//     let groups = element.getElementById("containerGroupMain");    
//     let images = groups.querySelectorAll('image');
//     let texts = groups.querySelectorAll('text');
   
//     if(images) {
//         createImageLayers(context, images, side)
//     }
   
//     if(texts) {
//         createTextLayers(context, texts, side)
//     }
   
// }

// function createImageLayers(context, arr, side) {
//     let layer = {}
//     let edArea = document.getElementById('editable-area');
//     arr.forEach(item => {
//         layer = {
//             width: +item.getAttribute('width'),
//             height: +item.getAttribute('height'),
//             x: +item.parentNode.getAttribute('x'), 
//             y: +item.parentNode.getAttribute('y'),
//             selected: false,
//             spinner: true,
//             type: "img",   
//             node: null,
//             name: item.dataset && item.dataset.layername ? item.dataset.layername : '',
//             o: {
//                 x: 0,
//                 y: 0
//             },
//             side: side,
//             sideName: "Перед",
//             rotate: 0,
//         }
//         if(item.parentNode.parentNode.getAttribute('transform') && item.parentNode.parentNode.getAttribute('transform').includes('matrix')) {          
//             layer.matrix = item.parentNode.parentNode.getAttribute('transform');
//             const matrix = item.parentNode.parentNode.getAttribute('transform').match(/(-?\d{1,}\.?\d?){1,}/g)
//             let skewX = +matrix[1] || 0;
//             layer.rotate = Math.asin(skewX/Math.PI)*180;
//         }
//         let url = item.getAttribute('xlink:href')
//         if(url && url.includes('base64')) {
//             layer.dataUrl = item.getAttribute('xlink:href');
//         } else {
//             layer.url = item.getAttribute('xlink:href');
//         }      
//         context.commit(CONSTRUCTOR_ADD_ITEM, {...layer})
       
//     })
// }

// function createTextLayers(context, arr, side) {
//     let layer = {}
//     let edArea = document.getElementById('editable-area');   
//     arr.forEach(item => {
//         layer = {
//             width: +item.parentNode.getAttribute('width'),
//             height: +item.parentNode.getAttribute('height'),
//             x: +item.parentNode.getAttribute('x'), 
//             y: +item.parentNode.getAttribute('y'),
//             selected: false,
//             type: "text",   
//             node: null,
//             name: item.dataset && item.dataset.layername ? item.dataset.layername : '',
//             o: {
//                 x: 0,
//                 y: 0
//             },
//             side: side,
//             sideName: "Перед",
//             textAnchor: "start",            
//             text: [],       
//             font: { name: item.getAttribute('font-family')},          
//             color: item.getAttribute('fill') || '#000',
//             bold: item.getAttribute('font-style') == 'bold' ? true : false, 
//             italic: item.getAttribute('font-style') == 'italic' ? true : false, 
//             rotate: 0,    
//         }        
//         if(item.children.length) {           
//             Array.from(item.children).forEach(tSpan => {
//                 layer.text.push(tSpan.textContent)
//             })
//             layer.fontSize = layer.height / layer.text.length;
//         } else {
//             layer.text.push(item.textContent)
//             layer.fontSize = layer.height / layer.text.length;
//         }
       
//         if(item.parentNode.parentNode.getAttribute('transform') && item.parentNode.parentNode.getAttribute('transform') && item.parentNode.parentNode.getAttribute('transform').includes('matrix')) {            
//             layer.matrix = item.parentNode.parentNode.getAttribute('transform');
//             const matrix = item.parentNode.parentNode.getAttribute('transform').match(/(-?\d{1,}\.?\d?){1,}/g)

//             let skewX = +matrix[1] || 0;
//             layer.rotate = Math.asin(skewX/Math.PI)*180;
//             // let x = layer.x;
//             // let y = layer.y;
                          
//             // layer.width *= +matrix[0]
//             // layer.x = item.parentNode.getAttribute('x')*+matrix[0] - item.parentNode.getAttribute('x')*+matrix[1] + +matrix[4] - +edArea.getAttribute('x');
//             // layer.y = item.parentNode.getAttribute('y')*+matrix[3] - item.parentNode.getAttribute('y')*+matrix[2] + +matrix[5] - +edArea.getAttribute('y'); 
//         }
//         context.commit(CONSTRUCTOR_ADD_ITEM, {...layer})
       
//     })
// }

