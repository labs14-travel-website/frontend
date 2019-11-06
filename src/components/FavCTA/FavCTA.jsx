import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import styles from './FavCTA.module.scss';

/**
 * @description Returns a modal containing a call to action to login when user tries to
 * go somewhere while logged out that only logged in users can go.
 * @param {func} hideCTA a function that closes the call to action modal.
 */

const FavCTA = ({
  responseFail,
  responseGoogle,
  hideCTA,
}) => {
  const [clientId] = useState(process.env.REACT_APP_OAUTH_GOOGLE_ID);

  useEffect(() => {
    document.addEventListener('keyup', hideCTA);
    return function cleanup() {
      document.removeEventListener('keyup', hideCTA);
    };
  });

  return (
    <>
      <div className={styles.FavCTA_overlay} onClick={hideCTA} />
      <div className={styles.FavCTA__wrapper}>
        <i onClick={hideCTA} className={`${styles.FavCTA__close} fas fa-times fa-2x`} />
        <h3>Login</h3>
        <p>Please sign up to save attractions to your profile.</p>
        <GoogleLogin
          className={styles.Nav__google}
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseFail}
          cookiePolicy="single_host_origin"
        />
      </div>
    </>
  );
};

FavCTA.propTypes = {
  responseFail: PropTypes.func.isRequired,
  responseGoogle: PropTypes.func.isRequired,
  hideCTA: PropTypes.func.isRequired,
};

export default FavCTA;
