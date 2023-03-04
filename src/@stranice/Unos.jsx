import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { formatirajPodatkeZaBazu } from '@remote';
import Dugme from '@komponente/UI/Dugme';
import { ListaIgaraServis } from '@servisi';
import { useListaDrzava } from '@hooks/ListaDrzava';

function Unos() {
  const listaIgaraServis = useRef(new ListaIgaraServis());
  const listaDrzava = useListaDrzava();

  const unesiPodatke = async (e) => {
    e.preventDefault();
    const forma = e.target;

    const zemljaPorekla = forma.zemljaPorekla.value;
    if (zemljaPorekla === 'default') {
      toast('Morate izabrati zemlju porekla', { type: 'error' });
      return;
    }

    const podaciZaUnos = {
      naziv: forma.naziv.value,
      minBrojIgraca: forma.minBrojIgraca.value,
      maxBrojIgraca: forma.maxBrojIgraca.value,
      cena: forma.cena.value,
      url: forma.url.value,
      zemljaPorekla,
    };

    if (
      Number(podaciZaUnos.minBrojIgraca) > Number(podaciZaUnos.maxBrojIgraca)
    ) {
      toast(
        'Minimalni broj igraca mora biti manji ili jednak maksimalnom broju igraca',
        { type: 'error' }
      );
      return;
    }

    try {
      await listaIgaraServis.current.unesi(
        formatirajPodatkeZaBazu(podaciZaUnos)
      );
      toast('Uspesno unesena drustvena igra!', { type: 'success' });
      forma.reset();
    } catch (greska) {
      toast(greska.message, { type: 'error' });
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Unesi novu drustvenu igru:</h1>
      <form className="flex flex-col" onSubmit={unesiPodatke}>
        <input
          name="naziv"
          type="text"
          className="mt-2 w-2/6 p-1"
          placeholder="Naziv igre"
          required
        />
        <input
          name="minBrojIgraca"
          type="number"
          className="mt-2 w-2/6 p-1"
          placeholder="Min broj igraca"
          required
        />
        <input
          name="maxBrojIgraca"
          type="number"
          className="mt-2 w-2/6 p-1"
          placeholder="Max broj igraca"
          required
        />
        <input
          name="cena"
          type="number"
          className="mt-2 w-2/6 p-1"
          placeholder="Cena (rsd)"
          required
        />
        <input
          name="url"
          type="url"
          className="mt-2 w-2/6 p-1"
          placeholder="Url slike"
          required
        />

        {listaDrzava.length > 0 && (
          <select
            name="zemljaPorekla"
            className="mt-2 w-2/6 p-1"
            defaultValue="default"
            required
          >
            <option disabled value="default">
              Zemlja porekla
            </option>
            {listaDrzava.map((drzava) => (
              <option key={drzava.id} value={drzava.naziv}>
                {drzava.naziv}
              </option>
            ))}
          </select>
        )}

        <Dugme className="w-32" tip="submit">
          Potvrdi unos
        </Dugme>
      </form>
    </div>
  );
}

export default Unos;
