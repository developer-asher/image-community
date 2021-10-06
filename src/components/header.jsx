import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Image, Button } from '../elements/index';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';
import NotiBadge from './notiBadge';

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

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
      history.push('/notice');
    }
  };

  const signOut = () => {
    dispatch(userActions.logoutFB());
  };

  if (is_login) {
    return (
      <Grid
        is_flex
        width='calc(100% - 40px)'
        margin='0 20px'
        padding='20px'
        bg='#fff'
      >
        <Image />
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
    <Grid
      is_flex
      width='calc(100% - 40px)'
      margin='0 20px'
      padding='20px'
      bg='#fff'
    >
      <Image />
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

const NoticeCount = styled.span`
  position: absolute;
  right: -10px;
  top: -15px;
  border-radius: 50%;
  padding: 6px;
  background-color: salmon;
  color: #fff;
  font-size: 13px;
`;

export default Header;
