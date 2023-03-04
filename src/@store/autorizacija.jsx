import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@remote';
import { AutorizacijaStorage } from '@storage';

const AutorizacijaContext = createContext({
  ulogovaniKorisnik: null,
  login: async () => {},
  logout: async () => {},
  registruj: async () => {},
});

export function AutorizacijaProvider({ children }) {
  const autorizacijaStorage = useRef(new AutorizacijaStorage());
  const [ulogovaniKorisnik, setujUlogovanogKorisnika] = useState(
    autorizacijaStorage.current.vratiKorisnika() || null
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setujUlogovanogKorisnika);
    return unsubscribe;
  }, []);

  const login = useCallback(async (podaciKorisnika) => {
    const korisnik = await signInWithEmailAndPassword(
      auth,
      podaciKorisnika.email,
      podaciKorisnika.lozinka
    );
    return korisnik;
  }, []);

  const logout = useCallback(async () => {
    setujUlogovanogKorisnika(null);
    await signOut(auth);
  }, [setujUlogovanogKorisnika]);

  const registruj = useCallback(async (podaciKorisnika) => {
    const noviKorisnik = await createUserWithEmailAndPassword(
      auth,
      podaciKorisnika.email,
      podaciKorisnika.lozinka
    );
    return noviKorisnik;
  }, []);

  const vrednosti = useMemo(
    () => ({
      ulogovaniKorisnik,
      login,
      logout,
      registruj,
    }),
    [ulogovaniKorisnik, login, logout, registruj]
  );

  return (
    <AutorizacijaContext.Provider value={vrednosti}>
      {children}
    </AutorizacijaContext.Provider>
  );
}

const useAutorizacija = () => useContext(AutorizacijaContext);

export default useAutorizacija;
