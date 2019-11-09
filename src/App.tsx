import React, { useState, createContext } from "react";
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { LNB } from "components";
import { MainPage, LobbyPage, MobileMainPage } from "containers";

type Props = RouteComponentProps;

interface LobbyContextProps {
  isCreateRoom: boolean;
  setIsCreateRoom: (value: boolean) => void;
}

export const AppContext = createContext<LobbyContextProps>({ isCreateRoom: false, setIsCreateRoom: (value) => {} });

const App: React.FC<Props> = () => {
  const [isCreateRoom, setIsCreateRoom] = useState(false);

  return (
    <AppContext.Provider value={{ isCreateRoom, setIsCreateRoom }}>
      <div className='App' style={{ display: "flex", height: "100%", width: "100%" }}>
        {!isMobile && <LNB />}
        <Switch>
          <Route exact path='/' component={LobbyPage} />
          <Route exact path='/presentation/:enterId' component={isMobile ? MobileMainPage : MainPage} />
        </Switch>
      </div>
    </AppContext.Provider>
  );
};

export default withRouter(App);
