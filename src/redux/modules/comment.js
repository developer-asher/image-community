import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';

import { firestore } from '../../shared/firebase';
import firebase from 'firebase/compat/app';

const SET_COMMENT = 'SET_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const LOADING = 'LOADING';

const initialState = {
  list: {},
  is_loading: false,
};

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const getCommentFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection('comment');

    commentDB
      .where('post_id', '==', post_id)
      .orderBy('insert_dt', 'desc')
      .get()
      .then((docs) => {
        let list = [];

        docs.forEach((doc) => {
          list.push(doc.data());
        });

        dispatch(setComment(post_id, list));
      })
      .catch((error) => {
        console.log('댓글 정보를 가져오는데 실패하였습니다.', error);
      });
  };
};

const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection('comment');
    const user_info = getState().user.user;
    let comment = {
      post_id: post_id,
      contents: contents,
      user_id: user_info.uid,
      user_name: user_info.nick_name,
      user_profile: user_info.user_profile,
      insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
    };

    commentDB
      .add(comment)
      .then((doc) => {
        console.log('firebase: 댓글 추가 성공');

        const postDB = firestore.collection('post').doc(post_id);
        comment = { ...comment, id: doc.id }; // 새롭게 추가한 댓글의 id를 추가로 얻기 위한 작업

        const post = getState().post.list.find((p) => p.id === post_id);
        const increment = firebase.firestore.FieldValue.increment(1); // firestore에 저장된 값에 +1

        postDB
          .update({ comment_cnt: increment })
          .then(() => {
            console.log('firebase: 댓글 갯수 업데이트 완료!');

            if (post) dispatch(addComment(post_id, comment));
          })
          .catch((error) => {
            console.error(
              'firebase: 댓글 갯수 업데이트에 실패하였습니다.',
              error,
            );
          });
      })
      .catch((error) =>
        console.log('firebase: 댓글 추가에 실패하였습니다.', error),
      );
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // 딕셔너리 형태, 각각의 post id 마다 댓글 리스트를 갖도록
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState,
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  addCommentFB,
};

export { actionCreators };
