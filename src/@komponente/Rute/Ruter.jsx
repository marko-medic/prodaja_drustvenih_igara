import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '@stranice/Home';
import Info from '@stranice/Info';
import Izmena from '@stranice/Izmena';
import Korpa from '@stranice/Korpa';
import Login from '@stranice/Login';
import NepostojecaStranica from '@stranice/NepostojecaStranica';
import Registracija from '@stranice/Registracija';
import Unos from '@stranice/Unos';
import ListaNarudzbina from '@stranice/ListaNarudzbina';
import GostRuta from './GostRuta';
import PrivatnaRuta from './PrivatnaRuta';

function Ruter() {
  return (
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
  );
}

export default Ruter;
