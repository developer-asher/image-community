import React, { useRef } from 'react';
import styled from 'styled-components';

const Input = (props) => {
  const inputRef = useRef();
  const {
    type,
    label,
    placeholder,
    width,
    margin,
    padding,
    outline,
    ft_size,
    onChange,
  } = props;
  const styles = { width, margin, padding, outline, ft_size };
  const id = Date.now();

  return (
    <>
      <LabelBox {...styles} htmlFor={id}>
        {label}
      </LabelBox>
      <InputBox
        ref={inputRef}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        {...styles}
      ></InputBox>
    </>
  );
};

Input.defaultProps = {
  // property
  type: 'text',
  placeholder: '',

  // style
  width: '100%',
  margin: false,
  padding: false,
  outline: 'none',
  ft_size: '14px',
};

const InputBox = styled.input`
  width: ${(props) => props.width};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')};
  font-size: ${(props) => props.ft_size};
  outline: ${(props) => props.outline};
`;

const LabelBox = styled.label`
  width: ${(props) => props.width};
`;

export default Input;
