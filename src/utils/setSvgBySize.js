export default function setSvgBySize({current, target, svgStr, centerItems, items, sideArea, edBounds}) {
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
    let sideCoef = +sideArea.width*diff / +edBounds.width;
    setItemsAttrs({elements: images, items, diff, y: centerItems.y, x: centerItems.x, sideCoef})
    setItemsAttrs({elements: texts, items, diff, y: centerItems.y, x: centerItems.x, sideCoef})
    

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
