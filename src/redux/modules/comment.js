import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import 'moment';
import moment from 'moment';
import { firestore } from '../../shared/firebase';

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

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // 딕셔너리 형태, 각각의 post id 마다 댓글 리스트를 갖도록
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {}),
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
};

export { actionCreators };
