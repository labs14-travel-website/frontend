import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import styles from './FavCTA.module.scss';

const FavCTA = ({
  Feature,
  responseFail,
  responseGoogle,
  hideCTA,
}) => {
  const [clientId] = useState(process.env.REACT_APP_OAUTH_GOOGLE_ID);

  return (
    <Feature.Toggle flag="cta">
      <div className={styles.FavCTA__wrapper}>
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
        <button type="button" onClick={hideCTA}>Nah I am good</button>
      </div>
      <></>
    </Feature.Toggle>
  );
};

FavCTA.propTypes = {
  Feature: PropTypes.objectOf(PropTypes.func).isRequired,
  responseFail: PropTypes.func.isRequired,
  responseGoogle: PropTypes.func.isRequired,
  hideCTA: PropTypes.func.isRequired,
};

export default FavCTA;
