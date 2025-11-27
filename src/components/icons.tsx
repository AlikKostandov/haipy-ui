import React from "react";

/**
 * Иконка загрузки
 */
export const IconUpload = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
    <path
      fill="currentColor"
      d="M12 3l4 4h-3v6h-2V7H8l4-4zM5 18h14v2H5z"
    />
  </svg>
);

/**
 * Иконка JSON / файла
 */
export const IconJson = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...props}>
    <path
      fill="currentColor"
      d="M4 3h12l4 4v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm12 3.5V7h2.5L16 6.5zM7 11h2v6H7v-2H5v-2h2v-2zm10 4h-2v2h-2v-6h4a2 2 0 1 1 0 4zm-2-2h2a1 1 0 1 0 0-2h-2v2z"
    />
  </svg>
);

/**
 * Иконка предупреждения
 */
export const IconWarn = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
    <path
      fill="currentColor"
      d="M1 21h22L12 2 1 21zm12-3h-2v2h2v-2zm0-8h-2v6h2v-6z"
    />
  </svg>
);
