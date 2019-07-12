import React, { useState, useEffect } from "react";
import Users from "./Users";
import axios from "axios";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import store from "./utils/jwt-store";
import "./App.css";

function App() {
  const [state, setState] = useState({ loggedIn: false });
  useEffect(() => {
    const token = store.get();

    console.log("Store.get:  ", token);
    if (!!token) {
      setState(state => ({
        ...state,
        loggedIn: true
      }));
    }
    console.log("Logged In");
  }, []);

  const responseGoogle = res => {
    console.log(res.googleId);
    store.add(res.tokenId);
    setState(state => ({
      ...state,
      loggedIn: true
    }));
    axios
      .post(
        "http://localhost:8000/api/auth",
        {},
        {
          headers: {
            Authorization: res.tokenId
          }
        }
      )
      .then(data => {
        console.log(data);
      });
  };

  const logout =() => {
    store.remove();   
    setState(state => ({
      ...state,
      loggedIn: false
    }));
  };

  return (
    <div className="App">
      <Users />
      {!state.loggedIn ? (
        <GoogleLogin
          clientId="945370196700-q8bac43bki2md0o4aeq5roh2fe7o2vli.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      ) : (
        <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />
      )}
    </div>
  );
}

export default App;

// WE {El: "105400056097429390573", Zi: {…}, w3: PG, googleId: "105400056097429390573", tokenObj: {…}, …}
// El: "105400056097429390573"
// Zi:
// access_token: "ya29.GlxCB0qObXQqIhWEnxbkWEJGfhb_A9rPQoHCVv7jcwGHXOPbCgd2Iormyw2E-91s7fvN_EwlKeLVkLfHZ84xQULE_fLmD6t9F42iaxXetGQIiIRIGG28ol0QeIz6iA"
// expires_at: 1562880700985
// expires_in: 3600
// first_issued_at: 1562877100985
// id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZlNTUwOGQyNzk2NWFkNzkwN2MyMzIyMTJkZWZhNDhlZDc2MzcyN2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTQ1MzcwMTk2NzAwLXE4YmFjNDNia2kybWQwbzRhZXE1cm9oMmZlN28ydmxpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTQ1MzcwMTk2NzAwLXE4YmFjNDNia2kybWQwbzRhZXE1cm9oMmZlN28ydmxpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1NDAwMDU2MDk3NDI5MzkwNTczIiwiZW1haWwiOiJsYWJzMTV0cmF2ZWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI1ajlPazZDcVRVWUNEQ2NCM1FCd2JBIiwibmFtZSI6InJ5YW4gbWF0dGhld3MiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1ESnhWYTViUGJUUS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkVVZzRnlFNGJZb21GcnZzaEZ4MDE5UlFRSTNBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJyeWFuIiwiZmFtaWx5X25hbWUiOiJtYXR0aGV3cyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTYyODc3MTAwLCJleHAiOjE1NjI4ODA3MDAsImp0aSI6IjZmYTM2YjUxNDY0MjA1NDI0OWNlNzM4ZDVmZGY0OGI1M2VkZTVkMzcifQ.ZwxVKKvk_FyikwdjVlrjhwzOnhnNaRAC0cFDdK3pwyWJybWfsdss-GkxALfEG-fb9_yAmVfDViwYeB2jf9LsVqOoJGcy-dtSBYY-3xUQUE8h59NFikkYoTxl7b4tDRDqvc4cfBVqJOg-tR89xLUPwUxzT9MQq0scMkq4lj92Q6RYPl7ZZSFo9evGesnIB40-jFWWJjSuGAYbm3DkX1SjAqjrkGXuFgaS2W3sYrDXX0PMazue1xfuH9q6HtexqJaVvrNqjbfNMZ8i4B9ome-MMMzXsxThkdiKHbUL4DORked_TJ3OuFWzMjwtB3_irDpmQeV0JEOLAEtTY23hW2hTTA"
// idpId: "google"
// login_hint: "AJDLj6JUa8yxXrhHdWRHIV0S13cAojR4-vs6gHSQJhDaG518m7p-B-6Wo1EKPcm1S6zrlt7gprqI7ju0FLwgTDbY4f9mDvUpoQ"
// scope: "email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile"
// session_state:
// extraQueryParams:
// authuser: "0"
// __proto__: Object
// __proto__: Object
// token_type: "Bearer"
// __proto__: Object
// accessToken: "ya29.GlxCB0qObXQqIhWEnxbkWEJGfhb_A9rPQoHCVv7jcwGHXOPbCgd2Iormyw2E-91s7fvN_EwlKeLVkLfHZ84xQULE_fLmD6t9F42iaxXetGQIiIRIGG28ol0QeIz6iA"
// googleId: "105400056097429390573"
// profileObj:
// email: "labs15travel@gmail.com"
// familyName: "matthews"
// givenName: "ryan"
// googleId: "105400056097429390573"
// imageUrl: "https://lh4.googleusercontent.com/-DJxVa5bPbTQ/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdUVsFyE4bYomFrvshFx019RQQI3A/s96-c/photo.jpg"
// name: "ryan matthews"
// __proto__: Object
// tokenId: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZlNTUwOGQyNzk2NWFkNzkwN2MyMzIyMTJkZWZhNDhlZDc2MzcyN2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTQ1MzcwMTk2NzAwLXE4YmFjNDNia2kybWQwbzRhZXE1cm9oMmZlN28ydmxpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTQ1MzcwMTk2NzAwLXE4YmFjNDNia2kybWQwbzRhZXE1cm9oMmZlN28ydmxpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1NDAwMDU2MDk3NDI5MzkwNTczIiwiZW1haWwiOiJsYWJzMTV0cmF2ZWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI1ajlPazZDcVRVWUNEQ2NCM1FCd2JBIiwibmFtZSI6InJ5YW4gbWF0dGhld3MiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1ESnhWYTViUGJUUS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkVVZzRnlFNGJZb21GcnZzaEZ4MDE5UlFRSTNBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJyeWFuIiwiZmFtaWx5X25hbWUiOiJtYXR0aGV3cyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTYyODc3MTAwLCJleHAiOjE1NjI4ODA3MDAsImp0aSI6IjZmYTM2YjUxNDY0MjA1NDI0OWNlNzM4ZDVmZGY0OGI1M2VkZTVkMzcifQ.ZwxVKKvk_FyikwdjVlrjhwzOnhnNaRAC0cFDdK3pwyWJybWfsdss-GkxALfEG-fb9_yAmVfDViwYeB2jf9LsVqOoJGcy-dtSBYY-3xUQUE8h59NFikkYoTxl7b4tDRDqvc4cfBVqJOg-tR89xLUPwUxzT9MQq0scMkq4lj92Q6RYPl7ZZSFo9evGesnIB40-jFWWJjSuGAYbm3DkX1SjAqjrkGXuFgaS2W3sYrDXX0PMazue1xfuH9q6HtexqJaVvrNqjbfNMZ8i4B9ome-MMMzXsxThkdiKHbUL4DORked_TJ3OuFWzMjwtB3_irDpmQeV0JEOLAEtTY23hW2hTTA"
// tokenObj:
// access_token: "ya29.GlxCB0qObXQqIhWEnxbkWEJGfhb_A9rPQoHCVv7jcwGHXOPbCgd2Iormyw2E-91s7fvN_EwlKeLVkLfHZ84xQULE_fLmD6t9F42iaxXetGQIiIRIGG28ol0QeIz6iA"
// expires_at: 1562880700985
// expires_in: 3600
// first_issued_at: 1562877100985
// id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZlNTUwOGQyNzk2NWFkNzkwN2MyMzIyMTJkZWZhNDhlZDc2MzcyN2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTQ1MzcwMTk2NzAwLXE4YmFjNDNia2kybWQwbzRhZXE1cm9oMmZlN28ydmxpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTQ1MzcwMTk2NzAwLXE4YmFjNDNia2kybWQwbzRhZXE1cm9oMmZlN28ydmxpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1NDAwMDU2MDk3NDI5MzkwNTczIiwiZW1haWwiOiJsYWJzMTV0cmF2ZWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI1ajlPazZDcVRVWUNEQ2NCM1FCd2JBIiwibmFtZSI6InJ5YW4gbWF0dGhld3MiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1ESnhWYTViUGJUUS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkVVZzRnlFNGJZb21GcnZzaEZ4MDE5UlFRSTNBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJyeWFuIiwiZmFtaWx5X25hbWUiOiJtYXR0aGV3cyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTYyODc3MTAwLCJleHAiOjE1NjI4ODA3MDAsImp0aSI6IjZmYTM2YjUxNDY0MjA1NDI0OWNlNzM4ZDVmZGY0OGI1M2VkZTVkMzcifQ.ZwxVKKvk_FyikwdjVlrjhwzOnhnNaRAC0cFDdK3pwyWJybWfsdss-GkxALfEG-fb9_yAmVfDViwYeB2jf9LsVqOoJGcy-dtSBYY-3xUQUE8h59NFikkYoTxl7b4tDRDqvc4cfBVqJOg-tR89xLUPwUxzT9MQq0scMkq4lj92Q6RYPl7ZZSFo9evGesnIB40-jFWWJjSuGAYbm3DkX1SjAqjrkGXuFgaS2W3sYrDXX0PMazue1xfuH9q6HtexqJaVvrNqjbfNMZ8i4B9ome-MMMzXsxThkdiKHbUL4DORked_TJ3OuFWzMjwtB3_irDpmQeV0JEOLAEtTY23hW2hTTA"
// idpId: "google"
// login_hint: "AJDLj6JUa8yxXrhHdWRHIV0S13cAojR4-vs6gHSQJhDaG518m7p-B-6Wo1EKPcm1S6zrlt7gprqI7ju0FLwgTDbY4f9mDvUpoQ"
// scope: "email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile"
// session_state:
// extraQueryParams:
// authuser: "0"
// __proto__: Object
// __proto__: Object
// token_type: "Bearer"
// __proto__: Object
// w3: PG
// Eea: "105400056097429390573"
// Paa: "https://lh4.googleusercontent.com/-DJxVa5bPbTQ/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdUVsFyE4bYomFrvshFx019RQQI3A/s96-c/photo.jpg"
// U3: "labs15travel@gmail.com"
// ig: "ryan matthews"
// ofa: "ryan"
// wea: "matthews"
// __proto__: Object
// __proto__: Object
