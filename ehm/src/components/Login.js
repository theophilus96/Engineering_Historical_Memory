import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/config";
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

              <button className="btn w-100 btn-EasternBlue" type="submit">
                Sign in
              </button>
            </form>

            <p className="mb-0 fs-sm text-center text-muted">
              Don't have an account yet <a href="/signup">Sign up</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
