import { last } from 'lodash';

const vratiResponseListe = (response) => response?.data?.documents || [];

export const vratiResponseItema = (response) => response?.data?.fields || {};

const vratiTipPodatka = (vrednost) => {
  if (!Number.isNaN(Number(vrednost))) {
    return 'integerValue';
  }
  if (Array.isArray(vrednost)) {
    return 'arrayValue';
  }
  if (typeof vrednost === 'object') {
    return 'mapValue';
  }
  if (vrednost === 'null' || vrednost === null) {
    return 'nullValue';
  }
  if (
    vrednost === 'true' ||
    vrednost === 'false' ||
    vrednost === true ||
    vrednost === false
  ) {
    return 'booleanValue';
  }

  return 'stringValue';
};

export const formatirajPodatkeZaBazu = (podaciZaUnos) => {
  const formatiraniPodaci = {};
  Object.entries(podaciZaUnos).forEach(([key, value]) => {
    const keyText = vratiTipPodatka(value);
    formatiraniPodaci[key] = {
      [keyText]: value,
    };
  });

  return {
    fields: {
      ...formatiraniPodaci,
    },
  };
};

export const formatirajPodatkeZaIspis = (podaciZaIspis) => {
  const formatiraniPodaci = {};
  Object.entries(podaciZaIspis).forEach(([key, value]) => {
    // eslint-disable-next-line prefer-destructuring
    formatiraniPodaci[key] = Object.values(value)[0];
  });

  return formatiraniPodaci;
};

export const vratiIdIzNaziva = (naziv) => last(naziv.split('/'));

export const formatirajResponseItema = (resp) =>
  formatirajPodatkeZaIspis(vratiResponseItema(resp));

export const formatirajResponseListe = (resp) =>
  vratiResponseListe(resp).map((r) => ({
    id: vratiIdIzNaziva(r.name),
    ...formatirajPodatkeZaIspis(r.fields),
  }));
