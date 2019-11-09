import styled from "styled-components";

export const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 5px red solid;
  width: 100vw;
  height: 100vh;
`;

export const PdfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  border: 3px blue solid;
  height: 100%;
`;

export const PdfContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow-y: auto;
  border: 3px black solid;
`;

export const PdfFooter = styled.div`
  height: 70px;
  border: 3px fuchsia solid;
`;

export const ChatWrapper = styled.div`
  display: flex;
  border: 3px yellow solid;
  flex: 1;
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
