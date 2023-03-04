import React, { useRef } from 'react';
import { AutorizacijaStorage } from '@storage';
import useAutorizacija from '@store/autorizacija';
import Dugme from '@komponente/UI/Dugme';
import { toast } from 'react-toastify';

function Registracija() {
  const autorizacijaStorage = useRef(new AutorizacijaStorage());

  const { registruj } = useAutorizacija();

  const registrujKorisnika = async (e) => {
    e.preventDefault();
    const forma = e.target;
    const kontaktPodaci = {
      email: forma.email.value,
      lozinka: forma.lozinka.value,
      ponovljenaLozinka: forma.ponovljenaLozinka.value,
    };
    if (kontaktPodaci.lozinka !== kontaktPodaci.ponovljenaLozinka) {
      toast('Lozinka i ponovljena lozinka se ne podudaraju!', {
        type: 'error',
      });
      return;
    }
    try {
      const korisnik = await registruj(kontaktPodaci);
      if (!korisnik) {
        toast('Doslo je do greske!', { type: 'error' });
        return;
      }

      autorizacijaStorage.current.sacuvajKorisnika(korisnik.user);
      toast('Uspesno ste se registrovali', { type: 'success' });
      forma.reset();
    } catch (greska) {
      toast(greska.message, { type: 'error' });
    }
  };

  return (
    <div>
      <h1 className="text-3xl mb-5">Registracija</h1>
      <form className="flex flex-col w-3/5" onSubmit={registrujKorisnika}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            placeholder="email"
            required
            id="email"
            name="email"
            className="border-sky-300 border w-full mb-5 ml-2 p-1"
          />
        </label>

        <label htmlFor="lozinka">
          Lozinka:
          <input
            type="password"
            placeholder="123123"
            autoComplete="off"
            required
            id="lozinka"
            name="lozinka"
            className="border-sky-300 border w-full mb-5 ml-2 p-1"
          />
        </label>
        <label htmlFor="lozinka">
          Ponovljena lozinka:
          <input
            type="password"
            placeholder="123123"
            autoComplete="off"
            required
            id="ponovljenaLozinka"
            name="ponovljenaLozinka"
            className="border-sky-300 border w-full ml-2 p-1"
          />
        </label>
        <div className="ml-2">
          <Dugme tip="submit" className="w-24 text-center mt-3">
            Registracija
          </Dugme>
        </div>
      </form>
    </div>
  );
}

export default Registracija;
