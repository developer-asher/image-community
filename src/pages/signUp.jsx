import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Grid, Input, Text, Button } from '../elements/index';
import { actionCreators } from '../redux/modules/user';

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [nick_name, setNickName] = useState();
  const [pwd, setPwd] = useState();
  const [pwd_check, setPwdCheck] = useState();

  const validateEmail = (email) => {
    var re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  };

  const signUp = () => {
    if (id === '' || !validateEmail(id)) {
      console.log(validateEmail(id));
      alert('올바른 이메일 주소를 입력해주세요.');
      return false;
    }
    if (nick_name === '') {
      alert('닉네임을 정확히 입력해주세요.');
      return false;
    }
    if (pwd === '') {
      alert('비밀번호를 정확히 입력해주세요.');
      return false;
    }
    if (pwd !== pwd_check) {
      alert('비밀번호가 다릅니다.');
      return false;
    }

    dispatch(actionCreators.signupFB(id, pwd, nick_name));
  };

  return (
    <>
      <Text size='30px' bold margin='0 0 30px 0'>
        로그인
      </Text>
      <Grid>
        <Grid margin='0 0 20px 0'>
          <Input
            value={id}
            label='아이디'
            placeholder='아이디를 입력하세요'
            onChange={(e) => setId(e.target.value)}
          />
        </Grid>
        <Grid value={nick_name} margin='0 0 20px 0'>
          <Input
            label='닉네임'
            placeholder='닉네임을 입력하세요'
            onChange={(e) => setNickName(e.target.value)}
          />
        </Grid>
        <Grid margin='0 0 20px 0'>
          <Input
            value={pwd}
            type='password'
            label='비밀번호'
            placeholder='비밀번호를 입력하세요'
            onChange={(e) => setPwd(e.target.value)}
          />
        </Grid>
        <Grid>
          <Input
            value={pwd_check}
            type='password'
            label='비밀번호 확인'
            placeholder='비밀번호를 다시 입력하세요 '
            onChange={(e) => setPwdCheck(e.target.value)}
          />
        </Grid>
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button onClick={signUp}>회원가입하기</Button>
      </div>
    </>
  );
};

export default SignUp;
