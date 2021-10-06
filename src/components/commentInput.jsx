import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions } from '../redux/modules/comment';

import { Grid } from '../elements/index';

const CommentInput = (props) => {
  const { post_id } = props;
  const [comment_text, setCommentText] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleClick = (e) => {
    if (comment_text === '') {
      window.alert('댓글을 입력해주세요!');
      return;
    }

    dispatch(commentActions.addCommentFB(post_id, comment_text));
    setCommentText('');
  };

  return (
    <Grid is_flex>
      <CommentBox
        type='text'
        value={comment_text}
        placeholder='댓글 내용을 입력해주세요: )'
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleClick();
          }
        }}
      />
      <CommentBtn onClick={handleClick}>작성</CommentBtn>
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
