<template>
  <div class="constructor-custom-checkbox" :class="{checked: checked}">
    <svg
      v-if="checked"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
    >
      <path
        d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: ["checked"]
};
</script>

<style lang="scss" scoped>
.constructor-custom-checkbox {
    width: 21px;
    height: 21px;
    border-radius: 4px;
    border: 1px solid #a2a2a2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    img {
        width: 80%;
        height: 80%;
        display: none;
    }
    &.checked {
        background-color: #72B425;
        img {
            display: block;
        }

    }
}

svg {
  width: 14px;
  height: 14px;
  fill: #fff;
}
</style>
