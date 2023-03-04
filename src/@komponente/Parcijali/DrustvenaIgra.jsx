import React from 'react';

function DrustvenaIgra({
  naziv,
  cena,
  minBrojIgraca,
  maxBrojIgraca,
  url,
  zemljaPorekla,
  kolicina = null,
}) {
  return (
    <div className="flex flex-col rounded bg-orange-300 mt-3 p-3">
      <p>Naziv igre: {naziv}</p>
      <p>
        Cena po igri: {cena} <small>rsd</small>
      </p>
      <p>Mininalni broj igraca: {minBrojIgraca}</p>
      <p>Maksimalni broj igraca: {maxBrojIgraca}</p>
      <p>Zemlja porekla: {zemljaPorekla}</p>
      {kolicina && <p>Kolicina: {kolicina}</p>}
      <img className="w-4/12 h-3/12 mt-3" alt="drustvena-igra-img" src={url} />
    </div>
  );
}

export default DrustvenaIgra;
