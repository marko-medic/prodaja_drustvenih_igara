import { useState, useEffect, useRef } from 'react';
import { formatirajResponseItema, formatirajResponseListe } from '@remote';
import { ListaIgaraServis } from '@servisi';
import { toast } from 'react-toastify';

export const useDrustveneIgre = (
  pretraga = '',
  sort = { tip: 'asc', vrednost: 'cena' }
) => {
  const [listaDostupnihIgara, setujListuDostupnihIgara] = useState(null);
  const listaIgaraServis = useRef(new ListaIgaraServis());
  const sortOpcije = ['cena', 'minBrojIgraca', 'maxBrojIgraca'];
  if (!sortOpcije.includes(sort.vrednost)) {
    throw new Error(`Sort mogu biti ${sortOpcije.join(', ')}`);
  }

  useEffect(() => {
    const fetchujPodatke = async () => {
      try {
        const rezultat = await listaIgaraServis.current.vratiListu();
        const listaIgara = formatirajResponseListe(rezultat);
        const filtriraniPodaci = listaIgara.filter((igra) =>
          igra.naziv.toLowerCase().includes(pretraga.toLowerCase())
        );
        const sortiraniPodaci = filtriraniPodaci.sort((a, b) => {
          if (sort.tip === 'asc') {
            return Number(a[sort.vrednost]) - Number(b[sort.vrednost]);
          }
          return Number(b[sort.vrednost]) - Number(a[sort.vrednost]);
        });
        setujListuDostupnihIgara(sortiraniPodaci);
      } catch (greska) {
        toast(greska.message, { type: 'error' });
      }
    };
    fetchujPodatke();
  }, [pretraga, sort]);

  return { listaDostupnihIgara, setujListuDostupnihIgara };
};

export const useDrustvenaIgra = (idIgre) => {
  const listaIgaraServis = useRef(new ListaIgaraServis());
  const [podaciZaIgru, setujPodatkeZaIgru] = useState(null);

  useEffect(() => {
    const fetchujPodatke = async () => {
      try {
        const igra = await listaIgaraServis.current.vrati(idIgre);
        setujPodatkeZaIgru(formatirajResponseItema(igra));
      } catch (greska) {
        toast(greska.message, { type: 'error' });
      }
    };

    fetchujPodatke();
  }, [idIgre]);

  return podaciZaIgru;
};
