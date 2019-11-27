import Vue from "vue";
import { BLANKLOAD_GET, GET_BASE } from '../actions.type';
import { CONSTRUCTOR_ADD_ITEM } from '../mutations.type';

import { blank4 } from './mock-data/4';

const initialState = () => ({
    sidesElems: []
})

const state =  initialState();

const getters = {
    
}

const actions = {
   [BLANKLOAD_GET]: async (context, params) => {
   let base = await context.dispatch(GET_BASE, 124); 
    let blankLayers = [];
    
    let element = new DOMParser().parseFromString(blank4, "text/xml");
    let groups = element.getElementById("containerGroupMain");
    
    let images = groups.querySelectorAll('image');
    let texts = groups.querySelectorAll('text');
    
    if(images) {
        createImageLayers(context, images)
    }
   
    if(texts) {
        createTextLayers(context, texts)
    }
    
    
   },
}

const mutations = {
    //[SAVE_SET_SIDES_LIST]: (state, sides) => state.sidesElems = sides,
}

export default {
    state, getters, actions, mutations
}


function createImageLayers(context, arr) {
    let layer = {}
    let edArea = document.getElementById('editable-area');
    arr.forEach(item => {
        layer = {
            width: +item.getAttribute('width'),
            height: +item.getAttribute('height'),
            x: +item.parentNode.getAttribute('x'), //- +edArea.getAttribute('x'),
            y: +item.parentNode.getAttribute('y'),// - +edArea.getAttribute('y'), 
            selected: false,
            spinner: true,
            type: "img",   
            node: null,
            name: item.dataset && item.dataset.layername ? item.dataset.layername : '',
            o: {
                x: 0,
                y: 0
            },
            side: '61', ///static
            sideName: "Перед",
            rotate: 0,
        }
        if(item.parentNode.parentNode.getAttribute('transform') && item.parentNode.parentNode.getAttribute('transform').includes('matrix')) {          
            layer.matrix = item.parentNode.parentNode.getAttribute('transform');
            const matrix = item.parentNode.parentNode.getAttribute('transform').match(/(-?\d{1,}\.?\d?){1,}/g)
            let skewX = +matrix[1] || 0;
            layer.rotate = Math.asin(skewX/Math.PI)*180;
        }
        let url = item.getAttribute('xlink:href')
        if(url && url.includes('base64')) {
            layer.dataUrl = item.getAttribute('xlink:href');
        } else {
            layer.url = item.getAttribute('xlink:href');
        }      
        context.commit(CONSTRUCTOR_ADD_ITEM, {...layer})
       
    })
}

function createTextLayers(context, arr) {
    let layer = {}
    let edArea = document.getElementById('editable-area');   
    arr.forEach(item => {
        layer = {
            width: +item.parentNode.getAttribute('width'),
            height: +item.parentNode.getAttribute('height'),
            x: +item.parentNode.getAttribute('x'), //- +edArea.getAttribute('x'),
            y: +item.parentNode.getAttribute('y'), //- +edArea.getAttribute('y'), 
            selected: false,
            type: "text",   
            node: null,
            name: item.dataset && item.dataset.layername ? item.dataset.layername : '',
            o: {
                x: 0,
                y: 0
            },
            side: '61', ///static
            sideName: "Перед",
            textAnchor: "start", //!!!             
            text: [],       
            font: { name: item.getAttribute('font-family')},          
            color: "#000",
            bold: false, //!!!
            italic: false, //!!!
            rotate: 0,    
        }        
        if(item.children.length) {           
            Array.from(item.children).forEach(tSpan => {
                layer.text.push(tSpan.textContent)
            })
            layer.fontSize = layer.height / layer.text.length;
        }
       
        if(item.parentNode.parentNode.getAttribute('transform') && item.parentNode.parentNode.getAttribute('transform') && item.parentNode.parentNode.getAttribute('transform').includes('matrix')) {            
            layer.matrix = item.parentNode.parentNode.getAttribute('transform');
            const matrix = item.parentNode.parentNode.getAttribute('transform').match(/(-?\d{1,}\.?\d?){1,}/g)

            let skewX = +matrix[1] || 0;
            layer.rotate = Math.asin(skewX/Math.PI)*180;
            // let x = layer.x;
            // let y = layer.y;
                          
            // layer.width *= +matrix[0]
            // layer.x = item.parentNode.getAttribute('x')*+matrix[0] - item.parentNode.getAttribute('x')*+matrix[1] + +matrix[4] - +edArea.getAttribute('x');
            // layer.y = item.parentNode.getAttribute('y')*+matrix[3] - item.parentNode.getAttribute('y')*+matrix[2] + +matrix[5] - +edArea.getAttribute('y'); 
        }
        context.commit(CONSTRUCTOR_ADD_ITEM, {...layer})
       
    })
}

