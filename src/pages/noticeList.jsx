import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Notice from '../elements/notice';
import { realtime } from '../shared/firebase';

const NoticeList = (props) => {
  const [notice, setNotice] = useState([]);
  const user = useSelector((state) => state.user.user); //댓글 쓴 사람의 정보

  useEffect(() => {
    if (!user) {
      return false;
    }

    const notiDB = realtime.ref(`notice/${user.uid}/list`);
    let noti = notiDB.orderByChild('insert_dt');

    // 데이터 구독x, 한번만 가져옴
    noti.once('value', (snapshot) => {
      if (snapshot.exists()) {
        let noti_data = snapshot.val();

        // 오름차순 밖에 지원하지 않기 때문에 JS를 이용해 내림차순으로 변경
        const noti_list = Object.keys(noti_data)
          .reverse()
          .map((key, index) => {
            return noti_data[key];
          });

        setNotice(noti_list);
      }
    });
  }, [user]);

  return (
    <>
      {notice.map((noti, index) => {
        return <Notice key={`noti_${index}`} {...noti} />;
      })}
    </>
  );
};

export default NoticeList;
