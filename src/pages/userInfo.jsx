import React, { useState, useSelector } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Grid, Input, Text, Button } from '../elements/index';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

const UserInfo = (props) => {
  const dispatch = useDispatch();
  const [nick_name, setNickName] = useState('');
  // const user = useSelector();

  const changeName = (e) => {
    setNickName(e.target.value);
  };

  const editName = (e) => {
    if (nick_name === '') {
      alert('변경하실 닉네임을 작성해주세요.');
      return false;
    }
    dispatch(userActions.updateUserFB(nick_name));
    setNickName('');
  };

  const handleKeyPress = (e) => {
    if (e.key !== 'Enter') {
      return false;
    }
    editName();
  };

  const goHome = () => {
    history.push('/');
  };

  return (
    <Grid padding='20px' bg='#fff'>
      <Text size='30px' bold margin='0 0 30px 0'>
        내 정보 수정
      </Text>
      <Grid>
        <Grid margin='0 0 20px 0'>
          <Input //
            value={nick_name}
            label='닉네임'
            placeholder='닉네임을 입력하세요'
            onChange={changeName}
            onKeyPress={handleKeyPress}
          />
        </Grid>
      </Grid>
      <ButtonWrap>
        <Button onClick={editName}>내 정보 수정하기</Button>
      </ButtonWrap>
      <Button onClick={goHome}>홈으로 이동</Button>
    </Grid>
  );
};

const ButtonWrap = styled.div`
  text-align: center;
  margin: 40px 0 20px 0;
`;

export default UserInfo;
