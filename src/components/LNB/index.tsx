import React from "react";
import styled from "styled-components";
import { DARK_GREY } from "constants/colors";

type Props = {};

const Container = styled.div`
  width: 64px;
  height: 100%;
  background: ${DARK_GREY};
`;

export const LNB: React.FC<Props> = () => {
  return <Container>test</Container>;
};
