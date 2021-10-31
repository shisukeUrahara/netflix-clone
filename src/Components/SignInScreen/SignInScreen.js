import React, { useState, useRef } from "react";
import "./SignInScreen.css";
import { auth } from "../../firebase";
import { toast } from "../Toast/Toast";

function SignInScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [signingIn, setSigningIn] = useState(true);

  const signIn = async (e) => {
    e.preventDefault();
    if (!emailRef.current.value) {
      toast.error("Email Required");
    } else if (!passwordRef.current.value) {
      toast.error("Password Required");
    } else {
      await auth
        .signInWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((authUser) => {
          console.log("**@ authUser is , ", authUser);
          toast.success("Successfully Signed in ");
        })
        .catch((err) => {
          console.log("**@ the signed in error is , ", err.message);
          toast.error(err.message);
        });
    }
  };

  const register = async (e) => {
    e.preventDefault();
    if (!emailRef.current.value) {
      toast.error("Email Required");
    } else if (!passwordRef.current.value) {
      toast.error("Password Required");
    } else {
      await auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((authUser) => {
          console.log("**@ authUser is , ", authUser);
          toast.success("Successfully registered user ");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div className="signInScreen">
      <form>
        {signingIn ? <h1>Sign In</h1> : <h1>Register</h1>}
        <input
          type="email"
          ref={emailRef}
          placeholder="Email"
          required={true}
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required={true}
        />
        {signingIn ? (
          <button type="submit" onClick={signIn}>
            Sign In
          </button>
        ) : (
          <button type="submit" onClick={register}>
            Register
          </button>
        )}

        {signingIn ? (
          <h4>
            <span className="signUpScreen__gray"> New to Netflix? </span>
            <span
              className="signUpScreen__link"
              onClick={() => setSigningIn(false)}
            >
              {" "}
              Sign Up Now
            </span>
          </h4>
        ) : (
          <span
            className="signUpScreen__signInLink"
            onClick={() => setSigningIn(true)}
          >
            {" "}
            Sign In
          </span>
        )}
      </form>
    </div>
  );
}

export default SignInScreen;
