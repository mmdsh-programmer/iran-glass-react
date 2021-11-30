import "styles/App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "./Preloader";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("pages/Home"));
const CategoryDetails = lazy(() => import("pages/CategoryDetails"));
const NotFound = lazy(() => import("pages/NotFound"));

export default function App() {
  const location = useLocation();

  const calcLatency = () => {
    let startTime = new Date().getTime();
    let latency = startTime - performance.timing.navigationStart;
    return latency;
  };

  return (
    <Suspense fallback={null}>
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
          <Footer classes="home-footer grey-shadow-top" />
        ) : (
          <Footer />
        )}
      </SmoothScroll>
    </Suspense>
  );
}
