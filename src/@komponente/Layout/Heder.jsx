import { AutorizacijaStorage, KorpaStorage } from '@storage';
import useAutorizacija from '@store/autorizacija';
import useKorpa from '@store/korpa';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Korpa from '../UI/KorpaIkona';

function Heder() {
  const lokacijaInfo = useLocation();
  const { logout, ulogovaniKorisnik } = useAutorizacija();
  const { ocistiSveNarudzbine } = useKorpa();

  const izlogujKorisnika = async () => {
    const autorizacijaStorage = new AutorizacijaStorage();
    const korpaStorage = new KorpaStorage();
    await logout();
    autorizacijaStorage.obrisiKorisnika();
    korpaStorage.obrisiKorpu();
    ocistiSveNarudzbine();
  };
  return (
    <header className="p-3 bg-slate-600 text-cyan-200 text-center">
      <nav>
        <ul className="flex justify-center">
          <li className="cursor-pointer">
            <Link className="block p-2" to="/">
              <img className="h-7" alt="logo" src="logo.jpeg" />
            </Link>
          </li>
          <li
            className={`flex-1 m-1 cursor-pointer transition-colors ${
              lokacijaInfo.pathname === '/' ? 'bg-slate-500' : ''
            } hover:bg-slate-500`}
          >
            <Link className="block p-2" to="/">
              Pocetna
            </Link>
          </li>
          <li
            className={`flex-1 m-1 cursor-pointer transition-colors ${
              lokacijaInfo.pathname === '/info' ? 'bg-slate-500' : ''
            } hover:bg-slate-500`}
          >
            <Link className="block p-2 whitespace-nowrap" to="/info">
              O nama
            </Link>
          </li>

          {!ulogovaniKorisnik ? (
            <>
              <li
                className={`flex-1 m-1 cursor-pointer transition-colors ${
                  lokacijaInfo.pathname === '/registracija'
                    ? 'bg-slate-500'
                    : ''
                } hover:bg-slate-500`}
              >
                <Link className="block p-2" to="/registracija">
                  Registracija
                </Link>
              </li>
              <li
                className={`flex-1 m-1 cursor-pointer transition-colors ${
                  lokacijaInfo.pathname === '/login' ? 'bg-slate-500' : ''
                } hover:bg-slate-500`}
              >
                <Link className="block p-2" to="/login">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li
                className={`flex-1 m-1 cursor-pointer transition-colors ${
                  lokacijaInfo.pathname === '/dodaj-igru' ? 'bg-slate-500' : ''
                } hover:bg-slate-500`}
              >
                <Link className="block p-2" to="/dodaj-igru">
                  Dodaj igru
                </Link>
              </li>

              <li
                className={`flex-1 m-1 cursor-pointer transition-colors ${
                  lokacijaInfo.pathname === '/narudzbine' ? 'bg-slate-500' : ''
                } hover:bg-slate-500`}
              >
                <Link className="block p-2" to="/narudzbine">
                  Moje narudzbine
                </Link>
              </li>

              <li className="flex-1 m-1 cursor-pointer transition-colors hover:bg-slate-500">
                <button
                  onClick={izlogujKorisnika}
                  type="button"
                  className="block p-2 w-full"
                >
                  Logout
                </button>
              </li>
              <li className="flex-1 m-1">
                <p className="block p-2 w-full">
                  <span className="text-small">{ulogovaniKorisnik.email}</span>
                </p>
              </li>
            </>
          )}

          <li className="m-1 cursor-pointer">
            <Korpa />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Heder;
