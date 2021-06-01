import Cookie from 'js-cookie';

export function setCookie(info) {
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    const element = arr[i];
    Cookie.set(element[0], element[1]);
  }
  return true;
}
export function getUserCookie() {
  return {
    username: Cookie.get('username'),
    appkey: Cookie.get('appkey'),
    role: Cookie.get('role'),
    email: Cookie.get('email'),
  };
}
export function removeUserCookie() {
  Cookie.remove('username');
  Cookie.remove('appkey');
  Cookie.remove('role');
  Cookie.remove('email');
  return true;
}
