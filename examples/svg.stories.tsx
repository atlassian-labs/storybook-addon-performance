import React from 'react';

function SVG() {
  return (
    <svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100%" height="100%" fill="lightblue" />
      <circle cx="50%" cy="50%" r="20" fill="white" />
    </svg>
  );
}

export default {
  title: 'Svg',
};

export const svg = () => <SVG />;
