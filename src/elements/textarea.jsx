import React from 'react';
import styled from 'styled-components';

const Textarea = (props) => {
  const { rows, placeholder, value, onChange } = props;

  return (
    <>
      <TextAreaBox
        rows={rows}
        defaultValue={value}
        placeholder={placeholder}
        onChange={onChange}
      ></TextAreaBox>
    </>
  );
};

Textarea.defaultProps = {
  rows: '20',
  placeholder: '',
};

const TextAreaBox = styled.textarea`
  width: 100%;
  padding: 10px;
`;

export default Textarea;
