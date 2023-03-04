import HttpServis from './instanca';

class ListaIgaraServis extends HttpServis {
  constructor() {
    super();
    this.endpoint = 'drustvene_igre';
  }

  vratiListu() {
    return this.httpInstanca.get(this.endpoint);
  }

  vrati(idIgre) {
    return this.httpInstanca.get(`${this.endpoint}/${idIgre}`);
  }

  unesi(podaciZaIgru) {
    return this.httpInstanca.post(this.endpoint, podaciZaIgru);
  }

  obrisi(idIgre) {
    return this.httpInstanca.delete(`${this.endpoint}/${idIgre}`);
  }

  izmeni(idIgre, podaci) {
    return this.httpInstanca.patch(`${this.endpoint}/${idIgre}`, podaci);
  }
}

export default ListaIgaraServis;
