import "styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./Header";
import { Home } from "pages/Home";
import { NotFound } from "pages/NotFound";
import { CategoryDetails } from "pages/CategoryDetails";
import { SmoothScroll } from "./SmoothScroll";

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/category-details" component={CategoryDetails} />
          <Route component={NotFound} />
        </Switch>
      </SmoothScroll>
    </Router>
  );
}
