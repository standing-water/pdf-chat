import React from "react";
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps
} from "react-router-dom";

import { MainPage, LobbyPage, MobileMainPage } from "containers";

type Props = RouteComponentProps;

const App: React.FC<Props> = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LobbyPage} />
        <Route exact path="/presentation" component={MainPage} />
        <Route exact path="/mobile" component={MobileMainPage} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
