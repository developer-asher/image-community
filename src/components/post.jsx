import React, { useEffect, useState, useRef } from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Grid, Image, Text, Button } from '../elements/index';
import { history } from '../redux/configureStore';
import { realtime } from '../shared/firebase';

const Post = memo((props) => {
  const { user_info, id, contents, image_url, comment_cnt, insert_dt, is_me } =
    props;
  const param = useParams();
  const likeIcon = useRef();
  const is_login = useSelector((state) => state.user.is_login);
  const nick_name = useSelector((state) => state?.user?.user?.nick_name);
  const [liked, setLiked] = useState(0);
  const [is_like, setIsLike] = useState(true);

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

  const clickLike = () => {
    if (!is_login) {
      return false;
    }

    let like = is_like ? true : false;

    // 닉네임이 정상적으로 있을때만
    if (nick_name) {
      const notiDB = realtime.ref(`like`)?.child(id)?.child(nick_name);

      if (!is_like) {
        notiDB.remove(); // 좋아요 취소
      } else {
        notiDB.set({ count: like }); //좋아요
      }

      setIsLike(!like);
    }
  };

  useEffect(() => {
    const notiDB = realtime.ref(`like/${id}`);

    notiDB.on('value', (snapshot) => {
      const user = snapshot.val();
      const user_key = user !== null ? Object.keys(user) : [];
      let count = 0;

      user_key.forEach((ele) => {
        if (user[ele].count) count++;
      });

      setLiked(count);
    });
  }, [liked]);

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
      <Grid margin='10px'>
        <Text>{contents}</Text>
      </Grid>
      <Grid>
        <Grid position='relative' cursor='pointer' onClick={goDetail}>
          <Image shape='rectangle' src={image_url} />
          <FavoriteIcon
            ref={likeIcon}
            style={{
              display: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              fontSize: '40px',
              color: 'pink',
              transform: 'translateX(-50%) translateY(-50%)',
              opacity: '0',
              transition: 'all 0.3s ease-in',
            }}
          />
        </Grid>

        <Grid is_flex content_pos='flex-start' margin='5px 0 0 0'>
          <Grid width='auto' cursor='pointer' onClick={goDetail}>
            <Text margin='0 10px 0 0' padding='10px'>
              댓글{comment_cnt}개
            </Text>
          </Grid>

          <Grid
            is_flex
            content_pos='flex-start'
            width='auto'
            padding='10px'
            cursor='pointer'
            onClick={clickLike}
          >
            <FavoriteBorderIcon style={{ fontSize: '15px' }} />
            <span style={{ fontSize: '14px' }}>{liked}</span>
          </Grid>
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
