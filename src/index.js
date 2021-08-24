import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
const REACT_APP_AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN
const REACT_APP_AUTH_CLIENT_ID = process.env.REACT_APP_AUTH_CLIENT_ID

ReactDOM.render(
  <Auth0Provider
    domain={REACT_APP_AUTH_DOMAIN}
    clientId={REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);