import React, { useCallback, useState, useEffect, createRef } from "react";
import { Input, Button } from "components";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactResizeDetector from "react-resize-detector";
import axios from "axios";
import { css } from "styled-components";
import Fullscreen from "react-full-screen";
import screenfull from "screenfull";

import { debounce } from "lodash";
import Modal from "react-modal";
import { getQRCode } from "apis/qrcode";

import { Document, Page } from "react-pdf/dist/entry.webpack";
import {
  PdfFooter,
  PaginatorContainer,
  Paginator,
  ModalBody,
  ModalFooter,
  PdfContent
} from "./mainPageStyle";
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
import { createQuestionRequest } from "actions/presentAction";

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
  const containerRef = createRef<HTMLDivElement>();
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
  const presentationStore = useSelector(
    (state: AppState) => state.presentation
  );
  const { questions } = presentationStore;

  useEffect(() => {
    async function test() {
      const res = await axios.get("http://localhost:7070", {
        headers: {
          Accept: "application/pdf"
        },
        responseType: "blob"
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(blob);
      setPdf(fileURL);
    }
    test();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
    // console.log("success");
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    setPageNumber(pageNumber + 1);
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

  const handleResize = useCallback((width: number, height: number) => {
    setResizePosition({ width, height });
  }, []);

  // useEffect(() => {

  // }, []);

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

  const onClickSendQuestion = () => {
    dispatch(createQuestionRequest({ present_id: 1, page: 4, content: "df" }));
  };

  const renderChat = () => {
    return (
      <>
        {questions.map(x => (
          <ChatBubbleWrapper mine={true}>
            <ChatBubble mine={true}>{x.content}</ChatBubble>
            <ChatWriter mine={true}>신현종</ChatWriter>
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
              <Paginator direction="LEFT" onClick={goToPrevPage}></Paginator>
              <Paginator direction="RIGHT" onClick={goToNextPage}></Paginator>
            </PaginatorContainer>
            <Document
              file={Pdf}
              onLoadError={err => console.log(err)}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <PdfContent>
                <Page
                  pageNumber={pageNumber}
                  width={resizePosition.width - 10}
                  height={resizePosition.height - 10}
                />
              </PdfContent>
            </Document>
          </PdfContentWrapper>
        </ReactResizeDetector>
        <PdfFooter>
          <Button
            buttonType="SECONDARY"
            icon="xi-share-alt-o xi-x"
            onClick={handleClickShare}
            styles={css`
              font-size: 12px;
            `}
          >
            Share
          </Button>
          <Button
            buttonType="SECONDARY"
            icon="xi-expand-square xi-x"
            onClick={handleClickFullscreen}
            styles={css`
              font-size: 12px;
            `}
          >
            Full screen
          </Button>
        </PdfFooter>
      </PdfWrapper>
      <ChatWrapper>
        <TabWrapper>
          {tabData.map(x => (
            <TabItem
              onClick={() => setTabState(x.id)}
              tabId={x.id}
              tabState={tabState}
            >
              <i className={x.icon}></i>
            </TabItem>
          ))}
        </TabWrapper>
        <ChatContentWrapper>
          {tabState === 0 ? renderChat() : <div>질문</div>}
        </ChatContentWrapper>
      </ChatWrapper>
      <InputWrapper>
        <Input
          shape="ROUND"
          buttonIcon="xi-arrow-up"
          onClickButton={onClickSendQuestion}
        ></Input>
      </InputWrapper>
    </MainPageWrapper>
  );
};
