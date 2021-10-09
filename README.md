# SNS Practice in React

sns 형태의 애플리케이션.
이미지를 업로드, 댓글, 좋아요와 알림을 받을 수 있는 기능과 닉네임을 변경하면 기존에 작성했던 게시글, 댓글, 알림에 모든 데이터가 현재 바뀐 닉네임으로 반영되도록 작업을 진행했다. 또한, 게시글 수정, 삭제와 이미지 업로드 시 미리보기를 통해 유저가 제대로 된 사진을 업로드 하는지 미리 확인할 수 있도록 구현했다.

## 기능 및 API 설계

- session storeage, cookie, firebase auth를 사용한 로그인, 로그아웃
- firebase auth(유저 정보)
- firestore를 이용한 데이터 관리(댓글 정보, 게시글 정보)
- firebase storage를 이용한 업로드 파일 관리(이미지)
- realtime database(댓글 알림, 좋아요)
- loadash를 이용한 잦은 이벤트 관리(trottle을 이용한 무한스크롤)
- styled-component를 이용한 css in js(각종 css, animation)
- redux-thunk를 이용한 미딜웨어의 비동기 작업(함수 disptach)
- immer를 이용한 불변성 관리

## 기술 스택 및 라이브러리, 패키지

- JSX
- Javascript
- React
- router
- redux, react-redux, redux-thunk, redux-logger, history, connected-react-router
- react-actions
- firebase(store, storage, auth, realtime database)
- loadsh(trottle, debounce)
- styled-component(CSS in JS)
- immer
- moment
- marterial

## 마무리하며..
