import { HashRouter } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@komponente/Layout/Layout';
import { ErrorBoundary, AutorizacijaProvider, KorpaProvider } from '@store';
import Ruter from '@komponente/Rute/Ruter';

function App() {
  return (
    <HashRouter>
      <ErrorBoundary>
        <AutorizacijaProvider>
          <KorpaProvider>
            <Layout>
              <ToastContainer autoClose={1000} />
              <Ruter />
            </Layout>
            <CookieConsent
              location="bottom"
              buttonText="Prihvatam"
              enableDeclineButton
              declineButtonText="Ne prihvatam"
              cookieName="cookie_x"
              style={{ background: '#2B373B' }}
              buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
              expires={150}
            >
              Ovaj sajt koristi kolacice da bi poboljsao korisnicko uputstvo!
            </CookieConsent>
          </KorpaProvider>
        </AutorizacijaProvider>
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;
