import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Button, Image, Text } from '../elements/index';
import Textarea from '../elements/textarea';
import Upload from '../shared/upload';
import { history } from '../redux/configureStore';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview_image = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  // id 값 체크, 해당 게시글 sorting
  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  const sort_post = is_edit
    ? post_list.find((post) => post.id === post_id)
    : null;

  // id 값 체크, 초기 contents 값 설정
  const [contents, setContents] = useState(
    sort_post ? sort_post.contents : null,
  );

  // Event
  const changeContent = (e) => setContents(e.target.value);
  const addPost = () => dispatch(postActions.addPostFB(contents));
  const editPost = () => dispatch(postActions.editPostFB(post_id, contents));

  // Lifecyle
  useEffect(() => {
    if (is_edit && !sort_post) {
      console.log('포스트 정보가 업습니다.');
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(sort_post.image_url));
    }
  }, []);

  // 로그인 체크, 게시글 작성 가능 여부
  if (!is_login) {
    return (
      <Grid>
        <Text size='30px' bold margin='0 0 30px 0' center>
          앗! 이런!😳
        </Text>
        <Text size='16px' bold margin='0 0 40px 0' center>
          게시글 작성은 로그인 이후에 가능합니다!
        </Text>
        <Button
          width='100%'
          margin='0 auto'
          onClick={() => history.replace('/signin')}
        >
          로그인
        </Button>
      </Grid>
    );
  }

  return (
    <>
      <Text size='30px' bold margin='0 0 30px 0'>
        {is_edit ? '게시글 수정' : '게시글 작성'}
      </Text>
      <Grid is_flex>
        <Upload />
      </Grid>
      <Grid margin='20px 0'>
        <Text size='20px' bold>
          미리보기
        </Text>
        <Image
          shape='rectangle'
          src={
            preview_image ? preview_image : 'http://via.placeholder.com/400x300'
          }
        />
      </Grid>
      <Grid margin='0 0 20px 0'>
        <Text>게시글 내용</Text>
        <Textarea
          value={sort_post ? sort_post.contents : ''}
          placeholder='게시글 작성'
          onChange={changeContent}
        />
      </Grid>
      {is_edit ? (
        <Button width='100%' onClick={editPost}>
          게시글 수정
        </Button>
      ) : (
        <Button width='100%' onClick={addPost}>
          게시글 작성
        </Button>
      )}
    </>
  );
};

export default PostWrite;
