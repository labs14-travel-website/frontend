import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Nav.module.scss';
import logo from '../../assets/img/logo.png';

/**
 * @description Allows a user to log in or logout with google,
 * also contains a logo linking back to the home page.
 * @param {boolean} loggedIn details if user is loggedIn already
 * @param {function} responseFail actions if response from Google fails
 * @param {function} responseGoogle actions if success
 * @param {function} logout log the user out of their Google account
 */

const Nav = ({
  loggedIn, responseFail, responseGoogle, logout, Feature,
}) => {
  const [clientId] = useState(process.env.REACT_APP_OAUTH_GOOGLE_ID);
  return (
    <div className={styles.wrapper}>
      <div className={styles.Nav}>
        <a href="/">
          <img className={styles.Nav__logo} alt="roamly logo" src={logo} />
        </a>
        <Feature.Toggle flag="profile"><div><Link to="/profile" className={styles.Favorites}>My Favorites</Link></div></Feature.Toggle>
        {
          !loggedIn
            ? (
              <GoogleLogin
                className={styles.Nav__google}
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseFail}
                cookiePolicy="single_host_origin"
              />
            )
            : (<GoogleLogout buttonText="Logout" onLogoutSuccess={logout} clientId={clientId} />)
        }
      </div>
    </div>
  );
};

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  responseFail: PropTypes.func.isRequired,
  responseGoogle: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  Feature: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Nav;
