import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import styles from './FavCTA.module.scss';

const FavCTA = ({ responseFail, responseGoogle, hideCTA }) => {
  const [clientId] = useState(process.env.REACT_APP_OAUTH_GOOGLE_ID);

  return (
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
      <button onClick={hideCTA}>Nah I'm good</button>
    </div>
  );
};

FavCTA.propTypes = {
  responseFail: PropTypes.func.isRequired,
  responseGoogle: PropTypes.func.isRequired,
};

export default FavCTA;
