import { KorpaStorage } from '@storage';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const KorpaContext = createContext({
  listaNarudzbina: [],
  dodajNarudzbinu: () => {},
  obrisiNarudzbinu: () => {},
  ocistiSveNarudzbine: () => {},
});

export function KorpaProvider({ children }) {
  const korpaStorage = new KorpaStorage();
  const [listaNarudzbina, setujListuNarudzbina] = useState(
    korpaStorage.vratiKorpu() || []
  );

  const dodajNarudzbinu = useCallback(
    (narudzbina) => setujListuNarudzbina([...listaNarudzbina, narudzbina]),
    [setujListuNarudzbina, listaNarudzbina]
  );

  const obrisiNarudzbinu = useCallback(
    (id) => {
      const narudzbinaZaBrisanjeIdx = listaNarudzbina.findIndex(
        (narudzbina) => narudzbina.id === id
      );
      const filtriranaLista = [...listaNarudzbina];
      filtriranaLista[narudzbinaZaBrisanjeIdx] = null;
      setujListuNarudzbina(filtriranaLista.filter(Boolean));
    },
    [setujListuNarudzbina, listaNarudzbina]
  );

  const ocistiSveNarudzbine = useCallback(
    () => setujListuNarudzbina([]),
    [setujListuNarudzbina]
  );

  const vrednosti = useMemo(
    () => ({
      listaNarudzbina,
      dodajNarudzbinu,
      obrisiNarudzbinu,
      ocistiSveNarudzbine,
    }),
    [listaNarudzbina, dodajNarudzbinu, obrisiNarudzbinu, ocistiSveNarudzbine]
  );

  return (
    <KorpaContext.Provider value={vrednosti}>{children}</KorpaContext.Provider>
  );
}

const useKorpa = () => useContext(KorpaContext);

export default useKorpa;
