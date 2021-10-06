import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import firebase from 'firebase/compat/app'; // v9에서는 compat을 이용

import { getCookie, setCookie, removeCookie } from '../../shared/cookie';
import { auth } from '../../shared/firebase';

// action type
const LOGOUT = 'LOGOUT';
const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';

// action creator
const logOut = createAction(LOGOUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initial state
const initialState = {
  is_login: false,
  user: null,
};

// middleware actions
const loginFB = (id, pwd) => {
  return async function (dispatch, getState, { history }) {
    await auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then((res) => {
        auth
          .signInWithEmailAndPassword(id, pwd)
          .then((user) => {
            const user_nickName = user.user._delegate.displayName;
            const uid = user.user._delegate.uid;

            dispatch(
              setUser({ nick_name: user_nickName, id, user_profile: '', uid }),
            );
            history.push('/');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert('아이디 혹은 비밀번호가 정확하지 않습니다.');
            console.log(errorCode, errorMessage);
          });
      });
  };
};

const signupFB = (id, pwd, nick_name) => {
  return async function (dispatch, getState, { history }) {
    await auth
      .createUserWithEmailAndPassword(id, pwd)
      .then(() => {
        auth.currentUser
          .updateProfile({
            displayName: nick_name,
          })
          .then((user) => {
            const uid = user.user._delegate.uid;

            dispatch(setUser({ nick_name, id, user_profile: '', uid }));
            history.push('/');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

// firebase를 통한 login check
const loginCheckFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            nick_name: user.displayName,
            user_profile: '',
            id: user.email,
            uid: user.uid,
          }),
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, useState, { history }) {
    auth
      .signOut()
      .then(() => {
        dispatch(logOut());
        // 뒤로가기 방지
        history.replace('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie('is_login', 'success');

        draft.is_login = true;
        draft.user = action.payload.user;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        removeCookie('is_login');

        draft.is_login = false;
        draft.user = null;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState,
);

const actionCreators = {
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
