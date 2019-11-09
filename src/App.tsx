import React from "react";
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { LNB } from "components";
import { MainPage, LobbyPage, MobileMainPage } from "containers";

type Props = RouteComponentProps;

export const LobbyContext = createContext<LobbyContextProps>({ isCreateRoom: false, setIsCreateRoom: (value) => {} });

const App: React.FC<Props> = () => {
  return (
    <div className='App'>
      <LNB />
      <Switch>
        <Route exact path='/' component={LobbyPage} />
        <Route exact path='/presentation/:enterId' component={isMobile ? MobileMainPage : MainPage} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
