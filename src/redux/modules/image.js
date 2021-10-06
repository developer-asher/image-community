import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

import { storage } from '../../shared/firebase';

const UPLOADING = 'UPLOADING';
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
const SET_PREVIEW = 'SET_PREVIEW';

const initialState = {
  uploading: false,
  image_url: '',
  preview: null,
};

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const uploadImageFB = (image) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true));

    // 파일의 전체 경로를 가리키는 참조 만들기.
    let imageRef = storage.ref(`images/${image.name}`);

    // 파일 업로드
    imageRef.put(image).then((snapshot) => {
      // 이미지 url
      snapshot.ref.getDownloadURL().then((url) => {
        dispatch(uploadImage(url));
      });
    });
  };
};

export default handleActions(
  {
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = false;
        draft.image_url = action.payload.image_url;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState,
);

const actionCreators = {
  uploadImageFB,
  setPreview,
};

export { actionCreators };
