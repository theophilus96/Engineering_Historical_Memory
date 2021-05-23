import logo from "./logo.svg";
import "./css/theme.css";
import "./css/libs.css";
import AOS from "aos";
//import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import { useStateValue } from "./state/StateProvider";
import { auth } from "./firebase/config";
import Navbar from "./components/Navbar";
//pages
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is :", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
