import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Grid, Input, Text, Button } from '../elements/index';
import { actionCreators } from '../redux/modules/user';

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [nick_name, setNickName] = useState();
  const [pwd, setPwd] = useState();
  const [pwd_check, setPwdCheck] = useState();

  const validateEmail = (email) => {
    const re =
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

  const changeId = (e) => setId(e.target.value);
  const changeName = (e) => setNickName(e.target.value);
  const changePwd = (e) => setPwd(e.target.value);
  const changePwdCheck = (e) => setPwdCheck(e.target.value);

  return (
    <Grid padding='20px' bg='#fff'>
      <Text size='30px' bold margin='0 0 30px 0'>
        로그인
      </Text>
      <Grid>
        <Grid margin='0 0 20px 0'>
          <Input
            value={id}
            label='아이디'
            placeholder='아이디를 입력하세요'
            onChange={changeId}
          />
        </Grid>
        <Grid margin='0 0 20px 0'>
          <Input
            value={nick_name}
            label='닉네임'
            placeholder='닉네임을 입력하세요'
            onChange={changeName}
          />
        </Grid>
        <Grid margin='0 0 20px 0'>
          <Input
            value={pwd}
            type='password'
            label='비밀번호'
            placeholder='비밀번호를 입력하세요'
            onChange={changePwd}
          />
        </Grid>
        <Grid>
          <Input
            value={pwd_check}
            type='password'
            label='비밀번호 확인'
            placeholder='비밀번호를 다시 입력하세요 '
            onChange={changePwdCheck}
          />
        </Grid>
      </Grid>
      <ButtonWrap>
        <Button onClick={signUp}>회원가입하기</Button>
      </ButtonWrap>
    </Grid>
  );
};

const ButtonWrap = styled.div`
  margin-top: 40px;
  text-align: center;
`;

export default SignUp;
