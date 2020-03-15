<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       xmlnsXlink="http://www.w3.org/1999/xlink"
       style="position: absolute; width: 0; height: 0">
    <defs>
      <symbol viewBox="0 0 1024 1024"
              id="menu-fold">
        <path d="M576 256 96 256C76.8 256 64 243.2 64 224s12.8-32 32-32l480 0c19.2 0 32 12.8 32 32S595.2 256 576 256z"></path>
        <path d="M576 544 96 544c-19.2 0-32-12.8-32-32s12.8-32 32-32l480 0c19.2 0 32 12.8 32 32S595.2 544 576 544z"></path>
        <path d="M928 832 96 832c-19.2 0-32-12.8-32-32s12.8-32 32-32l832 0c19.2 0 32 12.8 32 32S947.2 832 928 832z"></path>
        <path d="M928 544c9.6 0 16-3.2 22.4-9.6 12.8-12.8 9.6-32-3.2-44.8l-134.4-121.6 134.4-121.6c12.8-12.8 12.8-32 3.2-44.8-12.8-12.8-32-12.8-44.8-3.2l-160 144c-6.4 6.4-9.6 16-9.6 22.4s3.2 19.2 9.6 22.4l160 144C912 540.8 921.6 544 928 544z"></path>
      </symbol>

      <symbol viewBox="0 0 1024 1024"
              id="menu-unfold">
        <path d="M576 256 96 256C76.8 256 64 243.2 64 224s12.8-32 32-32l480 0c19.2 0 32 12.8 32 32S595.2 256 576 256z"></path>
        <path d="M576 544 96 544c-19.2 0-32-12.8-32-32s12.8-32 32-32l480 0c19.2 0 32 12.8 32 32S595.2 544 576 544z"></path>
        <path d="M928 832 96 832c-19.2 0-32-12.8-32-32s12.8-32 32-32l832 0c19.2 0 32 12.8 32 32S947.2 832 928 832z"></path>
        <path d="M768 544c-9.6 0-16-3.2-22.4-9.6-12.8-12.8-9.6-32 3.2-44.8l134.4-121.6-134.4-121.6c-12.8-12.8-12.8-32-3.2-44.8 12.8-12.8 32-12.8 44.8-3.2l160 144c6.4 6.4 9.6 16 9.6 22.4s-3.2 19.2-9.6 22.4l-160 144C784 540.8 774.4 544 768 544z"></path>
      </symbol>

      <symbol viewBox="0 0 1457 651"
              id="body">
        <g id="页面1"
           stroke="none"
           stroke-width="1"
           fill="none"
           fill-rule="evenodd">
          <g id="body">
            <rect id="矩形"
                  fill="#282828"
                  transform="translate(1111.405592, 620.405592) rotate(45.000000) translate(-1111.405592, -620.405592) "
                  x="989.90559"
                  y="598.905592"
                  width="43"
                  height="43"></rect>
            <rect id="矩形"
                  fill="#282828"
                  transform="translate(127.254834, 230.254834) rotate(40.000000) translate(-127.254834, -230.254834) "
                  x="295.254834"
                  y="8.254834"
                  width="64"
                  height="64"></rect>
            <circle id="Oval-7"
                    fill="#333"
                    fill-rule="nonzero"
                    opacity="0.45"
                    cx="1086.5"
                    cy="27.5"
                    r="23.5"></circle>
            <circle id="Oval-7"
                    fill="#282828"
                    fill-rule="nonzero"
                    opacity="0.45"
                    cx="491"
                    cy="51"
                    r="18"></circle>
            <circle id="Oval-7"
                    fill="#282828"
                    fill-rule="nonzero"
                    opacity="0.45"
                    cx="1088"
                    cy="499"
                    r="18"></circle>
            <ellipse id="Oval-7"
                     stroke="#282828"
                     stroke-width="10"
                     fill-opacity="0"
                     fill="#FFFFFF"
                     fill-rule="nonzero"
                     opacity="0.45"
                     cx="973.5"
                     cy="331.5"
                     rx="78.5"
                     ry="79.5"></ellipse>
            <ellipse id="Oval-7"
                     stroke="#222"
                     stroke-width="10"
                     fill-opacity="0"
                     fill="#FFFFFF"
                     fill-rule="nonzero"
                     opacity="0.45"
                     cx="480"
                     cy="481.5"
                     rx="44"
                     ry="44.5"></ellipse>
          </g>
        </g>
      </symbol>

      <symbol viewBox="0 0 1024 1024"
              id="router-module">
        <path d="M255.9 320H512v64H255.9z"></path>
        <path d="M896 640V128H640V64H320L128 256v384H64v192c0 70.7 57.3 128 128 128h640c70.7 0 128-57.3 128-128V640h-64z m-64-448v448h-64V192h64z m-128 0v448h-64V192h64z m-512 90.5l26.5-26.5H320V154.5l26.5-26.5H576h-0.4v512H192V282.5zM640 832H384v-64h256v64z"></path>
        <path d="M255.3 448h256.1v64H255.3z"></path>
      </symbol>

      <symbol viewBox="0 0 1024 1024"
              id="router-editor">
        <path d="M736 0 288 0c-52.8 0-96 43.2-96 96l0 832c0 52.8 43.2 96 96 96l448 0c52.8 0 96-43.2 96-96L832 96C832 43.2 788.8 0 736 0zM384 48l256 0 0 32L384 80 384 48zM512 960c-35.346 0-64-28.654-64-64s28.654-64 64-64 64 28.654 64 64S547.346 960 512 960zM768 768 256 768 256 128l512 0L768 768z"></path>
      </symbol>
    </defs>
  </svg>
</template>
