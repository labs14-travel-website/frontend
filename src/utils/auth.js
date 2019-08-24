import axios from 'axios';
import decode from 'jwt-decode';
import store from './jwt-store';

/**
 * Authentication helper that handles logic for logging in and logging out
 * @param {function} callback Callback function that the resulting user object gets passed to
 * @returns {object} Object of auth functions (login, logout, fail)
 */
const auth = (callback = () => true) => {
  /**
   * Sets the authentication token for future axios requests
   * @param {string} token Authentication token for the user
   * @returns {undefined}
   */
  const setHeader = (token) => {
    // set authorization header for all future axios requests
    axios.defaults.headers.common.authorization = token;
  };

  /**
   * Logs the user out by removing token from localStorage
   * then invokes the provided callback with an empty user object.
   * @returns {undefined}
   */
  const logout = () => {
    store.remove();
    callback({});
  };

  /**
   * Handles authenticating the user with the server after
   * receiving the response from the Google OAuth servers.
   * Sets the token authorization for future axios requests.
   * @param {object} tokenId Response object from the Google OAuth request, destructuring tokenId
   * @returns {undefined}
   */
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
      throw new Error(error);
    }
  };

  /**
   * Handles logic for actions when auth request fails
   * @param {object} res Response object on a failed authentication request
   * @returns {undefined}
   */
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
