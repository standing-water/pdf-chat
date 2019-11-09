import styled from "styled-components";

export const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;

export const PdfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 500px;
  max-width: 100%;
`;

export const PaginatorContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

export const Paginator = styled.button<{ direction: "LEFT" | "RIGHT" }>`
  width: 100px;
  height: 100%;
  background: transparent;
  border: none;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    background: ${(props) =>
      props.direction === "LEFT"
        ? "linear-gradient(90deg,rgba(34, 34, 34, 0.3) 0%,rgba(255, 255, 255, 0) 73%,rgba(255, 255, 255, 0) 100%)"
        : "linear-gradient(270deg,rgba(34, 34, 34, 0.3) 0%,rgba(255, 255, 255, 0) 73%,rgba(255, 255, 255, 0) 100%)"};
  }
  &:focus {
    outline: none;
  }
`;

export const PdfContentWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  background: black;
  height: 100%;

  > div {
    height: 100%;
  }
`;

export const PdfContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: black;
`;

export const PdfFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-basis: 400px;
  border: 3px yellow solid;
  flex-direction: column;
`;

export const ChatContentWrapper = styled.div`
  flex: 10;
`;
export const InputWrapper = styled.div`
  flex: 1;
  border: 2px solid brown;
`;

export const TabWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const TabItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border: 2px solid green;
`;

export const ModalBody = styled.div`
  display: flex;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;
