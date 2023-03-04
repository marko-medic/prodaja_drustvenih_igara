import { formatirajPodatkeZaBazu } from '@remote';
import Dugme from '@komponente/UI/Dugme';
import { ListaIgaraServis } from '@servisi';
import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { last } from 'lodash';
import Spiner from '@komponente/UI/Spiner';
import { toast } from 'react-toastify';
import { useListaDrzava } from '@hooks/ListaDrzava';
import { useDrustvenaIgra } from '@hooks/DrustveneIgre';

function Izmena() {
  const listaIgaraServis = useRef(new ListaIgaraServis());
  const navigiranje = useNavigate();
  const { pathname } = useLocation();
  const podaciZaIgru = useDrustvenaIgra(last(pathname.split('/')));
  const listaDrzava = useListaDrzava();

  const izmeniPodatke = async (e) => {
    e.preventDefault();
    const forma = e.target;

    const podaciZaIzmenu = {
      naziv: forma.naziv.value,
      minBrojIgraca: forma.minBrojIgraca.value,
      maxBrojIgraca: forma.maxBrojIgraca.value,
      cena: forma.cena.value,
      url: forma.url.value,
      zemljaPorekla: forma.zemljaPorekla.value,
    };

    if (
      Number(podaciZaIzmenu.minBrojIgraca) >
      Number(podaciZaIzmenu.maxBrojIgraca)
    ) {
      toast(
        'Minimalni broj igraca mora biti manji ili jednak maksimalnom broju igraca',
        { type: 'error' }
      );
      return;
    }

    if (podaciZaIzmenu.zemljaPorekla === 'default') {
      toast('Morate izabrati zemlju porekla', { type: 'error' });
      return;
    }

    try {
      const idIgre = last(pathname.split('/'));
      await listaIgaraServis.current.izmeni(
        idIgre,
        formatirajPodatkeZaBazu(podaciZaIzmenu)
      );
      navigiranje('/');
    } catch (greska) {
      toast(greska.message, { type: 'error' });
    }
  };

  if (!podaciZaIgru) {
    return <Spiner />;
  }

  return (
    <div>
      <h1 className="text-2xl">Izmeni drustvenu igru:</h1>
      <form className="flex flex-col" onSubmit={izmeniPodatke}>
        <input
          name="naziv"
          defaultValue={podaciZaIgru.naziv}
          type="text"
          className="mt-2 w-2/6 p-1"
          placeholder="Naziv igre"
          required
        />
        <input
          name="minBrojIgraca"
          defaultValue={podaciZaIgru.minBrojIgraca}
          type="number"
          className="mt-2 w-2/6 p-1"
          placeholder="Min broj igraca"
          required
        />
        <input
          name="maxBrojIgraca"
          defaultValue={podaciZaIgru.maxBrojIgraca}
          type="number"
          className="mt-2 w-2/6 p-1"
          placeholder="Max broj igraca"
          required
        />
        <input
          name="cena"
          defaultValue={podaciZaIgru.cena}
          type="number"
          className="mt-2 w-2/6 p-1"
          placeholder="Cena (rsd)"
          required
        />
        <input
          name="url"
          defaultValue={podaciZaIgru.url}
          type="url"
          className="mt-2 w-2/6 p-1"
          placeholder="Url slike"
          required
        />
        {listaDrzava.length > 0 && (
          <select
            defaultValue={podaciZaIgru.zemljaPorekla}
            name="zemljaPorekla"
            className="mt-2 w-2/6 p-1"
            required
          >
            {listaDrzava.map((drzava) => (
              <option key={drzava.id} value={drzava.naziv}>
                {drzava.naziv}
              </option>
            ))}
          </select>
        )}
        <Dugme tip="submit" className="!w-32 mt-3">
          Potvrdi izmenu
        </Dugme>
      </form>
    </div>
  );
}

export default Izmena;
