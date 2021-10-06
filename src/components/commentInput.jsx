import React from 'react';
import { Grid, Input, Button } from '../elements/index';
import styled from 'styled-components';

const CommentInput = (props) => {
  return (
    <Grid is_flex>
      <CommentBox type='text' placeholder='댓글 내용을 입력해주세요: )' />
      <CommentBtn>작성</CommentBtn>
    </Grid>
  );
};

const CommentBox = styled.input`
  width: 75%;
  padding: 10px;
  outline: none;
`;

const CommentBtn = styled.button`
  width: 100px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: #f5d9b4;
  cursor: pointer;
`;

export default CommentInput;
