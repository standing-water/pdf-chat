import React, { InputHTMLAttributes } from "react";
import styled, { SimpleInterpolation } from "styled-components";
import { DARK_GREY, DARK_MAIN_COLOR } from "constants/colors";

type Props = {
  shape?: "SQUARE" | "ROUND";
  icon?: string;
  buttonIcon?: string;
  styles?: SimpleInterpolation;
} & InputHTMLAttributes<HTMLInputElement>;

const Wrapper = styled.div<{
  styles?: SimpleInterpolation;
  shape?: Props["shape"];
}>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background: white;
  border: 1px solid ${DARK_GREY};
  justify-content: space-between;
  padding: 2px 5px 2px 1rem;

  ${props => props.styles}
  border-radius: ${props => (props.shape === "ROUND" ? "50px" : "4px")};

  > i {
    color: ${DARK_GREY};
  }
`;

const StyledInput = styled.input`
  border: none;
  font-size: 16px;
  width: 90%;
  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-left: 1px solid #e9e9e9;
  width: 32px;
  height: 100%;
  margin: 2px 0;
  border-radius: 50px;
  background-color: ${DARK_MAIN_COLOR};
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const Icon = styled.i`
  margin-right: 4px;
`;

export const Input: React.FC<Props> = ({
  shape = "SQUARE",
  icon,
  styles,
  buttonIcon,
  ...inputProps
}) => {
  return (
    <Wrapper styles={styles} shape={shape}>
      {icon && <Icon className={icon} />}
      <StyledInput {...inputProps}></StyledInput>
      {buttonIcon && (
        <StyledButton>
          <i className={buttonIcon}></i>
        </StyledButton>
      )}
    </Wrapper>
  );
};
