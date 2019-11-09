import React, { useState, useMemo, createContext, useContext, useEffect, useCallback, createRef } from "react";
import { useDispatch } from "react-redux";
import useForm from "react-hook-form";

import styled, { css } from "styled-components";
import { LIGHT_GREY } from "constants/colors";
import { getPresentationsRequest, createPresentationRequest } from "actions/presentAction";

import { LNB, Input, Button } from "components";
import { getQRCode } from "apis/qrcode";

type Props = {};

interface LobbyContextProps {
  isCreateRoom: boolean;
  setIsCreateRoom: (value: boolean) => void;
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ExtendsContainer = styled.div`
  /* flex-basis: 300px; */
  position: relative;
  flex-grow: 1;
  width: 300px;
  height: 100%;
  background: ${LIGHT_GREY};
  display: flex;

  /* justify-content: flex-end; */
`;

const CreateRoomContainer = styled.div`
  width: 300px;
  padding: 1rem;
  height: 100%;
  transition: width 0.3s;
  will-change: width;
`;

const MainContainer = styled.div<{ isExtends: boolean }>`
  /* flex-grow: 1; */
  position: absolute;
  right: 0;
  z-index: 100;
  width: ${(props) => (props.isExtends ? "100%" : "calc(100% - 300px)")};
  will-change: width;
  transition: 0.3s;
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

const Header = styled.div`
  margin: 0.5rem 0;
`;

export const LobbyContext = createContext<LobbyContextProps>({ isCreateRoom: false, setIsCreateRoom: (value) => {} });

export const LobbyPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [isCreateRoom, setIsCreateRoom] = useState(false);
  const fileInputRef = createRef<HTMLInputElement>();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    dispatch(getPresentationsRequest({ test: "ttt" }));
  }, []);

  // const handleChangeFile = useCallback(() => {
  //   if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length > 0) {
  //     const file = fileInputRef.current.files[0];
  //     console.log(file);
  //   }
  // }, [fileInputRef]);

  const onSubmit = handleSubmit(({ files }) => {
    if (files.length > 0) {
      dispatch(createPresentationRequest({ name: "TEST", file: files[0] }));
    }
  });

  const renderCreateRoom = useMemo(() => {
    return (
      <>
        <h2>Create Room</h2>

        <form onSubmit={onSubmit}>
          <Input placeholder='Room title' />
          <input ref={register} type='file' name='files' accept='.pdf' />
          <Button buttonType='SECONDARY' type='submit'>
            Cancel
          </Button>
          <Button buttonType='PRIMARY' type='submit'>
            Create
          </Button>
          <img src={getQRCode("https://naver.com")} />
        </form>
      </>
    );
  }, []);

  const renderRoomList = useMemo(() => {
    return (
      <>
        <h1>Presentations</h1>
        <Header>
          <Input placeholder='filter...' icon='xi-search xi-x' shape='ROUND' />
        </Header>
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
        <ExtendsContainer>
          <CreateRoomContainer>{renderCreateRoom}</CreateRoomContainer>
          <MainContainer isExtends={!isCreateRoom}>{renderRoomList}</MainContainer>
        </ExtendsContainer>
      </Container>
    </LobbyContext.Provider>
  );
};
