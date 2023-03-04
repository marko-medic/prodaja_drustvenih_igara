import React, { Component, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorBoundaryContext = createContext({ setujGresku: () => {} });

const withRouter = (Komponenta) => {
  function Wrapper(props) {
    const navigiranje = useNavigate();

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Komponenta navigiranje={navigiranje} {...props} />;
  }
  return Wrapper;
};

class ErrorKomponenta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greska: null,
    };
  }

  static getDerivedStateFromError(greska) {
    return { greska };
  }

  componentDidCatch(greska) {
    this.setState({ greska });
  }

  setujGresku = ({ naziv, poruka }) => {
    this.setState({ greska: { naziv, poruka } });
  };

  reset = () => {
    this.setState({ greska: null });
  };

  oporavak = () => {
    const { navigiranje } = this.props;
    this.reset();
    navigiranje('/');
  };

  render() {
    const { children } = this.props;
    const { greska } = this.state;
    if (greska) {
      return (
        <div className="p-5">
          <h3 className="text-2xl">Doslo je do greske :(</h3>
          <p>Vratite se na pocetnu stranicu klikom na dugme:</p>
          <button
            onClick={this.oporavak}
            type="button"
            className="w-52 cursor-pointer bg-orange-500 text-white mt-3 p-3 text-center"
          >
            Pocetna stranica
          </button>
        </div>
      );
    }
    return (
      <ErrorBoundaryContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ reset: this.reset, setujGresku: this.setujGresku }}
      >
        {children}
      </ErrorBoundaryContext.Provider>
    );
  }
}

const useError = () => useContext(ErrorBoundaryContext);

export const ErrorBoundary = withRouter(ErrorKomponenta);
export default useError;
