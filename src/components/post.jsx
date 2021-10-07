import React from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Grid, Image, Text, Button } from '../elements/index';
import { history } from '../redux/configureStore';

const Post = memo((props) => {
  const { user_info, id, contents, image_url, comment_cnt, insert_dt, is_me } =
    props;
  const param = useParams();

  const editPost = () => {
    history.push(`/write/${id}`);
  };

  const goDetail = () => {
    // 상세페이지에서는 클릭 이벤트 방지
    if (param.id) {
      return false;
    }

    history.push(`/detail/${id}`);
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
      <Grid onClick={goDetail}>
        <Grid>
          <Image shape='rectangle' src={image_url} />
        </Grid>
        <Grid padding='10px'>
          <Text>댓글{comment_cnt}개</Text>
        </Grid>
      </Grid>
    </Grid>
  );
});

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
