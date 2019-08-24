import axios from 'axios';
import decode from 'jwt-decode';
import store from './jwt-store';

const auth = (callback) => {
  const setHeader = (token) => {
    // set authorization header for all future axios requests
    axios.defaults.headers.common.authorization = token;
  };

  const logout = () => {
    store.remove();
    // return empty user object
    callback({});
  };

  const login = async ({ tokenId: token }) => {
    try {
      setHeader(token);
      const { data: { message: authorization } } = await axios
        .post(`${process.env.REACT_APP_ENDPOINT}/api/auth`);

      if (authorization !== 'success auth') {
        throw new Error({ message: 'Unsuccessful Authentication' });
      }

      store.add(token);
      const { name, email, sub: googleId } = decode(token);
      callback({
        name,
        email,
        googleId,
      });
    } catch (error) {
      logout();
    }
  };

  const fail = (res) => {
    // Log failed auth, show potential message
    // return empty user object
    callback({});
  };

  return {
    login,
    logout,
    fail,
  };
};

export default auth;
