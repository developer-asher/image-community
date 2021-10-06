import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../components/post';
import CommentInput from '../components/commentInput';
import CommentList from '../components/commentList';
import { Grid, Input, Button } from '../elements/index';
import { actionCreators as postActions } from '../redux/modules/post';

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);

  const id = props.match.params.id;
  const post_list = useSelector((state) => state.post.list);
  const post = post_list.find((post) => post.id === id);

  useEffect(() => {
    if (post) {
      return false;
    }
    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <Grid padding='20px'>
      {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
      <Grid padding='0 20px 20px 20px' bg='#fff'>
        <CommentInput post_id={id} />
        <CommentList post_id={id} />
      </Grid>
    </Grid>
  );
};

const CommentWrap = styled.ul`
  padding-left: 0;
`;

export default PostDetail;
