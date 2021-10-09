import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import firebase from 'firebase/compat/app'; // v9에서는 compat을 이용

import { getCookie, setCookie, removeCookie } from '../../shared/cookie';
import { firestore, auth, realtime } from '../../shared/firebase';
// action type
const LOGOUT = 'LOGOUT';
const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';

// action creator
const logOut = createAction(LOGOUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const updateUser = createAction(UPDATE_USER, (user) => ({ user }));

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
            history.replace('/');
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
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: nick_name,
          })
          .then(() => {
            dispatch(
              setUser({ nick_name, id, user_profile: '', uid: user.user.uid }),
            );
            history.replace('/');
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

const updateUserFB = (nick_name) => {
  return function (dispatch, getState, { history }) {
    const user_info = getState().user.user;
    const new_user = {
      id: user_info.id,
      nick_name: nick_name,
      uid: user_info.uid,
      user_profile: user_info.profile,
    };

    const user = auth.currentUser;

    // 닉네임 변경 시 모든 게시글에서 내가 작성한 댓글의 닉네임 변경
    // 닉네임 변경 시 내가 업로드한 모든 게시글의 닉네임 변경
    // 닉네임 변경 시 모든 게시글에서 내가 작성한 댓글의 닉네임 변경
    user
      .updateProfile({
        displayName: nick_name,
      })
      .then(() => {
        console.log('닉네임 변경에 성공했습니다.');

        // 사용자 닉네임 수정 후 작성한 댓글에도 적용
        const commentDB = firestore.collection('comment');

        commentDB
          .where('user_id', '==', user_info.uid)
          .get()
          .then((snapshot) => {
            snapshot?.forEach((doc) => {
              commentDB
                .doc(doc.id)
                .update({ user_name: nick_name })
                .then(() => {
                  console.log(
                    '바뀐 닉네임으로 댓글을 업데이트하는데 성공하였습니다.',
                  );
                })
                .catch((error) => {
                  console.log(
                    '바뀐 닉네임으로 댓글을 업데이트하는데 실패하였습니다.',
                    error,
                  );
                });
            });
          })
          .catch((error) => {
            console.log(
              '댓글에 바뀐 닉네임을 적용하는데 실패하였습니다.',
              error,
            );
          });

        // 사용자 닉네임 수정 후 작성한 포스트에도 적용
        const postDB = firestore.collection('post');

        postDB
          .where('user_id', '==', user_info.uid)
          .get()
          .then((snapshot) => {
            snapshot?.forEach((doc) => {
              postDB
                .doc(doc.id)
                .update({ user_name: nick_name })
                .then(() => {
                  console.log(
                    '바뀐 닉네임으로 포스트를 업데이트하는데 성공하였습니다.',
                  );
                })
                .catch((error) => {
                  console.log(
                    '바뀐 닉네임으로 포스트를 업데이트하는데 실패하였습니다.',
                    error,
                  );
                });
            });
          })
          .catch((error) => {
            console.log(
              '댓글에 바뀐 닉네임을 적용하는데 실패하였습니다.',
              error,
            );
          });

        // 사용자 닉네임 수정 후 알림에도 적용
        realtime
          .ref(`notice`)
          .once('value')
          .then((snapshot) => {
            const user = snapshot?.val();
            const user_id = Object.keys(user);
            // console.log(user_id);

            for (let i = 0; i < user_id.length; i++) {
              realtime
                .ref(`notice/${user_id[i]}/list`)
                .once('value')
                .then((snap) => {
                  const comments = snap?.val();
                  const comments_id = Object.keys(comments);
                  // console.log(comments_id);

                  comments_id.forEach((id) => {
                    if (user_info.nick_name === comments[id].user_name) {
                      realtime.ref(`notice/${user_id[i]}/list/${id}`).update({
                        user_name: nick_name,
                      });
                    }
                  });
                });
            }
          });

        dispatch(updateUser(new_user));
      })
      .catch((error) => {
        console.log('닉네임 변경에 실패했습니다.', error);
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
    [UPDATE_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
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
  updateUserFB,
};

export { actionCreators };
