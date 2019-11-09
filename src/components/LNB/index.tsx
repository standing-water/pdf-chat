import React, { useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { DARK_GREY, LIGHT_GREY } from "constants/colors";

import { AppContext } from "App";

type Props = {};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem 0;
  width: 80px;
  height: 100vh;
  background: ${DARK_GREY};
`;

const LNBButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  background: transparent;
  border: none;
  border-radius: 4px;
  transition: 0.3s;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    transition: 0.3s;
    background: ${LIGHT_GREY};
  }

  &:focus {
    outline: none;
  }

  & + & {
    margin-top: 1rem;
  }
`;

export const LNB: React.FC<Props> = () => {
  const history = useHistory();
  const { isCreateRoom, setIsCreateRoom } = useContext(AppContext);

  const handleCreateRoomClick = useCallback(() => {
    history.push("/");
    setIsCreateRoom(!isCreateRoom);
  }, [history, setIsCreateRoom, isCreateRoom]);

  const handleRoomListClick = useCallback(() => {
    history.push("/");
    setIsCreateRoom(false);
  }, [history, setIsCreateRoom]);

  return (
    <Container>
      <LNBButton onClick={handleRoomListClick}>
        <i className='xi-list xi-x' />
      </LNBButton>
      <LNBButton onClick={handleCreateRoomClick}>
        <i className={!isCreateRoom ? "xi-plus xi-x" : "xi-angle-left xi-x"} />
      </LNBButton>
    </Container>
  );
};
