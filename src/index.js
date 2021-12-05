import React from "react";
import "styles/index.css";
import ReactDOM from "react-dom";
import App from "components/App";
import { BrowserRouter as Router } from "react-router-dom";
import("fonts/NittiGrotesk-Light.ttf");
import("fonts/NittiGrotesk-Light.woff2");
import("fonts/NittiGrotesk-Medium.ttf");
import("fonts/NittiGrotesk-Medium.woff2");
import("fonts/SaolDisplay-Light.ttf");
import("fonts/SaolDisplay-Light.woff2");
import("fonts/Shabnam.ttf");

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
