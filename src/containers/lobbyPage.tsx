import React, { useState, useMemo, createContext } from "react";
import styled from "styled-components";
import { LIGHT_GREY } from "constants/colors";

import { LNB } from "components";

type Props = {};

interface LobbyContextProps {
  isCreateRoom: boolean;
  setIsCreateRoom: (value: boolean) => void;
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LandingContainer = styled.div`
  /* flex-basis: 300px; */
  flex-grow: 1;
  width: 300px;
  height: 100%;
  background: ${LIGHT_GREY};
  display: flex;
  justify-content: flex-end;
`;

const LandingBody = styled.div`
  width: 300px;
  height: 100%;
`;

const MainContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  padding: 5rem;
  border-radius: 10px 10px 0 0;
  background: white;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
`;

const RoomList = styled.ul`
  margin: 0;
  padding: 0;
`;

const Room = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  background: white;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  transition: 0.3s;
  padding: 0.5rem;

  &:hover {
    transition: 0.3s;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const LobbyContext = createContext<LobbyContextProps>({ isCreateRoom: false, setIsCreateRoom: (value) => {} });

export const LobbyPage: React.FC<Props> = () => {
  const [isCreateRoom, setIsCreateRoom] = useState(false);

  const renderCreateRoom = useMemo(() => {
    return <div>test</div>;
  }, []);

  const renderRoomList = useMemo(() => {
    return (
      <>
        <h1>Presentations</h1>
        <RoomList>
          <Room>test</Room>
        </RoomList>
      </>
    );
  }, []);

  return (
    <LobbyContext.Provider value={{ isCreateRoom, setIsCreateRoom }}>
      <Container>
        <LNB></LNB>
        <LandingContainer>
          <LandingBody />
          <MainContainer>{isCreateRoom ? renderCreateRoom : renderRoomList}</MainContainer>
        </LandingContainer>
      </Container>
    </LobbyContext.Provider>
  );
};
