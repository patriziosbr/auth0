import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Guest from "./components/Guest";
import Profile from "./views/Profile";
import CreateHouse from "./components/CreateHouse";
// import ExternalApi from "./views/ExternalApi";
// import Houses from "./views/Houses";
import Houses from "./views/FuncHouses";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/guest" component={Guest} />
            {/* <Route path="/profile" component={Profile} /> */}
            <Route path="/createhouse" component={CreateHouse} />
            <Route path="/houses" component={Houses} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
