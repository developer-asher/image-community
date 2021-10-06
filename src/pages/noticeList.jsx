import React from 'react';
import Notice from '../elements/notice';

const NoticeList = (props) => {
  return (
    <>
      {/* {notice_list.map((notice) => {
        <Grid
          is_flex
          content_pos='flex-start'
          margin='20px 0 0 0'
          padding='20px'
          bg='#cccccc70'
        >
          <Image />
          <Text margin='0 0 0 10px'>
            <strong>nick name</strong>님이 게시글에 댓글을 남겼습니다😆
          </Text>
        </Grid>;
      })} */}
      {/* 알림 갯수 */}
      <Notice />
    </>
  );
};

export default NoticeList;
