import { grupisiNiz, mapirajSumu, vratiUkupnuCenu } from '@helperi';
import IgraIzKorpe from '@komponente/Parcijali/IgraIzKorpe';
import Dugme from '@komponente/UI/Dugme';
import { formatirajPodatkeZaBazu } from '@remote';
import { NarudzbineServis } from '@servisi';
import useAutorizacija from '@store/autorizacija';
import useKorpa from '@store/korpa';
import { isEmpty } from 'lodash';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Korpa() {
  const { listaNarudzbina, ocistiSveNarudzbine } = useKorpa();
  const navigiranje = useNavigate();
  const narudzbinaServis = useRef(new NarudzbineServis());
  const { ulogovaniKorisnik } = useAutorizacija();

  const grupisanaLista = grupisiNiz(listaNarudzbina);

  const potvrdiKupovinu = async () => {
    const podaciONarudzbini = {
      korisnik: formatirajPodatkeZaBazu({
        id: ulogovaniKorisnik.uid,
        email: ulogovaniKorisnik.email,
      }),
      lista: formatirajPodatkeZaBazu(
        mapirajSumu(grupisanaLista).map((narudzbina) =>
          formatirajPodatkeZaBazu(narudzbina)
        )
      ),
    };
    try {
      await narudzbinaServis.current.sacuvajNarudzbinu(
        formatirajPodatkeZaBazu(podaciONarudzbini)
      );
      toast('Kupovina je uspesno izvrsena', { type: 'success' });
      ocistiSveNarudzbine();
      navigiranje('/narudzbine');
    } catch (greska) {
      toast(greska.message, { type: 'error' });
    }
  };

  if (isEmpty(listaNarudzbina)) {
    return (
      <>
        <h1 className="text-2xl">Korpa je prazna</h1>
        <Dugme onClick={() => navigiranje('/')} className="w-64">
          Vratite se na pocetnu stranicu
        </Dugme>
      </>
    );
  }

  return (
    <div>
      <h1 className="text-2xl">Vasa korpa:</h1>
      {grupisanaLista.map((igra) => (
        <IgraIzKorpe key={igra.id} {...igra} />
      ))}
      <p className="mt-3 text-green-600">
        Ukupna cena:{' '}
        <strong>{vratiUkupnuCenu(mapirajSumu(grupisanaLista))}</strong>
        <small>rsd</small>
      </p>
      <Dugme onClick={potvrdiKupovinu} className="w-64 mt-3">
        Potvrdi kupovinu
      </Dugme>
    </div>
  );
}

export default Korpa;
