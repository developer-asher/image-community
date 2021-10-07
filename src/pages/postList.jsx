import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../components/post';
import { Grid } from '../elements';
import { actionCreators as postActions } from '../redux/modules/post';
import InfinityScroll from '../shared/infinityScroll';

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const paging = useSelector((state) => state.post.paging);
  const loading_post = useSelector((state) => state.post.loading_post);
  const { history } = props;

  useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <>
      <Grid padding='0 20px 20px 20px' bg='#eff6ff'>
        <InfinityScroll
          callNext={() => {
            console.log('next post');
            dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={loading_post}
        >
          {
            //
            post_list.map((post, index) => {
              if (post.user_info.user_id === user_info?.uid) {
                return (
                  <Grid key={post.id}>
                    <Post key={post.id} {...post} is_me />
                  </Grid>
                );
              } else {
                return (
                  <Grid
                    key={post.id}
                    onClick={() => history.push(`/detail/${post.id}`)}
                  >
                    <Post key={post.id} {...post} />
                  </Grid>
                );
              }
            })
          }
        </InfinityScroll>
      </Grid>
    </>
  );
};

export default PostList;
