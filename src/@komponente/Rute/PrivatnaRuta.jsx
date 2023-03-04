import useAutorizacija from '@store/autorizacija';
import { Navigate } from 'react-router-dom';

function PrivatnaRuta({ children, sledecaStranica = null }) {
  const { ulogovaniKorisnik } = useAutorizacija();

  if (!ulogovaniKorisnik) {
    const stranicaZaRedirekciju = sledecaStranica
      ? `/login?next=${sledecaStranica}`
      : '/login';
    return <Navigate to={stranicaZaRedirekciju} />;
  }
  return children;
}

export default PrivatnaRuta;
