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
import Login from "./components/Login";
import SignUp from "./components/SignUp";
//pages
import Home from "./pages/Home";
import ArticlesList from "./pages/ArticlesList";
import AboutPage from "./pages/AboutPage";
import TermPage from "./pages/TermPage";
import CreditsPage from "./pages/CreditsPage";
import ContactPage from "./pages/ContactPage";
//articles
import Framauro from "./articles/Framauro";
//research Team
import researchTeam from "./researchTeam/researchTeam";

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
        {/* <OldNavBar/> */}
        <Navbar />
        {/* <NavBar1 /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/category/:CatId" component={ArticlesList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/article/framauro" component={Framauro} />
          <Route
            exact
            path="/category/:CatId/article/:id"
            component={Framauro}
          />
          <Route exact path="/researchteam" component={researchTeam} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/term" component={TermPage} />
          <Route exact path="/credits" component={CreditsPage} />
          <Route exact path="/contact" component={ContactPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
