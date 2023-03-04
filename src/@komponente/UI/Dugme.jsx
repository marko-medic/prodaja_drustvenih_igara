import React from 'react';

function Dugme({ children, tip, onClick = () => {}, className = '' }) {
  return (
    <button
      className={`text-center cursor-pointer p-2 bg-orange-400 w-1/12 mt-3 text-white rounded ${className}`}
      type={tip !== 'submit' ? 'button' : 'submit'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Dugme;
