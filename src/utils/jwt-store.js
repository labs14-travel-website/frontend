// name of the localStorage object
const RECORD = 'roamly-jwt';

export const getAuth = () => JSON.parse(localStorage.getItem(RECORD));

const addAuth = (payload) => {
  localStorage.setItem(RECORD, JSON.stringify(payload));
};

const removeAuth = () => {
  localStorage.removeItem(RECORD);
};

const auth = {
  get: getAuth,
  add: addAuth,
  remove: removeAuth,
};

export default auth;
