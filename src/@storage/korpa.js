class Korpa {
  sacuvajKorpu = (korpa) => {
    localStorage.setItem('korpa', JSON.stringify(korpa));
  };

  vratiKorpu = () => {
    const korpa = localStorage.getItem('korpa');
    if (!korpa) {
      return null;
    }
    return JSON.parse(korpa);
  };

  obrisiKorpu = () => localStorage.removeItem('korpa');
}

export default Korpa;
