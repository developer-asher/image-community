import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as imageActions } from '../redux/modules/image';

import { Button } from '../elements';

const Upload = (props) => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.image.uploading);
  const fileInputRef = useRef();

  const selectFile = (e) => {
    // console.log(e.target.files[0]);
    // console.log(fileInputRef.current.files[0]);

    const reader = new FileReader();
    const file = fileInputRef.current.files[0];

    // 파일 내용 읽기
    reader.readAsDataURL(file);
    reader.onload = () => {
      // reader.result : 파일의 컨텐츠(내용물)
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    let image = fileInputRef.current.files[0];

    dispatch(imageActions.uploadImageFB(image));
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        onChange={selectFile}
        disabled={is_uploading}
      />
      <Button width='80px' onClick={uploadFB}>
        업로드하기
      </Button>
    </>
  );
};

export default Upload;
