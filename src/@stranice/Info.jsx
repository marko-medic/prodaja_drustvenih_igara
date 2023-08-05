import React from 'react';
import randomSlika from '@aseti/igra-1.jpeg';
import AnimacionaStranica from '@komponente/Layout/AnimacionaStranica';

function Info() {
  return (
    <AnimacionaStranica>
      <h1 className="text-3xl mb-3">Dragi posetioci,</h1>
      <p className="mb-3">
        Dobrodošli na stranicu <strong>O nama!</strong> <br /> Mi smo tim
        strastvenih igrača koji su se udružili sa zajedničkim ciljem - da
        promovišemo društvene igre i učinimo ih dostupnim svima. Kao što
        verovatno znate, društvene igre su zabavne, edukativne i sjajan način za
        povezivanje sa prijateljima i porodicom. Međutim, mnogi ljudi još uvek
        ne znaju za čari igara koje se igraju u društvu.
      </p>
      <p className="mb-3">
        Zato smo se odlučili da napravimo ovaj sajt kako bismo vam približili
        svet društvenih igara i predstavili vam našu ponudu. Na našem sajtu
        možete pronaći širok izbor igara za sve uzraste i ukuse, od klasičnih do
        modernih igara koje su postale pravi hitovi u svetu.
      </p>
      <p className="mb-3">
        Naš tim se sastoji od iskusnih igrača i zaljubljenika u društvene igre
        koji će vam rado preporučiti igru koja će se dopasti vama i vašim
        prijateljima. Takođe, možemo vam pružiti savete o tome kako igrati igre
        i kako ih prilagoditi vašoj grupi.
      </p>
      <p className="mb-8">
        Uz našu pomoć, uvereni smo da ćete uživati u igri i da ćete otkriti nove
        načine za povezivanje sa ljudima oko sebe. Hvala vam što ste posetili
        naš sajt i nadamo se da ćemo vam pomoći da se zaljubite u društvene igre
        kao što smo i mi!
      </p>
      <p>
        <img className="m-auto animate-pulse" alt="igra" src={randomSlika} />
      </p>
    </AnimacionaStranica>
  );
}

export default Info;
