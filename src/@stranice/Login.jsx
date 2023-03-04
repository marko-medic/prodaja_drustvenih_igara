import React, { useRef } from 'react';
import { AutorizacijaStorage } from '@storage';
import useAutorizacija from '@store/autorizacija';
import Dugme from '@komponente/UI/Dugme';
import { toast } from 'react-toastify';

function Login() {
  const autorizacijaStorage = useRef(new AutorizacijaStorage());
  const { login } = useAutorizacija();

  const ulogujKorisnika = async (e) => {
    e.preventDefault();
    const forma = e.target;
    const kontaktPodaci = {
      email: forma.email.value,
      lozinka: forma.lozinka.value,
    };
    try {
      const ulogovaniKorisnik = await login(kontaktPodaci);
      if (!ulogovaniKorisnik) {
        toast('Doslo je do greske!', { type: 'error' });
        return;
      }
      autorizacijaStorage.current.sacuvajKorisnika(ulogovaniKorisnik.user);
      toast('Uspesno ste se ulogovali', { type: 'success' });
      forma.reset();
    } catch (greska) {
      toast(greska.message, { type: 'error' });
    }
  };

  return (
    <div>
      <h1 className="text-3xl mb-5">Login</h1>
      <form className="flex flex-col w-3/5" onSubmit={ulogujKorisnika}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            autoComplete="off"
            required
            id="email"
            name="email"
            className="border-sky-300 border w-full mb-5 ml-2"
          />
        </label>

        <label htmlFor="lozinka">
          Lozinka:
          <input
            type="password"
            autoComplete="off"
            required
            id="lozinka"
            name="lozinka"
            className="border-sky-300 border w-full ml-2"
          />
        </label>

        <div className="ml-2">
          <Dugme tip="submit" className="mt-3">
            Login
          </Dugme>
        </div>
      </form>
    </div>
  );
}

export default Login;
