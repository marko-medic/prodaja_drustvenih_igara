import React, { useEffect, useRef } from 'react';
import slikaKorpe from '@aseti/korpa.png';
import useKorpa from '@store/korpa';
import { KorpaStorage } from '@storage';
import { useNavigate } from 'react-router-dom';

function KorpaIkona() {
  const { listaNarudzbina } = useKorpa();
  const korpaStorage = useRef(new KorpaStorage());
  const navigiranje = useNavigate();

  useEffect(() => {
    korpaStorage.current.sacuvajKorpu(listaNarudzbina);
  }, [listaNarudzbina]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="relative"
      title="Korpa"
      onClick={() => {
        navigiranje('/korpa');
      }}
    >
      <img className="mr-3 h-10" alt="korpa" src={slikaKorpe} />
      <span className="absolute top-0 right-1 rounded-full border w-5 bg-blue-300 text-white text-sm">
        {listaNarudzbina.length}
      </span>
    </div>
  );
}

export default KorpaIkona;
