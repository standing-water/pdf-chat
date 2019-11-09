import React, { useCallback, useState, useEffect, createRef } from "react";
import ReactResizeDetector from "react-resize-detector";
import axios from "axios";
import { debounce } from "lodash";

import { Document, Page } from "react-pdf/dist/entry.webpack";
import { Button } from "components";
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
  Paginator
} from "./mainPageStyle";

interface Props {}

export const MainPage: React.FC<Props> = ({}) => {
  const containerRef = createRef<HTMLDivElement>();
  const [pageNumber, setPageNumber] = useState(1);
  const [_numPages, setNumPages] = useState(null);
  const [resizePosition, setResizePosition] = useState({
    width: 0,
    height: 0
  });

  const [Pdf, setPdf] = useState<string>("");

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
    containerRef.current && containerRef.current.focus();
  }, []);

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

  const handleResize = (width: number, height: number) => {
    setResizePosition({ width, height });
  };

  return (
    <MainPageWrapper ref={containerRef} onKeyDown={handleKeyDown}>
      <PdfWrapper>
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
          <Button buttonType='SECONDARY' icon='xi-share-alt-o xi-x'>
            Share
          </Button>
        </PdfFooter>
      </PdfWrapper>

      <ChatWrapper>
        <TabWrapper>
          <TabItem>채팅</TabItem>
          <TabItem>질문</TabItem>
        </TabWrapper>
        <ChatContentWrapper>ㄹ</ChatContentWrapper>
        <InputWrapper>인풋</InputWrapper>
      </ChatWrapper>
    </MainPageWrapper>
  );
};
