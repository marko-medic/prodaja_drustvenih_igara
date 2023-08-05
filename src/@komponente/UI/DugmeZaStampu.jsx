import React from 'react';
import $ from 'jquery';
import Dugme from './Dugme';

function DugmeZaStampu() {
  const stampaj = () => {
    const $stranicaZaStampu = $('.printabilna-sekcija');
    if (!$stranicaZaStampu.length) {
      return;
    }
    const $body = $('body');
    $body.html('');
    $body.html($stranicaZaStampu.html());
    $('#dugme-za-stampu').remove();
    $body.append(
      `<button class="text-center cursor-pointer p-2 mt-3 mb-3 bg-yellow-400 w-4/12 text-white rounded hover:bg-yellow-600" onclick="window.print()">Potvrdi stampu</button>`
    );
    $body.append(
      `<button class="text-center cursor-pointer p-2 mt-3 mb-3 bg-red-400 w-4/12 ml-3 text-white rounded hover:bg-red-600" onclick="window.location.reload()">Odustani</button>`
    );
  };

  return (
    <Dugme
      id="dugme-za-stampu"
      className="mt-3 !bg-green-500"
      onClick={stampaj}
    >
      Stampa
    </Dugme>
  );
}

export default DugmeZaStampu;
