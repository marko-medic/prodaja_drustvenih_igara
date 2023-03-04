import React from 'react';
import Dugme from '@komponente/UI/Dugme';

function FormaZaPretraguIgre({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex items-center mb-4 sm:mb-0">
      <input
        name="filter"
        className="p-2 mr-2"
        placeholder="Pretraga po nazivu"
      />
      <Dugme className="!w-32" tip="submit">
        Pretrazi
      </Dugme>
    </form>
  );
}

export default FormaZaPretraguIgre;
