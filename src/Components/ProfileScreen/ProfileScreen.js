import React from "react";
import { useSelector } from "react-redux";
import { selectUser, selectCurrentPlan } from "../../features/userSlice";
import { auth } from "../../firebase";
import Navbar from "../Navbar/Navbar";
import PlanScreen from "../PlanScreen/PlanScreen";
import "./ProfileScreen.css";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const currentSubscriptionPlan = useSelector(selectCurrentPlan);
  console.log("**@ currentSubscriptionPlan is , ", currentSubscriptionPlan);

  const signOut = (e) => {
    e.preventDefault();
    auth.signOut();
  };

  return (
    <div className="profileScreen">
      <Navbar />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>
                Plans : Current Plan:-{currentSubscriptionPlan?.currentPlan}
              </h3>
              <PlanScreen />
              <button
                onClick={(e) => signOut(e)}
                className="profileScreen__signout"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
