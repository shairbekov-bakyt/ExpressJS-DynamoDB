import styled from "@emotion/styled";

export const Svg = styled.svg`
  width: 20px;
  height: 20px;
  margin: 10px 10px;
`;

export const AView = styled.span`
  margin-top: 13px;
  width: 100%;
  height: 100%;
  background: url(https://snipp.ru/demo/495/view.svg) 0 0 no-repeat;
`;

export const Div = styled.div`
  position: relative;
 
`;
export const ANoView = styled.span`
  margin-top: 13px;
  width: 100%;
  height: 100%;
  background: url(https://snipp.ru/demo/495/no-view.svg) 0 0 no-repeat;
`;

export const Input = styled.input`
  min-width: 100%;
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  z-index: 1;
  border-color: ${(props: { isError?: boolean }) => props.isError ? "red" : "gray"};
  border-radius: 5px;
  &:focus {
    border-color: blue;
  }
`;

export const FormTitle = styled.h1`
  font-size: 25px;
  padding: 7px;
`;
export const Content = styled.div`
  height: auto;
  padding: 20px;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Form = styled.form`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  padding: 5px;
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
`;

export const ErrorLabel = styled.p`
  line-height: 10px;
  padding: 0;
  height: 10px;
  font-size: 12px;
  width: 100%;
`;

