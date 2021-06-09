import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  projectFirestore,
  googleProvider,
  signInWithGoogle,
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
        console.log("credential from google", credential);

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        console.log("token from google", token);

        // The signed-in user info.
        var user = result.user;
        console.log("user from google", user);
        console.log("user displayName from google", user.displayName);
        console.log("user uid from google", user.uid);
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

  function logUser(id, displayName) {
    projectFirestore.collection("users").doc(id).set({
      name: displayName,
      role: "",
      company: "",
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
                className="btn w-100 btn"
                type="submit"
                onClick={signInWithGoogle}
              >
                <img
                  className="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="google icon"
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
