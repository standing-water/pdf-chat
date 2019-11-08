import React, { ButtonHTMLAttributes } from "react";
import styled, { SimpleInterpolation } from "styled-components";

import { MAIN_COLOR, DARK_GREY, DARK_MAIN_COLOR, LIGHT_GREY } from "constants/colors";

type Props = {
  buttonType: "PRIMARY" | "SECONDARY";
  styles?: SimpleInterpolation;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button<{ buttonType: Props["buttonType"]; styles?: Props["styles"] }>`
  background: ${(props) => (props.buttonType === "PRIMARY" ? MAIN_COLOR : DARK_GREY)};
  color: ${(props) => (props.buttonType === "PRIMARY" ? "white" : "black")};
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${(props) => (props.buttonType === "PRIMARY" ? DARK_MAIN_COLOR : LIGHT_GREY)};
  }

  &:focus {
    outline: none;
  }
`;

export const Button = React.forwardRef<HTMLButtonElement, Props>(({ buttonType, styles, children, ...props }, ref) => {
  return (
    <StyledButton ref={ref} buttonType={buttonType} styles={styles} {...props}>
      {children}
    </StyledButton>
  );
});
