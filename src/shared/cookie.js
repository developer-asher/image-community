const getCookie = (name) => {
  // array.find(): 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 전달.
  const sort_array = document.cookie.split('; ').find((item) => {
    if (item.includes(name)) return item;
  });

  if (!sort_array) {
    return false;
  }
  const info = sort_array.split('=');

  return info[1];
};

const setCookie = (name, value, exp = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  // 현재 날짜에 기본으로 5일을 더해줌(만료일 설정)

  document.cookie = `${name}=${value};expires=${date.toUTCString()};`;
};

const removeCookie = (name) => {
  const exp = new Date().toUTCString('2020-01-01');

  document.cookie = `${name}=; expires=${exp};`;
};

export { getCookie, setCookie, removeCookie };
