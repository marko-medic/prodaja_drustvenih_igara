import Dugme from '@komponente/UI/Dugme';
import useKorpa from '@store/korpa';
import React from 'react';
import DrustvenaIgra from './DrustvenaIgra';

function IgraIzKorpe({
  id,
  naziv,
  cena,
  minBrojIgraca,
  maxBrojIgraca,
  url,
  zemljaPorekla,
  kolicina,
}) {
  const { dodajNarudzbinu, obrisiNarudzbinu } = useKorpa();
  const povecajBroj = () => {
    const podaciONarudzbini = {
      id,
      naziv,
      cena,
      minBrojIgraca,
      maxBrojIgraca,
      url,
      zemljaPorekla,
    };
    dodajNarudzbinu(podaciONarudzbini);
  };

  const smanjiBroj = () => {
    obrisiNarudzbinu(id);
  };

  return (
    <div className="mt-3 bg-orange-300 rounded p-3">
      <DrustvenaIgra
        naziv={naziv}
        cena={cena}
        minBrojIgraca={minBrojIgraca}
        maxBrojIgraca={maxBrojIgraca}
        zemljaPorekla={zemljaPorekla}
        kolicina={kolicina}
        url={url}
      />
      <div>
        <Dugme onClick={povecajBroj}>+</Dugme>
        <Dugme onClick={smanjiBroj} className="ml-3">
          -
        </Dugme>
      </div>
    </div>
  );
}

export default IgraIzKorpe;
