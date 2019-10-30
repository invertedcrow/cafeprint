import {SIDES} from "../../consts";

const productDefault = {
    product: '',
    color: '',
    size: '',
    side: '',
    id: '',
    sides: [
        {
            items: [],
            key: SIDES.FRONT,
            title: 'Front',
            area: {
                x: 138,
                y: 124.966,
                width: 210,
                height: 300
            },
            preview: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/1/appearances/2,width=50,height=50,version=1564376579.png',
            image: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/1/appearances/2,width=800,height=800,version=1564376579.png'
        },
        {
            items: [],
            key: SIDES.BACK,
            title: 'Back',
            area: {
                x: 138,
                y: 124.966,
                width: 210,
                height: 300
            },
            preview: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/2/appearances/2,width=50,height=50,version=1564376579.png',
            image: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/2/appearances/2,width=800,height=800,version=1564376579.png'
        },
        {
            items: [],
            key: SIDES.LEFT,
            title: 'Left',
            area: {
                x: 138,
                y: 200.966,
                width: 210,
                height: 150
            },
            preview: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/3/appearances/2,width=50,height=50,version=1564376579.png',
            image: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/3/appearances/2,width=800,height=800,version=1564376579.png'
        },
        {
            items: [],
            key: SIDES.RIGHT,
            title: 'Right',
            area: {
                x: 138,
                y: 200,
                width: 210,
                height: 150
            },
            preview: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/4/appearances/2,width=50,height=50,version=1564376579.png',
            image: '//image.spreadshirtmedia.com/image-server/v1/productTypes/812/views/4/appearances/2,width=800,height=800,version=1564376579.png'
        }
    ]
};

const initialState = {
    items: [],
    selectedElement: null,
    selectedSide: SIDES.FRONT,
    selectedProduct:  {...productDefault}
};

export const state = { ...initialState };

const getters = {
  activeSize: (state) => state.selectedProduct.size,
  selectedSide: (state) => state.selectedProduct.sides.find(x => x.key === state.selectedSide),        
  items: (state) => state.items.filter(x => x.side === state.selectedSide),
  renderSides: (state) => {
    const sides = state.selectedProduct.sides;
    const items = state.items;
    if (sides && sides.length) {
        for (let i = 0; i < sides.length; i++) {
            sides[i].items = items.filter(
            layer => layer.side == sides[i].key
          );
        }
      }
    return sides
},
};

const actions = {};

const mutations = {
    addItemToConstructor: (state, value) => state.items.push(value),
    setItemsConstructor: (state, value) => state.items = value,
    setSelectedElement: (state, value) => state.selectedElement = value,
    setSelectedSide: (state, value) => state.selectedSide = value,
    setSelectedSize: (state, value) => state.selectedProduct.size = value,
    setActiveColor: (state, value) => state.selectedProduct.color = value,  
};

export default {
    state,
    getters,
    actions,
    mutations
};