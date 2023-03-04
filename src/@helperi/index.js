export const grupisiNiz = (niz) =>
  niz.reduce((acc, curr) => {
    const postojeciPodatakIdx = acc.findIndex((el) => el.id === curr.id);
    if (postojeciPodatakIdx !== -1) {
      acc[postojeciPodatakIdx].kolicina += 1;
    } else {
      // eslint-disable-next-line no-param-reassign
      curr.kolicina = 1;
      acc.push(curr);
    }
    return acc.sort((a, b) => Number(b.cena) - Number(a.cena));
  }, []);

export const mapirajSumu = (niz) =>
  niz.map((n) => ({ ...n, cena: n.cena * n.kolicina }));

export const vratiUkupnuCenu = (niz) =>
  niz.reduce((acc, curr) => acc + Number(curr.cena), 0);
