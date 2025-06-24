import ReactGA from 'react-ga4';

export const initializeGA = () => {
  ReactGA.initialize('G-J7G4T2CBPJ'); 
};

export const logPageView = (page) => {
  ReactGA.send({ hitType: "pageview", page });
};
