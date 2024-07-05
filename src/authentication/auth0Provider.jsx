// src/auth/auth0-provider-with-history.js

import React from "react";
// import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-p88xn0peuismpk5f.us.auth0.com";
  const clientId = "LiGHdc5Cj2sp9WxirN8Avf3DM9sBOcmw";

  //   const history = useNavigate();

  //   const onRedirectCallback = (appState) => {
  //     history.push(appState?.returnTo || window.location.pathname);
  //   };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      //   onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
