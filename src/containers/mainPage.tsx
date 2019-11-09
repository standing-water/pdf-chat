import React, { useCallback, useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import ReactResizeDetector from "react-resize-detector";
import axios from "axios";
import { css } from "styled-components";
import screenfull from "screenfull";

import { Document, Page } from "react-pdf/dist/entry.webpack";
import Modal from "react-modal";
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
  Paginator,
  ModalBody,
  ModalFooter
} from "./mainPageStyle";
import { getQRCode } from "apis/qrcode";
import { enterRoomRequest } from "../actions/presentAction";

interface Props {}

export const MainPage: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ enterId: string }>();
  const containerRef = createRef<HTMLDivElement>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [_numPages, setNumPages] = useState(null);
  const [Pdf, setPdf] = useState<string>("");
  const [resizePosition, setResizePosition] = useState({
    width: 0,
    height: 0
  });

  const { isFetchingCurrentRoom, currentRoom } = useSelector((state: AppState) => state.presentation);

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
  }, [currentRoom]);

  useEffect(() => {
    if (match && match.params) {
      dispatch(enterRoomRequest({ enterId: match.params.enterId }));
    }
  }, [match, enterRoomRequest]);

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

  if (isFetchingCurrentRoom || !currentRoom) {
    return null;
  }

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
          <ChatContentWrapper>ㄹ</ChatContentWrapper>
          <InputWrapper>인풋</InputWrapper>
        </ChatWrapper>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          style={{
            content: {
              // top: "50%",
              // height: "inherit"
            }
          }}
        >
          <h1>Share Presentation</h1>
          <ModalBody>
            <img src={getQRCode("https://naver.com")} />
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
