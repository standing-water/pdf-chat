import React, { useCallback, useState, useEffect, useRef, createRef } from "react";
import { useRouteMatch } from "react-router-dom";
import { animateScroll, Events, scrollSpy, scroller, Element } from "react-scroll";
import { Input, Button } from "components";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactResizeDetector from "react-resize-detector";
import axios from "axios";
import { css } from "styled-components";
import Fullscreen from "react-full-screen";
import screenfull from "screenfull";
import { orderBy } from "lodash";

import { debounce } from "lodash";
import Modal from "react-modal";
import { getQRCode } from "apis/qrcode";

import { Document, Page } from "react-pdf/dist/entry.webpack";
import { PdfFooter, PaginatorContainer, Paginator, ModalBody, ModalFooter, PdfContent } from "./mainPageStyle";
import {
  MainPageWrapper,
  PdfWrapper,
  ChatWrapper,
  TabWrapper,
  TabItem,
  ChatContentWrapper,
  InputWrapper,
  PdfContentWrapper,
  PdfDocument,
  ChatBubble,
  ChatBubbleWrapper,
  ChatWriter
} from "./mobileMainPageStyle";
import {
  createQuestionRequest,
  enterRoomRequest,
  getQuestionsRequest,
  loginRequest,
  likeRequest,
  dislikeRequest,
  changePageRequest
} from "actions/presentAction";
import { sendWS } from "apis/presentation";

interface Props {}

export const tabData = [
  {
    id: 0,
    icon: "xi-message-o"
  },
  {
    id: 1,
    icon: "xi-help-o"
  }
];

export const MobileMainPage: React.FC<Props> = ({}) => {
  // const onDocumentLoadSuccess = () => {
  //   console.log("Test");
  // };

  const match = useRouteMatch<{ enterId: string }>();
  const containerRef = createRef<HTMLDivElement>();
  const chatContainerRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();
  const [questionInput, setQuestionInput] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [_numPages, setNumPages] = useState(null);
  const [tabState, setTabState] = useState(0);
  const [isFS, setIsFS] = useState(false);
  const [Pdf, setPdf] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resizePosition, setResizePosition] = useState({
    width: 0,
    height: 0
  });
  const dispatch = useDispatch();
  const [activeUser, setActiveUser] = useState(0);
  const { isFetchingCurrentRoom, currentRoom, ws, user, questions } = useSelector(
    (state: AppState) => state.presentation
  );

  ws.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    switch (data.event) {
      case "crud": {
        switch (data.data.resource) {
          case "question_like":
          case "question": {
            if (user && currentRoom) {
              return dispatch(
                getQuestionsRequest({
                  token: user.token,
                  presentationId: currentRoom.id
                })
              );
            }
          }
        }
        break;
      }
      case "active_user": {
        return setActiveUser(data.data.count);
      }
      case "change_page": {
        return setPageNumber(data.data.page);
      }
    }
  };

  useEffect(() => {
    async function fetchPDF() {
      if (currentRoom) {
        console.log(currentRoom.fileUrl);
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

    Events.scrollEvent.register("begin", function(to, element) {});
    Events.scrollEvent.register("end", function(to, element) {});
    scrollSpy.update();

    if (currentRoom) {
      dispatch(loginRequest({ presentationId: currentRoom.id }));
      setActiveUser(currentRoom.activeUserCount + 1);
    }
  }, [currentRoom, dispatch]);

  useEffect(() => {
    if (user && currentRoom) {
      dispatch(
        getQuestionsRequest({
          token: user.token,
          presentationId: currentRoom.id
        })
      );
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

  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
    // console.log("success");
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(pageNumber - 1);
    if (currentRoom && user && user.nickname === "발표자") {
      dispatch(changePageRequest({ token: user.token, presentationId: currentRoom.id, page: pageNumber - 1 }));
    }
  };
  const goToNextPage = () => {
    setPageNumber(pageNumber + 1);
    if (currentRoom && user && user.nickname === "발표자") {
      dispatch(changePageRequest({ token: user.token, presentationId: currentRoom.id, page: pageNumber + 1 }));
    }
  };

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

  const scrollToBottom = (id: number) => {
    // animateScroll.scrollToBottom({});
    // // Somewhere else, even another file
    scroller.scrollTo(`chat-${id}`, {
      duration: 300,
      delay: 0,
      smooth: true,
      containerId: "chatContainer",
      offset: -100
    });
  };

  const handleResize = useCallback((width: number, height: number) => {
    setResizePosition({ width, height });
  }, []);

  const onClickSendQuestion = () => {
    if (user && inputRef.current && currentRoom) {
      dispatch(
        createQuestionRequest({
          token: user.token,
          presentationId: currentRoom.id,
          page: pageNumber,
          content: inputRef.current.value
        })
      );
      inputRef.current!.focus();
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (questions.length > 0) {
      const max = questions.reduce(function(prev, current) {
        return prev.id > current.id ? prev : current;
      });
      scrollToBottom(max.id);
    }
  }, [questions.length]);

  const handleClickLike = (question: Question) => () => {
    if (user && currentRoom) {
      if (question.liked) {
        dispatch(
          dislikeRequest({
            token: user.token,
            presentationId: currentRoom.id,
            questionId: question.id
          })
        );
      } else {
        dispatch(
          likeRequest({
            token: user.token,
            presentationId: currentRoom.id,
            questionId: question.id
          })
        );
      }
    }
  };

  const renderChat = () => {
    return (
      <>
        {orderBy([...questions], ["likeCount", "id"], ["desc", "desc"]).map((item) => (
          <ChatBubbleWrapper mine={item.myQuestion} name={`chat-${item.id}`} key={item.id}>
            <ChatBubble mine={item.myQuestion}>{item.content}</ChatBubble>
            <ChatWriter mine={item.myQuestion}>
              {item.nickname}
              <span onClick={handleClickLike(item)}>
                <i
                  className={item.liked ? "xi-heart xi-x" : "xi-heart-o xi-x"}
                  style={{ color: item.liked ? "red" : "black" }}
                />{" "}
                {item.likeCount}
              </span>
            </ChatWriter>
          </ChatBubbleWrapper>
        ))}
      </>
    );
  };

  return (
    <MainPageWrapper>
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
      </PdfWrapper>
      <ChatWrapper>
        <TabWrapper>
          {tabData.map((x) => (
            <TabItem onClick={() => setTabState(x.id)} tabId={x.id} tabState={tabState}>
              <i className={x.icon}></i>
            </TabItem>
          ))}
        </TabWrapper>
        <div>Users: {activeUser}</div>
        <ChatContentWrapper id='chatContainer' ref={chatContainerRef}>
          {tabState === 0 ? renderChat() : <div>질문</div>}
        </ChatContentWrapper>
      </ChatWrapper>
      <Element name='input'>
        <InputWrapper>
          <Input ref={inputRef} shape='ROUND' buttonIcon='xi-arrow-up' onClickButton={onClickSendQuestion} />
        </InputWrapper>
      </Element>
    </MainPageWrapper>
  );
};
