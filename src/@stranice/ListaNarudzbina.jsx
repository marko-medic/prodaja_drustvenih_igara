import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { v4 as uuid } from 'uuid';
import DrustvenaIgra from '@komponente/Parcijali/DrustvenaIgra';
import Dugme from '@komponente/UI/Dugme';
import Spiner from '@komponente/UI/Spiner';
import useAutorizacija from '@store/autorizacija';
import { vratiUkupnuCenu } from '@helperi';
import { useListaNarudzbina } from '@hooks/ListaNaurdzbina';

function ListaNarudzbina() {
  const { ulogovaniKorisnik } = useAutorizacija();
  const listaNarudzbina = useListaNarudzbina(ulogovaniKorisnik.uid);
  const navigiranje = useNavigate();

  if (!listaNarudzbina) {
    return <Spiner />;
  }

  if (isEmpty(listaNarudzbina)) {
    return (
      <>
        <h1 className="text-2xl">Nemate ni jednu kupljenu igru</h1>
        <Dugme onClick={() => navigiranje('/')} className="!w-64 mt-3">
          Vrati se na pocetnu stranicu
        </Dugme>
      </>
    );
  }

  return (
    <div>
      <h1 className="text-3xl">Lista narudzbina:</h1>
      {listaNarudzbina.map((narudzbina, index) => (
        <div className="bg-orange-300 p-2 mt-3" key={uuid()}>
          <p className="mt-2 ml-3">
            Redni broj narudzbine: <strong>#{index + 1}</strong>
          </p>
          {narudzbina.map((podaciONarudzbini) => (
            <React.Fragment key={uuid()}>
              <DrustvenaIgra
                {...podaciONarudzbini}
                cena={
                  Number(podaciONarudzbini.cena) / podaciONarudzbini.kolicina
                }
              />
              <p>
                Ukupna cena za igru: <strong>{podaciONarudzbini.cena}</strong>
                <small>rsd</small>
              </p>
              <hr className="m-3" />
            </React.Fragment>
          ))}
          <p>
            Ukupna cena porudzbine:{' '}
            <strong>{vratiUkupnuCenu(narudzbina)}</strong>
            <small>rsd</small>
          </p>
        </div>
      ))}
      <Dugme className="mt-3 !bg-green-500" onClick={window.print}>
        Stampa
      </Dugme>
    </div>
  );
}

export default ListaNarudzbina;
