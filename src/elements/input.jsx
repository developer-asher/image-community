import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  const { type, label, placeholder, onChange } = props;
  const id = Date.now();

  return (
    <>
      <LabelBox htmlFor={id}>{label}</LabelBox>
      <InputBox
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      ></InputBox>
    </>
  );
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
};

const InputBox = styled.input`
  width: 100%;
  padding: 10px;
  outline: none;
`;

const LabelBox = styled.label`
  width: 100%;
`;

export default Input;
