class Autorizacija {
  sacuvajKorisnika = (korisnik) => {
    localStorage.setItem('korisnik', JSON.stringify(korisnik));
  };

  vratiKorisnika = () => {
    const korisnik = localStorage.getItem('korisnik');
    if (!korisnik) {
      return null;
    }
    return JSON.parse(korisnik);
  };

  obrisiKorisnika = () => localStorage.removeItem('korisnik');
}

export default Autorizacija;
