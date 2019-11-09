import React, { InputHTMLAttributes } from "react";
import styled, { SimpleInterpolation } from "styled-components";
import { DARK_GREY } from "constants/colors";

type Props = {
  shape?: "SQUARE" | "ROUND";
  icon?: string;
  styles?: SimpleInterpolation;
} & InputHTMLAttributes<HTMLInputElement>;

const Wrapper = styled.div<{ styles?: SimpleInterpolation; shape?: Props["shape"] }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  background: white;
  border: 1px solid ${DARK_GREY};

  padding: 0 1rem;

  ${(props) => props.styles}
  border-radius: ${(props) => (props.shape === "ROUND" ? "50px" : "4px")};

  > i {
    color: ${DARK_GREY};
  }
`;

const StyledInput = styled.input`
  border: none;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const Icon = styled.i`
  margin-right: 4px;
`;

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ shape = "SQUARE", icon, styles, ...inputProps }, ref) => {
    return (
      <Wrapper styles={styles} shape={shape}>
        {icon && <Icon className={icon} />}
        <StyledInput ref={ref} {...inputProps}></StyledInput>
      </Wrapper>
    );
  }
);
