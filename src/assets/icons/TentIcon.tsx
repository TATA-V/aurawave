import React from 'react';

function TentIcon() {
  return (
    <svg
      width={32}
      height={29}
      fill="none"
      viewBox="0 0 32 29"
    >
      <g filter="url(#a)">
        <path
          fill="#fff"
          d="m26 18.5-9.134-15a1 1 0 0 0-1.732 0L5.898 18.74S5 20.15 5 20.5c0 1 .898 1 .898 1H26s1 0 1-1c0-.35-1-2-1-2Zm-14.4 1H8.206L16 6l7.794 13.5H20.4l-4.4-8-4.4 8Zm4.4-3.85 2.117 3.85h-4.234L16 15.65Z"
        />
      </g>
      <defs>
        <filter
          id="a"
          width={32}
          height={28.5}
          x={0}
          y={0}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation={2.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_828_196" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_828_196"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default TentIcon;
