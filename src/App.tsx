import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./components/create-binding";
import Callback from "./components/callback/callback";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact component={Index} />
        <Route path={"/callback"} component={Callback} />
      </Switch>
    </Router>
  );
}

export default App;
