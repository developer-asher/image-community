import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';

import { firestore, storage } from '../../shared/firebase';
import { actionCreators as imageActions } from './image';
import { ConstructionOutlined } from '@mui/icons-material';

const SET_POST = 'SET_POST';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const LOADING_POST = 'LOADING_POST';

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 4 },
  loading_post: false,
};

const initialPost = {
  contents: '',
  image_url:
    'https://cdnweb01.wikitree.co.kr/webdata/editor/202103/02/img_20210302105652_f4642f08.webp',
  comment_cnt: 0,
  insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
};

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loadingPost = createAction(LOADING_POST, (loading_post) => ({
  loading_post,
}));

const addPostFB = (contents) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');

    const _user = getState().user.user; // login할때 저장한 redux의 user정보 가져오기
    const user_info = {
      user_name: _user.nick_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
    };

    // store에서 파일의 내용 받아오기(string)
    const _image = getState().image.preview;

    // 파일의 전체 경로를 가리키는 참조 만들기.
    const imageRef = storage.ref(
      `images/${user_info.user_id}_${new Date().getTime()}`,
    );

    // image upload
    const upload = imageRef.putString(_image, 'data_url');

    upload
      .then((snapshot) => {
        // 업로드 성공 시 image URL 받기
        snapshot.ref
          .getDownloadURL() //
          .then((url) => {
            return url;
          })
          .then((url) => {
            // firebase에 데이터 추가
            postDB
              .add({
                ...user_info,
                ..._post,
                image_url: url,
              })
              .then((doc) => {
                // redux에 데이터 저장 시 형식 맞춰서
                const post = {
                  id: doc.id,
                  user_info,
                  ..._post,
                  image_url: url,
                };

                // 리덕스에 데이터 추가
                dispatch(addPost(post));
                history.replace('/');

                // 이미지 업로드 이후 preview 초기화
                dispatch(imageActions.setPreview(null));
              })
              .catch((error) => {
                console.error('Error adding document: ', error);
              });
          });
      })
      .catch((error) => {
        alert('이미지 업로드 실패');
        console.log('이미지 업로드에 문제가 생겼습니다.', error);
      });
  };
};

const editPostFB = (post_id = null, contents) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return false;
    }

    // 이미지가 같을때 , 다를 때
    const image = getState().image.preview;
    const post = getState().post.list.find((p) => p.id === post_id);
    const postDB = firestore.collection('post').doc(post_id);

    if (image === post.image_url) {
      // 수정은 작성자만 가능하기 때문에 유저 정보를 굳이 또 가져 올 필요가 없음.
      postDB
        .update({
          contents: contents,
        })
        .then(() => {
          console.log('이미지가 수정되지 않았습니다.');

          dispatch(editPost(post_id, contents));
          history.replace('/');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    } else {
      // 이미지 업로드, 컨텐츠 내용 저장
      const user_id = getState().user.user.uid;

      // 문자열로 되있는 그림의 내용을 storage에 업로드
      const upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(image, 'data_url');

      upload
        .then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              console.log(url);

              return url;
            })
            .then((url) => {
              postDB
                .update({
                  image_url: url,
                  contents: contents,
                })
                .then(() => {
                  console.log('Document successfully updated!');

                  dispatch(
                    editPost(post_id, { contents: contents, image_url: url }),
                  );
                  history.replace('/');
                })
                .catch((error) => {
                  // The document probably doesn't exist.
                  console.error('Error updating document: ', error);
                });
            });
        })
        .catch((err) => {
          alert('이미지를 업로드 하는 과정에서 문제가 생겼습니다.');
          console.log('이미지 업로드에 실패하였습니다.');
        });
    }
  };
};

const getPostFB = (start = null, size = 4) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;

    // 시작정보가 있는데 다음 데이터가 없을 시 return
    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loadingPost(true));

    const postDB = firestore.collection('post');
    let query = postDB.orderBy('insert_dt', 'desc');

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1) // 5개만 가져오기
      .get()
      .then((snapshot) => {
        let post_list = [];
        let paging = {
          start: snapshot.docs[0],
          next:
            snapshot.docs.length === size + 1
              ? snapshot.docs[snapshot.docs.length - 1]
              : null,
          size: size,
        };

        snapshot.forEach((doc) => {
          const _post = doc.data();
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf('user_') !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} },
          );

          post_list.push(post);
        });

        // 한번에 4개만(단, 배열의 길이가 5일때만 그 밑은 다 보여줌)
        if (post_list.length === 5) {
          post_list.pop();
        }

        dispatch(setPost(post_list, paging));
      });
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');

    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();

        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf('user_') !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} },
        );

        dispatch(setPost([post]));
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        // 증복제거
        draft.list.push(...action.payload.post_list);

        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            // 중복 x
            return [...acc, cur];
          } else {
            //중복 o
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.loading_post = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        const index = draft.list.findIndex(
          (p) => p.id === action.payload.post_id,
        );

        draft.list[index] = {
          ...draft.list[index],
          ...action.payload.post,
        };
      }),
    [LOADING_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.loading_post = action.payload.loading_post;
      }),
  },
  initialState,
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  getOnePostFB,
  addPostFB,
  editPostFB,
};

export { actionCreators };
