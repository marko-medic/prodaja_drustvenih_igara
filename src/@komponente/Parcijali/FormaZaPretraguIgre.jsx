import Dugme from '@komponente/UI/Dugme';
import React from 'react';

function FormaZaPretraguIgre({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        name="filter"
        className="p-2 mr-2"
        placeholder="Pretraga po nazivu"
      />
      <Dugme className="w-32" tip="submit">
        Pretrazi
      </Dugme>
    </form>
  );
}

export default FormaZaPretraguIgre;