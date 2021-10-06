import React from 'react';
import { useSelector } from 'react-redux';

import { apiKey } from './firebase';

const Permit = (props) => {
  const { children } = props;

  const is_login = useSelector((state) => state.user.is_login);
  const SESSION_KEY = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(SESSION_KEY);

  if (is_login && is_session) {
    return <>{children}</>;
  }

  return <></>;
};

export default Permit;
