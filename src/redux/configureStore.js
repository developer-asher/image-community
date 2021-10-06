import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

import User from './modules/user';
import Post from './modules/post';
import Image from './modules/image';
import Comment from './modules/comment';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  post: Post,
  image: Image,
  comment: Comment,
  router: connectRouter(history),
});

// 사용 할 미들웨어들을 []안에 포함 시키기.
// 액션생성함수 실행하고, reducer 실행되기 전 단계에서 history 받을 수 있게
const middlewares = [thunk.withExtraArgument({ history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
// require() : 패키지 가져올 때 사용
// import가 아닌 require를 사용하는 이유는 배포 환경에서는 불필요해서 if문 안에서
// 해당 패키지를 사용하려고 require를 쓴다.
if (env === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const composeEnhancers =
  // pc환경 확인 및 redux devtool 설치 확인
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// 모든 미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 스토어 만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
