import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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

  return (
    <>
      <Text size='30px' bold margin='0 0 30px 0'>
        로그인
      </Text>
      <Grid>
        <Grid margin='0 0 20px 0'>
          <Input //
            value={id}
            label='아이디'
            placeholder='Id'
            onChange={(e) => setId(e.target.value)}
          />
        </Grid>
        <Grid>
          <Input //
            value={pwd}
            type='password'
            label='비밀번호'
            placeholder='Password'
            onChange={(e) => setPwd(e.target.value)}
          />
        </Grid>
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button onClick={login}>로그인하기</Button>
      </div>
    </>
  );
};

export default SignIn;
