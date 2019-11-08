import React from "react";
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom";

import { MainPage, LobbyPage } from "containers";

type Props = RouteComponentProps;

const App: React.FC<Props> = () => {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={LobbyPage} />
        <Route exact path='/presentation' component={MainPage} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
