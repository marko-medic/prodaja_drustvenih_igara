import HttpServis from './instanca';

class NarudzbineServis extends HttpServis {
  constructor() {
    super();
    this.endpoint = 'narudzbine';
  }

  vratiListu() {
    return this.httpInstanca.get(this.endpoint);
  }

  sacuvajNarudzbinu(narudzbina) {
    return this.httpInstanca.post(this.endpoint, JSON.stringify(narudzbina));
  }
}

export default NarudzbineServis;
