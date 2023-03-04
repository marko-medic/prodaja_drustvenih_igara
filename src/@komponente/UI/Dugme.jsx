import React from 'react';

function Dugme({
  children,
  tip,
  onClick = () => {},
  className = '',
  style = {},
}) {
  return (
    <button
      style={style}
      className={`text-center cursor-pointer p-2 bg-orange-400 w-4/12 text-white rounded ${className}`}
      type={tip !== 'submit' ? 'button' : 'submit'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Dugme;
