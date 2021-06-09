import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/config";
import { projectFirestore } from "../firebase/config";

export default function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log("auth = ", auth.user.uid);
        if (auth) {
          logUser(auth.user.uid);
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  function logUser(id) {
    projectFirestore.collection("users").doc(id).set({
      name: fullName,
      role: role,
      company: company,
    });

    var user = auth.currentUser;

    user
      .updateProfile({
        displayName: fullName,
      })
      .then(function () {
        // Update successful.
        console.log("displayName = ", fullName);
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });

    user
      .updateEmail(email)
      .then(function () {
        // Update successful.
        console.log("email = ", email);
      })
      .catch(function (error) {
        console.log(error);
        // An error happened.
      });

    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }

    //ref.set(obj);  //or however you wish to update the node
  }
  return (
    <section className="section-border border-primary">
      <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center gx-0 min-vh-100">
          <div className="col-12 col-md-5 col-lg-4 py-8 py-md-11">
            <h1 className="mb-0 fw-bold text-center">Sign Up</h1>

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

              <div className="form-group mb-5">
                <label className="form-label" for="password">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="form-group mb-5">
                <label className="form-label" for="password">
                  Role
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  placeholder="Enter your role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="form-group mb-5">
                <label className="form-label" for="password">
                  Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  placeholder="Enter your company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <button
                className="btn w-100 btn-EasternBlue"
                type="submit"
                onClick={register}
              >
                Sign in
              </button>
            </form>

            <p className="mb-0 fs-sm text-center text-muted">
              Already have an account? <a href="/login">Log In</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
