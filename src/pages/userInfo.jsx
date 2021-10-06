import React, { useState } from 'react';
import { Grid, Input, Text, Button } from '../elements/index';
import styled from 'styled-components';
import Header from '../components/header';

const UserInfo = (props) => {
  const [nickName, setNickName] = useState();

  const editNickName = () => {
    console.log('닉네임 수정');
  };

  const getNickName = (e) => {
    console.log(e.target.value);
    setNickName(e.target.value);
  };

  return (
    <>
      <Text size='30px' bold margin='0 0 30px 0'>
        내 정보 수정
      </Text>
      <Grid>
        <Grid margin='0 0 20px 0'>
          <Input //
            value={nickName}
            label='닉네임'
            placeholder='바꿀 닉네임을 입력하세요'
            onChange={getNickName}
          />
        </Grid>
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button text='내 정보 수정하기' onClick={editNickName}></Button>
      </div>
    </>
  );
};

const Container = styled.div`
  width: 50%;
  margin: 40px auto;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 1px 1px 5px 1px #ccc;
`;

export default UserInfo;
