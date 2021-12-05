import React from "react";
import "styles/index.css";
import ReactDOM from "react-dom";
import App from "components/App";
import { BrowserRouter as Router } from "react-router-dom";
import(/* webpackPreload: true */ "fonts/NittiGrotesk-Light.ttf");
import(/* webpackPreload: true */ "fonts/NittiGrotesk-Light.woff2");
import(/* webpackPreload: true */ "fonts/NittiGrotesk-Medium.ttf");
import(/* webpackPreload: true */ "fonts/NittiGrotesk-Medium.woff2");
import(/* webpackPreload: true */ "fonts/SaolDisplay-Light.ttf");
import(/* webpackPreload: true */ "fonts/SaolDisplay-Light.woff2");
import(/* webpackPreload: true */ "fonts/Shabnam.ttf");

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
