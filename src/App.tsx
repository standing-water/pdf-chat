import React, { useState, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { ws } = useSelector((state: AppState) => state.presentation);

  useEffect(() => {
    const id = setInterval(() => {
      const data = {
        message: "ping",
        parameter: {
          timestamp: new Date().getTime()
        }
      };
      ws.send(JSON.stringify(data));
    }, 30000);

    window.addEventListener("beforeunload", (event) => {
      const data = {
        message: "unsubscribe"
      };
      ws.send(JSON.stringify(data));
    });

    return () => {
      clearInterval(id);
    };
  }, [ws]);

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
