import React, { useCallback, useState } from "react";

import { Document, Page } from "react-pdf/dist/entry.webpack";
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
import { Input } from "components";

interface Props {}

export const MobileMainPage: React.FC<Props> = ({}) => {
  // const onDocumentLoadSuccess = () => {
  //   console.log("Test");
  // };
  const [pageNumber, setPageNumber] = useState(1);
  const [_numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
    console.log("success");
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <MainPageWrapper>
      <PdfWrapper>
        <nav>
          <button onClick={goToPrevPage}>Prev</button>
          <button onClick={goToNextPage}>Next</button>
        </nav>
        <PdfContentWrapper>
          <PdfDocument
            file={{
              url: "http://localhost:7070"
              // httpHeaders: {
              //   "Access-Control-Request-Method": "GET",
              //   "Access-Control-Allow-Origin": "*",
              //   "X-CustomHeader": "40359820958024350238508234"
              // },
              // withCredentials: true
            }}
            onLoadError={err => console.log(err)}
            // options={options}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} scale={0.2} />
          </PdfDocument>
        </PdfContentWrapper>
      </PdfWrapper>
      <ChatWrapper>
        <TabWrapper>
          <TabItem>채팅</TabItem>
          <TabItem>질문</TabItem>
        </TabWrapper>
        <ChatContentWrapper>
          <ChatBubbleWrapper mine={true}>
            <ChatBubble mine={true}>
              잘 만드셨네요? 어떻게 만드셨나요?
            </ChatBubble>
            <ChatWriter mine={true}>신현종</ChatWriter>
          </ChatBubbleWrapper>

          <ChatBubbleWrapper mine={false}>
            <ChatBubble mine={false}>하하하하하</ChatBubble>
            <ChatWriter mine={false}>신현종</ChatWriter>
          </ChatBubbleWrapper>
        </ChatContentWrapper>
        <InputWrapper>
          <Input shape="ROUND"></Input>
        </InputWrapper>
      </ChatWrapper>
    </MainPageWrapper>
  );
};
