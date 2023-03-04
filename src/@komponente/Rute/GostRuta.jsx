import useAutorizacija from '@store/autorizacija';
import { last } from 'lodash';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function GostRuta({ children }) {
  const { ulogovaniKorisnik } = useAutorizacija();
  const { search } = useLocation();

  if (ulogovaniKorisnik) {
    const linkZaRedirekciju = (search && last(search.split('='))) || '';
    return <Navigate to={`/${linkZaRedirekciju}`} />;
  }

  return children;
}

export default GostRuta;
