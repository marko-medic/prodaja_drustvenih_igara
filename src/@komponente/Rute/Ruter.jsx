import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@stranice/Home';
import Spiner from '@komponente/UI/Spiner';
import NepostojecaStranica from '@stranice/NepostojecaStranica';
import GostRuta from './GostRuta';
import PrivatnaRuta from './PrivatnaRuta';

const Login = lazy(() => import('@stranice/Login'));
const Registracija = lazy(() => import('@stranice/Registracija'));
const Info = lazy(() => import('@stranice/Info'));
const Izmena = lazy(() => import('@stranice/Izmena'));
const Unos = lazy(() => import('@stranice/Unos'));
const ListaNarudzbina = lazy(() => import('@stranice/ListaNarudzbina'));
const Korpa = lazy(() => import('@stranice/Korpa'));

function Ruter() {
  return (
    <Suspense fallback={<Spiner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route
          path="/login"
          element={
            <GostRuta>
              <Login />
            </GostRuta>
          }
        />
        <Route
          path="/narudzbine"
          element={
            <PrivatnaRuta>
              <ListaNarudzbina />
            </PrivatnaRuta>
          }
        />
        <Route
          path="/dodaj-igru"
          element={
            <PrivatnaRuta>
              <Unos />
            </PrivatnaRuta>
          }
        />
        <Route
          path="/izmeni-igru/:id"
          element={
            <PrivatnaRuta>
              <Izmena />
            </PrivatnaRuta>
          }
        />
        <Route
          path="/korpa"
          element={
            <PrivatnaRuta sledecaStranica="korpa">
              <Korpa />
            </PrivatnaRuta>
          }
        />
        <Route
          path="/registracija"
          element={
            <GostRuta>
              <Registracija />
            </GostRuta>
          }
        />
        <Route path="*" element={<NepostojecaStranica />} />
      </Routes>
    </Suspense>
  );
}

export default Ruter;
