import { CONSTRUCTOR_ADD_ITEM } from '../store/mutations.type';

export default function renderSvg(context, svg, side) {   
    let element = new DOMParser().parseFromString(svg, "text/html");
    let groups = element.getElementById("containerGroupMain");  
   
    let images = groups.querySelectorAll('image');
    let texts = groups.querySelectorAll('text');

    if(images && images.length) {
        createImageLayers(context, images, side)
    }
    if(texts && texts.length) {
        createTextLayers(context, texts, side)
    }
   
}

function createImageLayers(context, arr, side) {
    let layer = {}
    //let edArea = document.getElementById('editable-area');
    arr.forEach(item => {
        layer = {
            width: +item.getAttribute('width'),
            height: +item.getAttribute('height'),
            x: +item.parentNode.getAttribute('x'), 
            y: +item.parentNode.getAttribute('y'),
            selected: false,
            spinner: true,
            type: "img",   
            node: null,
            name: item.dataset && item.dataset.layername ? item.dataset.layername : '',
            o: {
                x: 0,
                y: 0
            },
            side: side,
            sideName: "Перед",
            rotate: 0,
            dataId: Date.now()
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

function createTextLayers(context, arr, side) {
    let layer = {}
    //let edArea = document.getElementById('editable-area');   
    arr.forEach(item => {
        layer = {
            width: +item.parentNode.getAttribute('width'),
            height: +item.parentNode.getAttribute('height'),
            x: +item.parentNode.getAttribute('x'), 
            y: +item.parentNode.getAttribute('y'),
            selected: false,
            type: "text",   
            node: null,
            name: item.dataset && item.dataset.layername ? item.dataset.layername : '',
            o: {
                x: 0,
                y: 0
            },
            side: side,
            sideName: "Перед",
            textAnchor: item.getAttribute('text-anchor'),            
            text: [],       
            font: { name: item.getAttribute('font-family')},          
            color: item.getAttribute('fill') || '#000',
            bold: item.getAttribute('font-weight') == 'bold' ? true : false, 
            italic: item.getAttribute('font-style') == 'italic' ? true : false, 
            rotate: 0,   
            dataId: Date.now() 
        }        
        if(item.children.length) {           
            Array.from(item.children).forEach(tSpan => {
                layer.text.push(tSpan.textContent)
            })
            layer.fontSize = layer.height / layer.text.length;
        } else {
            layer.text.push(item.textContent)
            layer.fontSize = layer.height / layer.text.length;
        }
       
        if(item.getAttribute('font-size') && item.getAttribute('font-size') != 24) {
            layer.fontSize = item.getAttribute('font-size');
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
