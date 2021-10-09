import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Image, Button, Text } from '../elements/index';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';
import NotiBadge from './notiBadge';

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const user_name = useSelector((state) => state.user?.user?.nick_name);

  const goSignIn = () => {
    history.push('/signin');
  };
  const goSignUp = () => {
    history.push('/signup');
  };

  const editUserInfo = () => {
    // 정보 수정 페이지로 이동
    history.push('/user');
  };

  const goNotice = () => {
    if (is_login) {
      if (history.location.pathname === '/notice') {
        history.push('/');
      } else {
        history.push('/notice');
      }
    }
  };

  const signOut = () => {
    dispatch(userActions.logoutFB());
  };

  if (is_login) {
    return (
      <Grid is_flex margin='0 0 20px 0' padding='20px' bg='#fff'>
        <Grid is_flex content_pos='flex-start'>
          <Image />
          <Text margin='0 0 0 10px' size='14px'>
            <strong>{user_name} </strong>
            <span style={{ fontSize: '13px', color: '#555' }}>
              님 환영합니다
            </span>
          </Text>
        </Grid>
        <ButtonWrap>
          <Button onClick={editUserInfo}>내정보</Button>
          <Grid margin='0 10px' position>
            <NotiBadge onClick={goNotice} />
          </Grid>
          <Button onClick={signOut}>로그아웃</Button>
        </ButtonWrap>
      </Grid>
    );
  }

  return (
    <Grid is_flex margin='0 0 20px 0' padding='20px' bg='#fff'>
      <Image />
      <Text>{user_name}</Text>
      <ButtonWrap>
        <Button onClick={goSignUp} margin='0 10px 0 0'>
          회원가입
        </Button>
        <Button onClick={goSignIn}>로그인</Button>
      </ButtonWrap>
    </Grid>
  );
};

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Header;
