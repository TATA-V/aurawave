import React from 'react';

interface Props {
  strokeWidth: number;
}

function XIcon({ strokeWidth } : Props) {
  return (
    <svg
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g filter="url(#a)">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="m9.475 12.425 4.95-4.95m-4.95 0 4.95 4.95"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="a"
          width={22.25}
          height={22.25}
          x={0.825}
          y={0.825}
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
          <feGaussianBlur stdDeviation={4} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_828_193" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_828_193"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default XIcon;
