import React from 'react';

function Dugme({
  id,
  children,
  tip,
  onClick = () => {},
  className = '',
  style = {},
}) {
  return (
    <button
      id={id}
      style={style}
      className={`text-center cursor-pointer p-2 bg-orange-400 w-4/12 text-white rounded hover:opacity-80 ${className}`}
      type={tip !== 'submit' ? 'button' : 'submit'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Dugme;
