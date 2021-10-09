import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Grid, Input, Text, Button } from '../elements/index';
import { actionCreators as userActions } from '../redux/modules/user';

const SignIn = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [pwd, setPwd] = useState();

  const login = () => {
    if (id === '' || pwd === '') {
      alert('아이디와 비밀번호를 정확히 입력해주세요.');
      return false;
    }
    dispatch(userActions.loginFB(id, pwd));
  };

  const changeId = (e) => setId(e.target.value);
  const changePwd = (e) => setPwd(e.target.value);
  const keyPressLogin = (e) => {
    if (e.key === 'Enter' && id) {
      login();
    }
  };

  return (
    <Grid padding='20px' bg='#fff'>
      <Text size='30px' bold margin='0 0 30px 0'>
        로그인
      </Text>
      <Grid>
        <Grid margin='0 0 20px 0'>
          <Input //
            value={id}
            label='아이디'
            placeholder='Id'
            onChange={changeId}
          />
        </Grid>
        <Grid>
          <Input //
            value={pwd}
            type='password'
            label='비밀번호'
            placeholder='Password'
            onChange={changePwd}
            onKeyPress={keyPressLogin}
          />
        </Grid>
      </Grid>
      <ButtonWrap>
        <Button onClick={login}>로그인하기</Button>
      </ButtonWrap>
    </Grid>
  );
};

const ButtonWrap = styled.div`
  margin-top: 40px;
  text-align: center;
`;

export default SignIn;
