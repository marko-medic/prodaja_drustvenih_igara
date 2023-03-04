import { formatirajResponseListe } from '@remote';
import ListaDrzavaServis from '@servisi/lista-drzava';
import { useEffect, useRef, useState } from 'react';

export const useListaDrzava = () => {
  const drzavaServis = useRef(new ListaDrzavaServis());
  const [listaDrzava, setujListuDrzava] = useState([]);

  useEffect(() => {
    const fetchujPodatke = async () => {
      const rezultat = await drzavaServis.current.vratiListu();
      if (!rezultat) {
        return;
      }
      setujListuDrzava(formatirajResponseListe(rezultat));
    };

    fetchujPodatke();
  }, []);

  return listaDrzava;
};
