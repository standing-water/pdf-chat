import React from "react";
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { MainPage, LobbyPage, MobileMainPage } from "containers";

type Props = RouteComponentProps;

const App: React.FC<Props> = () => {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={LobbyPage} />
        <Route exact path='/presentation' component={isMobile ? MobileMainPage : MainPage} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
