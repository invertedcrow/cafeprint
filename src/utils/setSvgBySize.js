export default function setSvgBySize({id, current, target, svgStr, centerItems, items, sideArea, edBounds}) {
    let elementDom = new DOMParser().parseFromString(
        svgStr,
        "text/html"
      );
  
    let svg = elementDom.querySelector('svg');
    let diff = +current.width/+target.width;
    if(diff == 1) {
        return svg.parentElement.innerHTML;
    }

    let groups = svg.getElementById("containerGroupMain");  
   
    let images = groups.querySelectorAll('image') || [];
    let texts = groups.querySelectorAll('text') || [];
    let prinSizemask = groups.querySelector('.printSizemask') || null;
   
    let sideCoef = +sideArea.width / +edBounds.width;
    // let UID = Math.random().toString(36).substr(2, 9);    
    setItemsAttrs({elements: images, items, diff, y: centerItems.y, x: centerItems.x, sideCoef})
    setItemsAttrs({elements: texts, items, diff, y: centerItems.y, x: centerItems.x, sideCoef})
    
    if(prinSizemask) {   
      let inside = groups.querySelector('svg [mask]');
      inside.setAttribute('mask', `url(#printMask${id})` ) 
      prinSizemask.parentNode.setAttribute('id', `printMask${id}`)   
      setPrintSizeMaskAttr(prinSizemask, diff, centerItems, sideCoef, sideArea, edBounds);
    }

    return svg.parentElement.innerHTML;
 }

 function setItemsAttrs({elements, items, diff, y, x, sideCoef}) {   
    elements.forEach(curEl => {
        let itemId = curEl.getAttribute("data-id");
        let item = items.find(el => el.dataId == itemId);
       
        if(curEl && item) {  
        let difCenterBeforeX = (x - item.el.x - item.el.width / 2) / 2;
        let difCenterBeforeY =
          (y - item.el.y - item.el.height / 2) / 2;

        let difCenterAfterY = difCenterBeforeY * diff;
        let difCenterAfterX = difCenterBeforeX * diff;


        let newX = +item.x - ((+difCenterAfterX - +difCenterBeforeX)* sideCoef * 2 +
          (+item.width * diff - +item.width) / 2);
        let newY = +item.y - ((difCenterAfterY - difCenterBeforeY)* sideCoef * 2 +
          (+item.height * diff - +item.height) / 2);
        let newWidth =  +item.width * diff;
        let newHeight = +item.height * diff;
        if (item.type == "text") {
          let newFS = Math.floor(+newHeight / item.text.length);
          curEl.setAttribute('font-size', newFS);
        }

        curEl.parentNode.setAttribute('width', newWidth);
        curEl.parentNode.setAttribute('height', newHeight);        
        curEl.parentNode.setAttribute('x', newX); 
        curEl.parentNode.setAttribute('y', newY);
        curEl.setAttribute('width', newWidth);
        curEl.setAttribute('height', newHeight);
        }
       
      });
 }

 function setPrintSizeMaskAttr(prinSizemask, diff, centerItems, sideCoef, sideArea, edBounds) {
      let x = +prinSizemask.getAttribute('x');
      let y = +prinSizemask.getAttribute('y');
      let width = +prinSizemask.getAttribute('width');
      let height = +prinSizemask.getAttribute('height');     
       
      let xEl = edBounds.x + edBounds.width/+sideArea.width*(x - +sideArea.x);
      let wEl = edBounds.width/+sideArea.width*width;
      let difCenterBeforeX = (centerItems.x - xEl - wEl / 2) / 2;
      let yEl = edBounds.y + edBounds.height/+sideArea.height*(y - +sideArea.y);
      let hEl = edBounds.height/+sideArea.height*height;
      let difCenterBeforeY = (centerItems.y - yEl - hEl / 2) / 2;
      let difCenterAfterX = difCenterBeforeX * diff;
      let difCenterAfterY = difCenterBeforeY * diff;
      let newWidth =  +width * diff;
      let newHeight = +height * diff; 
      let newX = +x - ((+difCenterAfterX - +difCenterBeforeX)* sideCoef * 2 + (newWidth - +width) / 2);
      let newY = +y - ((+difCenterAfterY - +difCenterBeforeY)* sideCoef * 2 + (newHeight - +height) / 2);  
          
      prinSizemask.setAttribute('width', newWidth);
      prinSizemask.setAttribute('height', newHeight);   
      prinSizemask.setAttribute('x', newX ); 
      prinSizemask.setAttribute('y', newY);
 }
