import React, { useCallback, useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import ReactResizeDetector from "react-resize-detector";
import useForm from "react-hook-form";

import axios from "axios";
import styled, { css } from "styled-components";
import screenfull from "screenfull";

import { Document, Page } from "react-pdf/dist/entry.webpack";
import Modal from "react-modal";
import { Button, Input } from "components";
import {
  MainPageWrapper,
  PdfWrapper,
  ChatWrapper,
  TabWrapper,
  TabItem,
  ChatContentWrapper,
  InputWrapper,
  PdfFooter,
  PdfContentWrapper,
  PdfContent,
  PaginatorContainer,
  Paginator,
  ModalBody,
  ModalFooter
} from "./mainPageStyle";
import { getQRCode } from "apis/qrcode";
import { sendWS } from "apis/presentation";
import { enterRoomRequest, loginRequest, likeRequest, dislikeRequest } from "actions/presentAction";
import { WS_URL } from "constants/server";
import { createQuestion } from "../apis/presentation";
import { createQuestionRequest, getQuestionsRequest } from "../actions/presentAction";
import { DARK_GREY } from "constants/colors";

interface Props {}

const QuestionBox = styled.div`
  background: white;
  border-radius: 4px;
  border: 1px solid ${DARK_GREY};
  padding: 0.5rem;

  & + & {
    margin-top: 1rem;
  }
`;

const QuestionFooter = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;

const UserText = styled.div`
  font-size: 12px;
  font-weight: 600;
`;

export const MainPage: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ enterId: string }>();
  const containerRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();
  const chatRef = createRef<HTMLDivElement>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [_numPages, setNumPages] = useState(null);
  const [Pdf, setPdf] = useState<string>("");
  const [resizePosition, setResizePosition] = useState({
    width: 0,
    height: 0
  });

  const [activeUser, setActiveUser] = useState(0);

  const { isFetchingCurrentRoom, currentRoom, ws, user, questions } = useSelector(
    (state: AppState) => state.presentation
  );

  ws.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    switch (data.event) {
      case "crud": {
        switch (data.data.resource) {
          case "question": {
            if (user && currentRoom) {
              return dispatch(getQuestionsRequest({ token: user.token, presentationId: currentRoom.id }));
            }
          }
        }
        break;
      }
      case "active_user": {
        return setActiveUser(data.data.count);
      }
    }
  };

  useEffect(() => {
    async function fetchPDF() {
      if (currentRoom) {
        const res = await axios.get(currentRoom.fileUrl, {
          headers: {
            Accept: "application/pdf"
          },
          responseType: "blob"
        });
        const blob = new Blob([res.data], { type: "application/pdf" });
        var fileURL = URL.createObjectURL(blob);
        setPdf(fileURL);
      }
    }
    fetchPDF();

    if (currentRoom) {
      dispatch(loginRequest({ presentationId: currentRoom.id }));
      setActiveUser(currentRoom.activeUserCount + 1);
    }
  }, [currentRoom, dispatch]);

  useEffect(() => {
    if (user && currentRoom) {
      dispatch(getQuestionsRequest({ token: user.token, presentationId: currentRoom.id }));
      sendWS(ws, {
        message: "subscribe",
        parameter: {
          presentation_id: currentRoom.id,
          token: user.token
        }
      });
    }
  }, [user, currentRoom, ws, dispatch]);

  useEffect(() => {
    return () => {
      sendWS(ws, {
        message: "unsubscribe"
      });
    };
  }, [ws]);

  useEffect(() => {
    if (match && match.params) {
      dispatch(enterRoomRequest({ enterId: match.params.enterId }));
    }
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [questions.length, chatRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.keyCode) {
      case 37: {
        return goToPrevPage();
      }
      case 39: {
        return goToNextPage();
      }
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = useCallback(() => {
    setPageNumber(pageNumber - 1);
  }, [pageNumber]);

  const goToNextPage = useCallback(() => {
    setPageNumber(pageNumber + 1);
  }, [pageNumber]);

  const handleResize = useCallback((width: number, height: number) => {
    setResizePosition({ width, height });
  }, []);

  const handleClickShare = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleClickFullscreen = useCallback(() => {
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.toggle(containerRef.current);
    }
  }, [containerRef]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleClickInput = useCallback(() => {
    if (inputRef.current && currentRoom && user) {
      dispatch(
        createQuestionRequest({
          token: user.token,
          presentationId: currentRoom.id,
          page: pageNumber,
          content: inputRef.current.value
        })
      );
      inputRef.current.value = "";
    }
  }, [dispatch, currentRoom, user, inputRef, pageNumber]);

  if (isFetchingCurrentRoom || !currentRoom || !user) {
    return null;
  }

  const handleClickLike = (question: Question) => () => {
    if (question.liked) {
      dispatch(dislikeRequest({ token: user.token, presentationId: currentRoom.id, questionId: question.id }));
    } else {
      dispatch(likeRequest({ token: user.token, presentationId: currentRoom.id, questionId: question.id }));
    }
  };

  return (
    <>
      <MainPageWrapper onKeyDown={handleKeyDown}>
        <PdfWrapper ref={containerRef}>
          <ReactResizeDetector handleWidth handleHeight onResize={handleResize}>
            <PdfContentWrapper>
              <PaginatorContainer>
                <Paginator direction='LEFT' onClick={goToPrevPage}></Paginator>
                <Paginator direction='RIGHT' onClick={goToNextPage}></Paginator>
              </PaginatorContainer>
              <Document file={Pdf} onLoadError={(err) => console.log(err)} onLoadSuccess={onDocumentLoadSuccess}>
                <PdfContent>
                  <Page pageNumber={pageNumber} width={resizePosition.width - 10} height={resizePosition.height - 10} />
                </PdfContent>
              </Document>
            </PdfContentWrapper>
          </ReactResizeDetector>
          <PdfFooter>
            <div>
              <h2>{currentRoom.name}</h2>
            </div>
            <div>
              <Button
                buttonType='SECONDARY'
                icon='xi-share-alt-o xi-x'
                onClick={handleClickShare}
                styles={css`
                  font-size: 18px;
                  margin-right: 4px;
                `}
              >
                Share
              </Button>
              <Button
                buttonType='SECONDARY'
                icon='xi-expand-square xi-x'
                onClick={handleClickFullscreen}
                styles={css`
                  font-size: 18px;
                `}
              >
                Full screen
              </Button>
            </div>
          </PdfFooter>
        </PdfWrapper>

        <ChatWrapper>
          <TabWrapper>
            <TabItem>채팅</TabItem>
            <TabItem>질문</TabItem>
          </TabWrapper>
          <div>
            <h3>Active Users: {activeUser}</h3>
          </div>
          <ChatContentWrapper ref={chatRef}>
            {[...questions]
              .sort((a, b) => a.id - b.id)
              .map((item) => (
                <QuestionBox key={item.id}>
                  <UserText>{item.nickname}</UserText>
                  {item.content}
                  <QuestionFooter>
                    <span onClick={handleClickLike(item)}>
                      <i className={item.liked ? "xi-heart xi-x" : "xi-heart-o xi-x"} /> {item.likeCount}
                    </span>
                  </QuestionFooter>
                </QuestionBox>
              ))}
          </ChatContentWrapper>
          <InputWrapper>
            <UserText>{user.nickname}</UserText>
            <Input ref={inputRef} shape='ROUND' buttonIcon='xi-arrow-up' onClickButton={handleClickInput} />
          </InputWrapper>
        </ChatWrapper>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          style={{
            content: {
              top: "25%",
              height: "inherit"
            }
          }}
        >
          <h1>Share Presentation</h1>
          <ModalBody>
            <img src={getQRCode(currentRoom.enterId)} alt='qrcode' />
          </ModalBody>
          <ModalFooter>
            <Button buttonType='SECONDARY' onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </MainPageWrapper>
    </>
  );
};
