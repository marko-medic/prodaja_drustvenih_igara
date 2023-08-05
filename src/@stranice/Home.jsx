import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import IgraIzPocetne from '@komponente/Parcijali/IgraIzPocetne';
import Spiner from '@komponente/UI/Spiner';
import { useDrustveneIgre } from '@hooks/DrustveneIgre';
import FormaZaPretraguIgre from '@komponente/Parcijali/FormaZaPretraguIgre';
import AnimacionaStranica from '@komponente/Layout/AnimacionaStranica';
import DugmeZaStampu from '@komponente/UI/DugmeZaStampu';

function Home() {
  const [textPretrage, setujTextPretrage] = useState('');
  const [sort, setujSort] = useState({
    tip: 'asc',
    vrednost: 'minBrojIgraca',
  });
  const { listaDostupnihIgara, setujListuDostupnihIgara } = useDrustveneIgre(
    textPretrage,
    sort
  );

  const filtrirajRezultate = (e) => {
    e.preventDefault();
    const pretraga = e.target.filter?.value || '';
    setujTextPretrage(pretraga);
  };

  const setSort = (e) => {
    const vrednost = e.target.value;
    const { tip } = e.target.options[e.target.selectedIndex].dataset;
    setujSort({ vrednost, tip });
  };

  const osveziListuIgara = (idObrisaneIgre) => {
    const novaListaIgara = listaDostupnihIgara.filter(
      (igra) => igra.id !== idObrisaneIgre
    );
    setujListuDostupnihIgara(novaListaIgara);
  };

  if (!listaDostupnihIgara) {
    return <Spiner />;
  }

  if (isEmpty(listaDostupnihIgara)) {
    return (
      <>
        <h1 className="text-2xl mb-3">
          Trenutno nemamo {textPretrage ? 'trazene' : 'dostupne'} igre na sajtu
          :(
        </h1>
        <FormaZaPretraguIgre onSubmit={filtrirajRezultate} />
      </>
    );
  }

  return (
    <AnimacionaStranica>
      <div className="h-full w-full p-5">
        <h1 className="text-2xl mb-3">Lista dostupnih igara:</h1>
        <div className="flex justify-between flex-col sm:flex-row">
          <FormaZaPretraguIgre onSubmit={filtrirajRezultate} />
          <select
            name="sort"
            id="sort"
            defaultValue="default"
            className="w-full p-2 ml-0 sm:w-2/6 sm:ml-2"
            onChange={setSort}
          >
            <option disabled value="default">
              Sortiraj
            </option>
            <option data-tip="asc" value="cena">
              Cena (rastuce)
            </option>
            <option data-tip="desc" value="cena">
              Cena (opadajuce)
            </option>
            <option data-tip="asc" value="minBrojIgraca">
              Minimalni broj igraca (rastuce)
            </option>
            <option data-tip="desc" value="minBrojIgraca">
              Minimalni broj igraca (opadajuce)
            </option>
            <option data-tip="asc" value="maxBrojIgraca">
              Maksimalni broj igraca (rastuce)
            </option>
            <option data-tip="desc" value="maxBrojIgraca">
              Maksimalni broj igraca (opadajuce)
            </option>
          </select>
        </div>
        <div className="printabilna-sekcija">
          {listaDostupnihIgara.map((igra) => (
            <IgraIzPocetne
              key={igra.id}
              osveziListuIgara={osveziListuIgara}
              {...igra}
            />
          ))}
        </div>
        <DugmeZaStampu />
      </div>
    </AnimacionaStranica>
  );
}

export default Home;
