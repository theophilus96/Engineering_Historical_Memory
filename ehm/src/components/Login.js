import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  projectFirestore,
  googleProvider,
  facebookProvider,
  twitterProvider,
  auth,
} from "../firebase/config";
import { Redirect } from "react-router-dom";

//picture
export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const signInWithGoogle = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        logUser(user.uid, user.displayName);

        // ...
        history.push("/");
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  // need to ask khoi for facebook App ID and App secret.
  // as well as add this OAuth redirect URI to the Facebook app configuration
  // https://engineeringhistoricalmem-27d5c.firebaseapp.com/__/auth/handler

  //API Key
  //API secret
  //To complete set up, add this callback URL to your Twitter app configuration. Learn more
  //https://engineeringhistoricalmem-27d5c.firebaseapp.com/__/auth/handler
  const signInWithFacebook = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(facebookProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        console.log("credential from facebook", credential);
        var user = result.user;
        console.log("user from facebook", user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        console.log("token from facebook", accessToken);
        // ...
        history.push("/");
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        console.log("errorCode from facebook", errorCode);
        var errorMessage = error.message;
        console.log("errorMessage from facebook", errorMessage);
        // The email of the user's account used.
        var email = error.email;
        console.log("error email from facebook", email);
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("error credential from facebook", credential);
        // ...
      });
  };

  const signInWithTwitter = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(twitterProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = credential.accessToken;
        var secret = credential.secret;

        // The signed-in user info.
        var user = result.user;
        console.log("user from twitter", user);
        logUser(user.uid, user.displayName, user.photoURL);

        // ...
        history.push("/");
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        console.log("errorCode from twitter", errorCode);
        var errorMessage = error.message;
        console.log("errorMessage from twitter", errorMessage);
        // The email of the user's account used.
        var email = error.email;
        console.log("error email from twitter", email);
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("error credential from twitter", credential);
        // ...
      });
  };

  function logUser(id, displayName, image) {
    projectFirestore.collection("users").doc(id).set({
      name: displayName,
      role: "",
      company: "",
      image: image,
    });
  }
  return (
    <section className="section-border border-primary">
      <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center gx-0 min-vh-100">
          <div className="col-12 col-md-5 col-lg-4 py-8 py-md-11">
            <h1 className="mb-0 fw-bold text-center">Sign in</h1>

            <p className="mb-6 text-center text-muted">
              {/* Simplify your workflow in minutes. */}
            </p>

            <form className="mb-6">
              <div className="form-group">
                <label className="form-label" for="email">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@address.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group mb-5">
                <label className="form-label" for="password">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="btn w-100 btn-EasternBlue"
                type="submit"
                onClick={signIn}
              >
                Sign in
              </button>
              <p className="mt-6 mb-6 text-center text-muted">
                or sign in using
              </p>
              <button
                className="btn w-30 btn"
                type="submit"
                onClick={signInWithGoogle}
              >
                <img
                  className="google-icon"
                  src="http://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png"
                  alt="google icon"
                />
              </button>

              <button
                className="btn w-30 btn"
                type="submit"
                onClick={signInWithFacebook}
              >
                <img
                  className="facebook-icon"
                  src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png"
                  alt="facebook icon"
                />
              </button>

              <button
                className="btn w-30 btn"
                type="submit"
                onClick={signInWithTwitter}
              >
                <img
                  className="twitter-icon"
                  src="https://www.creativefreedom.co.uk/wp-content/uploads/2017/06/Twitter-featured.png"
                  alt="twitter icon"
                />
              </button>
            </form>

            <p className="mb-0 fs-sm text-center text-muted">
              Don't have an account yet{" "}
              <a
                style={{
                  color: "#22A6A7",
                  "&:hover": {
                    color: "#000",
                  },
                }}
                href="/signup"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
