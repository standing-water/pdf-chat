import React from "react";
import styled from "styled-components";
import { LIGHT_GREY } from "constants/colors";

import { LNB } from "components";

interface Props {}

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

const MainContainer = styled.div`
  width: calc(100% - 300px);
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

export const LobbyPage: React.FC<Props> = () => {
  return (
    <Container>
      <LNB></LNB>
      <LandingContainer>
        <MainContainer>
          <h1>Presentations</h1>
          <RoomList>
            <Room>test</Room>
          </RoomList>
        </MainContainer>
      </LandingContainer>
    </Container>
  );
};
