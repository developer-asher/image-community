import firebase from 'firebase/compat/app'; // v9에서는 compat을 이용
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBLwlx9FmIB3xOQTfsBKfN-OVOuleJmt1k',
  authDomain: 'image-community-fae09.firebaseapp.com',
  projectId: 'image-community-fae09',
  storageBucket: 'image-community-fae09.appspot.com',
  messagingSenderId: '768351627118',
  appId: '1:768351627118:web:36b6f118adce992570037f',
  measurementId: 'G-P8DM3Y0H4R',
};

firebase.initializeApp(firebaseConfig);

// 로그인을 정상적으로 하게 되면 세션스토리지에 세션이 남게 된다. 그렇기 때문에
// 인증키를 키 값으로 해서 세션 체크를 하고 로그인을 유지하기 할 수 있는 파이어베이스 인증키가 필요하다.
const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

export { auth, apiKey, firestore, storage, realtime };
