import "styles/App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Home } from "pages/Home";
import { NotFound } from "pages/NotFound";
import { CategoryDetails } from "pages/CategoryDetails";
import { SmoothScroll } from "./SmoothScroll";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "./Preloader";
import { useEffect } from "react";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    let startTime = new Date().getTime();
    let latency = startTime - performance.timing.navigationStart;
  });
  return (
    <>
      {/* <Preloader /> */}
      <SmoothScroll>
        <Header />
        <AnimatePresence exitBeforeEnter initial={true}>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Home} />
            <Route exact path="/category-details" component={CategoryDetails} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
        {location.pathname === "/" ? (
          <Footer classes="home-footer" />
        ) : (
          <Footer />
        )}
      </SmoothScroll>
    </>
  );
}
