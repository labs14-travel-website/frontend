import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import styles from './Nav.module.scss';
import logo from '../../assets/img/logo.png';

const Nav = ({
  loggedIn, responseFail, responseGoogle, logout,
}) => {
  const [isLoggedIn] = useState(loggedIn);
  const [clientId] = useState(process.env.REACT_APP_OAUTH_GOOGLE_ID);

  return (
    <div className={styles.Nav}>
      <img className={styles.Nav__logo} alt="roamly logo" src={logo} />
      {
        !isLoggedIn
          ? (
            <GoogleLogin
              className={styles.Nav__google}
              clientId={clientId}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseFail}
              cookiePolicy="single_host_origin"
            />
          )
          : (<GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />)
      }
    </div>
  );
};

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  responseFail: PropTypes.func,
  responseGoogle: PropTypes.func,
  logout: PropTypes.func.isRequired,
};

export default Nav;
