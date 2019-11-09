import styled from "styled-components";
import { Document } from "react-pdf";
import { DARK_MAIN_COLOR } from "constants/colors";

export const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const PdfWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const PdfDocument = styled(Document)`
  width: 100%;
  /* height: 300px; */
`;

export const PdfContentWrapper = styled.div`
  display: flex;
  overflow-y: auto;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex: 5;
  flex-direction: column;
  position: relative;
`;

export const ChatContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 10;
`;

export const InputWrapper = styled.div`
  flex: 1; /* border: 2px solid brown; */
  padding: 0 15px;
`;

export const TabWrapper = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: row;
  width: 100%;
  -webkit-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.15);
`;

export const TabItem = styled.div<{ tabId: number; tabState: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-right: 1px solid #eee;
  font-size: 20px;
  cursor: pointer;
  color: ${props =>
    props.tabState === props.tabId ? DARK_MAIN_COLOR : "black"};
  &:last-child {
    border-right: none;
  }
`;

export const ChatBubbleWrapper = styled.div<{ mine: boolean }>`
  margin-top: 10px;
  margin-bottom: 5px;
  display: inline-flex;
  align-self: ${props => (props.mine ? "flex-end" : "flex-start")};
  margin-right: ${props => (props.mine ? "4%" : null)};
  margin-left: ${props => (props.mine ? null : "4%")};
  max-width: 70%;
  flex-direction: column;
`;

export const ChatBubble = styled.div<{ mine: boolean }>`
  width: 100%;
  border-radius: 20px;
  padding: 8px 15px;
  color: ${props => (props.mine ? "white" : "black")};
  background: ${props =>
    props.mine
      ? "linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%)"
      : "#eee"};
  background-attachment: fixed;
  position: relative;

  :before {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    right: ${props => (props.mine ? "-8px" : null)};
    left: ${props => (props.mine ? null : "-7px")};
    height: 20px;
    width: 20px;
    background: ${props =>
      props.mine
        ? "linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%)"
        : "#eee"};
    background-attachment: fixed;
    border-bottom-left-radius: 15px;
  }

  :after {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    right: ${props => (props.mine ? "-10px" : null)};
    left: ${props => (props.mine ? null : "-10px")};
    width: 10px;
    height: 20px;
    background: white;
    border-bottom-left-radius: 10px;
  }
`;

export const ChatWriter = styled.span<{ mine: boolean }>`
  align-self: ${props => (props.mine ? "flex-end" : "flex-start")};
  margin-top: 2px;
  margin-right: ${props => (props.mine ? "1%" : null)};
  margin-left: ${props => (props.mine ? null : "1%")};
  font-size: 14px;
`;