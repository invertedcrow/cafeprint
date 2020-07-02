export default function clearSvg(str, type) { 
    let elementDom = new DOMParser().parseFromString(
      str,
      "text/html"
    );
    // svgItem.svg = svgItem.svg
            //   .replace(/.([^<]*)mainblanks(.*?)<\/image>/, "")
            //   .replace(/<mask.*mask>/, "")
            //   .replace(/mask="url\(#mainMask\)"/g, "");
            
    let svg = elementDom.querySelector('svg');

    let maskEl = svg.querySelector('mask');
    if(maskEl) {
        maskEl.remove();
    }
   
    
    let mainImgEl = svg.querySelector('image');
    if(mainImgEl) {
        mainImgEl.remove();
    }
   

    let elementsMask = svg.querySelectorAll('[mask]');
    if(elementsMask) {
        elementsMask.forEach(node => {
            if(node.getAttribute('mask').includes('mainMask')) {
                 node.removeAttribute('mask')
            }           
        })
    }   

    if(type && type == 'product') {
        if(elementsMask) {
            elementsMask.forEach(node => {
                if(node.getAttribute('mask') && node.getAttribute('mask').includes('printSizeMask')) {
                     node.removeAttribute('mask')
                }           
            })
        }
        let defPrintSize = svg.querySelector('.printSize-def');
        if(defPrintSize) {
            defPrintSize.remove();
        }
    }
    
    return svg.parentElement.innerHTML;
} 