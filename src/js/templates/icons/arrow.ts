export const renderIconArrow = (
  width: number | undefined = undefined,
  height: number | undefined = undefined
): string =>
  `<svg width="${width || 25}" height="${
    height || 19
  }" viewBox="0 0 25 19" xmlns="http://www.w3.org/2000/svg">
    <g fill-rule="nonzero">
      <path d="M22 8v3H.5V8z"/>
      <path d="M13.17 3.08L15.253.92l8.91 8.58-8.91 8.58-2.081-2.16 6.666-6.42z"/>
    </g>
  </svg>`;
