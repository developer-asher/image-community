import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Image, Text, Button } from '../elements/index';
import { history } from '../redux/configureStore';

const Post = (props) => {
  const { user_info, id, contents, image_url, comment_cnt, insert_dt, is_me } =
    props;

  const editPost = () => {
    history.push(`/write/${id}`);
  };

  return (
    <Grid margin='20px 0 0 0' padding='20px' bg='#fff'>
      <Grid is_flex>
        <Grid is_flex content_pos='flex-start'>
          <Image shap='circle' src={image_url} />
          <Text margin='0 30px 0 10px' bold>
            {user_info.user_name}
          </Text>
          <Text>{insert_dt}</Text>
        </Grid>
        {
          //
          is_me && (
            <Button width='80px' z_index onClick={editPost}>
              수정
            </Button>
          )
        }
      </Grid>
      <Grid padding='10px'>
        <Text>{contents}</Text>
      </Grid>
      <Grid>
        <Image shape='rectangle' src={image_url} />
      </Grid>
      <Grid padding='10px'>
        <Text>댓글{comment_cnt}개</Text>
      </Grid>
    </Grid>
  );
};

Post.defaultProps = {
  id: 0,
  user_info: {
    user_id: 'jsm5272',
    user_name: 'asher',
    user_profile:
      'https://cdnweb01.wikitree.co.kr/webdata/editor/202103/02/img_20210302105652_f4642f08.webp',
  },
  contents: '댕댕이네요!! : )',
  image_url:
    'https://cdnweb01.wikitree.co.kr/webdata/editor/202103/02/img_20210302105652_f4642f08.webp',
  comment_cnt: 10,
  insert_dt: '2021-02-27 10:00:00',
};

export default Post;
