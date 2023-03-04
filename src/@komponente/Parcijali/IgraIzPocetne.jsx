import { toast } from 'react-toastify';

import { ListaIgaraServis } from '@servisi';
import useAutorizacija from '@store/autorizacija';
import useKorpa from '@store/korpa';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Dugme from '../UI/Dugme';
import DrustvenaIgra from './DrustvenaIgra';

function IgraIzPocetne({
  id,
  naziv,
  cena,
  minBrojIgraca,
  maxBrojIgraca,
  url,
  zemljaPorekla,
  osveziListuIgara,
}) {
  const listaIgaraServis = useRef(new ListaIgaraServis());
  const { ulogovaniKorisnik } = useAutorizacija();
  const { dodajNarudzbinu } = useKorpa();
  const navigiranje = useNavigate();

  const obrisiIgru = async () => {
    try {
      await listaIgaraServis.current.obrisi(id);
      osveziListuIgara(id);
      toast(`Igra "${naziv}" je uspesno obrisana`, { type: 'success' });
    } catch (greska) {
      toast(greska.message, { type: 'error' });
    }
  };

  const dodajUKorpu = () => {
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
    toast(`Drustvena igra "${naziv}" je uneta u korpu!`, {
      type: 'success',
    });
  };

  return (
    <div className="p-2 mt-5 rounded bg-orange-300">
      <DrustvenaIgra
        naziv={naziv}
        cena={cena}
        minBrojIgraca={minBrojIgraca}
        maxBrojIgraca={maxBrojIgraca}
        url={url}
        zemljaPorekla={zemljaPorekla}
      />
      <div className="flex">
        <Dugme
          onClick={dodajUKorpu}
          className="text-center bg-blue-400 mr-5 w-2/12 min-w-[25%] sm:min-w-0"
          tip="button"
        >
          Dodaj u korpu
        </Dugme>
        {ulogovaniKorisnik && (
          <>
            <Dugme
              onClick={() => navigiranje(`izmeni-igru/${id}`)}
              className="text-center mr-5 bg-orange-600 w-2/12 min-w-[25%] sm:min-w-0"
              tip="button"
            >
              Izmeni
            </Dugme>
            <Dugme
              onClick={obrisiIgru}
              className="text-center w-2/12 min-w-[25%] sm:min-w-0"
              tip="button"
            >
              Obrisi
            </Dugme>
          </>
        )}
      </div>
    </div>
  );
}

export default IgraIzPocetne;
