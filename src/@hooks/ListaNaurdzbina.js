import { formatirajPodatkeZaIspis, formatirajResponseListe } from '@remote';
import { NarudzbineServis } from '@servisi';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export const useListaNarudzbina = (idKorisnika) => {
  const narudzbineServis = useRef(new NarudzbineServis());
  const [listaNarudzbina, setujListuNarudzbina] = useState(null);

  useEffect(() => {
    const fetchujPodatke = async () => {
      try {
        const rezultat = await narudzbineServis.current.vratiListu();
        if (!rezultat) {
          return;
        }

        const listaNarudzbinaTrenutnogKorisnika = formatirajResponseListe(
          rezultat
        ).filter((r) => r.korisnik.fields?.id.stringValue === idKorisnika);

        const formatiranaListaNarudzbina = listaNarudzbinaTrenutnogKorisnika
          ? listaNarudzbinaTrenutnogKorisnika
              .map((igra) => igra.lista?.fields)
              .map((igra) =>
                Object.values(igra).map((i) =>
                  formatirajPodatkeZaIspis(i.mapValue.fields)
                )
              )
          : [];
        setujListuNarudzbina(formatiranaListaNarudzbina);
      } catch (greska) {
        toast(greska.message, { type: 'error' });
      }
    };
    fetchujPodatke();
  }, [idKorisnika]);

  return listaNarudzbina;
};
