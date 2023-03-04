import HttpServis from './instanca';

class ListaDrzavaServis extends HttpServis {
  constructor() {
    super();
    this.endpoint = 'lista_drzava';
  }

  vratiListu() {
    return this.httpInstanca.get(this.endpoint);
  }
}

export default ListaDrzavaServis;
