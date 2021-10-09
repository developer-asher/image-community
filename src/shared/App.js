import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { apiKey } from './firebase';
import Permit from './permit';
import PostList from '../pages/postList';
import PostWrite from '../pages/postWrite';
import PostDetail from '../pages/postDetail';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import UserInfo from '../pages/userInfo';
import NoticeList from '../pages/noticeList';
import Header from '../components/header';
import { Grid, Button } from '../elements/index';

import './App.css';

const addBtnStyles = {
  position: 'fixed',
  right: '20px',
  bottom: '20px',
  fontSize: '40',
  color: '#f7a35c',
};

function App() {
  const path_name = history.location.pathname;
  const dispatch = useDispatch();

  const SESSION_KEY = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(SESSION_KEY) ? true : false;

  useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <Container>
      <Grid bg='#eff6ff'>
        <Header />
        <ConnectedRouter history={history}>
          <Route path='/' exact component={PostList} />
          <Route path={['/write', '/write/:id']} exact component={PostWrite} />
          <Route
            path={['/detail', '/detail/:id']}
            exact
            component={PostDetail}
          />
          <Route path='/signin' exact component={SignIn} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/user' exact component={UserInfo} />
          <Route path='/notice' exact component={NoticeList} />
        </ConnectedRouter>
      </Grid>
      {/* 로그인 된 상태에서 post, detail, main 페이지에서만 게시글 추가 버튼 보이기 */}
      <Permit>
        {path_name === '/signin' ||
        path_name === '/signup' ||
        path_name === '/user' ? (
          <></>
        ) : (
          <Button
            padding='0px'
            bg='transparent'
            onClick={() => history.push('/write')}
          >
            <AddCircleIcon style={addBtnStyles} />
          </Button>
        )}
      </Permit>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  position: relative;
  max-height: 100%;
  border-radius: 10px;
  background-color: #eee;
`;

export default App;
