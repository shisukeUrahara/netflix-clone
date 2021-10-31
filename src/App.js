import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./Components/HomeScreen/HomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./Components/ProfileScreen/ProfileScreen";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const unsubscribe = await auth.onAuthStateChanged((userAuth) => {
        console.log("**@ userAUth is , ", userAuth);
        if (userAuth) {
          // user is logged in
          dispatch(
            login({
              uid: userAuth.uid,
              email: userAuth.email,
            })
          );
        } else {
          // user is logged out
          dispatch(logout());
        }
      });

      return unsubscribe;
    };

    init();
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>

            <Route path="/profile">
              <ProfileScreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
