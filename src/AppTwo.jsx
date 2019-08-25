import React, { useState } from 'react';
import {
  Route,
  Link,
  withRouter,
  Switch,
} from 'react-router-dom';

const Destinations = () => <h2>Popular Destinations</h2>;

const City = (props) => {
  const handleOnClick = () => {
    props.history.push(`${props.match.url}/place/abc`);
  };

  return (
    <>
      <h3>{props.match.params.city}</h3>
      <button onClick={handleOnClick}>Card</button>
    </>
  );
};

const Modal = ({ match, history }) => {
  const handleOnClose = () => {
    history.push(`${match.params[0]}/${match.params[1]}`);
  };

  return (
    <>
      <div>
        Shh I'm a modal for
        {match.params.placeid}
      </div>
      <button onClick={handleOnClose}>Close</button>
    </>
  );
};

const Profile = props => (
  <>
    <h1>Profile</h1>
    <Link to={`${props.match.url}/place/def`}>Card</Link>
  </>
);

const App = (props) => {
  const [state, setState] = useState({
    destination: '',
  });

  const handleClick = () => {
    props.history.push('/search/San Francisco');
  };

  const NavStyles = {
    display: 'flex',
    width: '100%',
    maxWidth: '600px',
    justifyContent: 'space-between',
    margin: '0 auto',
    alignItems: 'center',
    borderBottom: '1px solid red',
    marginBottom: '20px',
  };

  return (
    <>
      <div className="App" style={{ margin: '0 auto', maxWidth: '600px' }}>
        <div style={NavStyles}>
          <Link to="/">
            <h4>Home</h4>
          </Link>

          <Switch>
            <Route path="/" exact render={() => <></>} />
            <Route path="/" render={() => <div>search</div>} />
          </Switch>
          <Link to="/profile">profile</Link>
        </div>
        <div>
          <span>Hero</span>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                search
                <button onClick={handleClick}>Clicky</button>
              </div>
            )}
          />
          <Route
            path="/search/:city"
            render={routeProps => <div>{routeProps.match.params.city}</div>}
          />
        </div>

        <Route path="/" exact render={Destinations} />
        <Route path="/search/:city" render={City} />
        <Route path="/profile" render={Profile} />
        <Route path="*/*/place/:placeid" render={Modal} />
      </div>
    </>
  );
};

export default withRouter(App);
