import React from 'react';
import { Link } from 'react-router-dom';

function NepostojecaStranica() {
  return (
    <div>
      <h3 className="text-3xl">Stranica koju trazite ne postoji :(</h3>
      <p>Vratite se na pocetnu stranicu</p>
      <Link
        className="bg-orange-500 text-white p-3 block mt-2 w-40 h-auto rounded text-center"
        to="/"
      >
        Pocetna stranica
      </Link>
    </div>
  );
}

export default NepostojecaStranica;
