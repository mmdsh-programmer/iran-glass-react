import "styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Home } from "pages/Home";
import { NotFound } from "pages/NotFound";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={() => <NotFound />} />
      </Switch>
      <Footer />
    </Router>
  );
}
