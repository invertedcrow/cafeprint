export default function clearSvg(str) { 
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
            node.removeAttribute('mask')
        })
    }   
    
    return svg.parentElement.innerHTML;
} 