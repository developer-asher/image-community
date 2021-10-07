import React, { useEffect, useState } from 'react';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { realtime } from '../shared/firebase';

const NotiBadge = (props) => {
  const [is_read, setIsRead] = useState(true);
  const user_id = useSelector((state) => state.user.user.uid);

  const notiCheck = () => {
    const notiDB = realtime.ref(`notice/${user_id}`);
    notiDB.update({ read: true });

    props.onClick();
  };

  useEffect(() => {
    const notiDB = realtime.ref(`notice/${user_id}`);

    // 리스너 구독 .on()
    notiDB.on('value', (snapshot) => {
      // 값이 바뀔 떄 실행시킬 구문
      setIsRead(snapshot.val().read);
    });

    // 구독 취소 .off()
    return () => notiDB.off();
  }, []);

  return (
    <>
      <Badge
        color='secondary'
        variant='dot'
        invisible={is_read}
        onClick={notiCheck}
      >
        <NotificationsIcon />
      </Badge>
    </>
  );
};

NotiBadge.defaultProps = {
  onClick: () => {},
};

export default NotiBadge;
