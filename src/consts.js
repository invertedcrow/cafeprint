const TEXT_ALIGNMENT_START          = 'start';
const TEXT_ALIGNMENT_MIDDLE         = 'middle';
const TEXT_ALIGNMENT_END            = 'end';
const TEXT_ALIGNMENT_JUSTIFIED      = 'justified';

const CONSTRUCTOR_HANDLE_ROTATE     = 1;
const CONSTRUCTOR_HANDLE_REMOVE     = 2;
const CONSTRUCTOR_HANDLE_SCALE      = 3;

const SIDE_FRONT    = 1;
const SIDE_BACK     = 2;
const SIDE_RIGHT    = 3;
const SIDE_LEFT     = 4;

const SIDEBAR_PRODUCT   = 'product';
const SIDEBAR_TEXT      = 'text';
const SIDEBAR_FONT      = 'font';
const SIDEBAR_LAYERS    = 'layers';
const SIDEBAR_ARTICLE   = 'article';
const SIDEBAR_PRICE     = 'price';

const MODAL_PRODUCTS    = 'products';
const MODAL_DESIGNS     = 'designs';
const MODAL_UPLOAD      = 'upload';
const MODAL_INFO        = 'info';
const MODAL_SIZES       = 'sizes';

export const TextAlignment = {
    START:      TEXT_ALIGNMENT_START,
    MIDDLE:     TEXT_ALIGNMENT_MIDDLE,
    END:        TEXT_ALIGNMENT_END,
    JUSTIFIED:  TEXT_ALIGNMENT_JUSTIFIED
};
export const CONSTRUCTOR_HANDLES = {
    ROTATE: CONSTRUCTOR_HANDLE_ROTATE,
    REMOVE: CONSTRUCTOR_HANDLE_REMOVE,
    SCALE:  CONSTRUCTOR_HANDLE_SCALE
};

export const SIDES = {
    FRONT:  SIDE_FRONT,
    BACK:   SIDE_BACK,
    RIGHT:  SIDE_RIGHT,
    LEFT:   SIDE_LEFT
};

export const MODALS = {
    PRODUCTS:   MODAL_PRODUCTS,
    DESIGNS:    MODAL_DESIGNS,
    UPLOAD:     MODAL_UPLOAD,
    INFO:       MODAL_INFO,
    SIZES:      MODAL_SIZES
};

export const Sidebar = {
    TEXT:       SIDEBAR_TEXT,
    FONT:       SIDEBAR_FONT,
    ARTICLE:    SIDEBAR_ARTICLE,
    LAYERS:     SIDEBAR_LAYERS,
    PRICE:      SIDEBAR_PRICE,
    PRODUCT:    SIDEBAR_PRODUCT
};

export const API_URL = "https://stage.mfest.com.ua";