import React, { useEffect, useState } from "react";
import "./PlanScreen.css";
import { db } from "../../firebase";
import { toast } from "../Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setPlan } from "../../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(undefined);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      // getting the active subscription
      await db
        .collection("customers")
        .doc(user.uid)
        .collection("subscriptions")
        .get()
        .then(async (querySnapShot) => {
          await querySnapShot.forEach(async (subscription) => {
            setSubscription({
              role: subscription.data().role,
              current_period_start:
                subscription.data().current_period_start.seconds,
              current_period_end:
                subscription.data().current_period_end.seconds,
            });

            dispatch(
              setPlan({
                currentPlan: subscription.data().role,
              })
            );
          });
        })
        .catch((err) => {
          toast.error(err.message);
        });
    };

    init();
  }, [user.uid]);

  useEffect(() => {
    const init = async () => {
      // getting the products
      await db
        .collection("products")
        .where("active", "==", true)
        .get()
        .then(async (querySnapShot) => {
          const products = {};

          await querySnapShot.forEach(async (productDoc) => {
            products[productDoc.id] = productDoc.data();
            const priceSnap = await productDoc.ref.collection("prices").get();

            await priceSnap.forEach(async (price) => {
              products[productDoc.id].prices = {
                priceId: price.id,
                priceData: price.data(),
              };
            });
          });

          setProducts(products);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    };
    init();
  }, []);

  const loadCheckout = async (priceId) => {
    console.log("**@ loadCheckout called with priceId , ", priceId);

    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snapshot) => {
      console.log("**@ snapshot is , ", snapshot);
      const { error, sessionId } = snapshot.data();
      console.log("**@ error is , ", error);
      console.log("**@ sessionId is , ", sessionId);

      if (error) {
        toast.error(`An error occured ${error.message}`);
      }

      if (sessionId) {
        console.log("**@ REACT_APP_STRIPE_PUBLIC_KEY is , ", process.env);
        const stripe = await loadStripe(
          process.env.REACT_APP_STRIPE_PUBLIC_KEY
        );

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  console.log("**@ current subscription is , ", subscription);

  return (
    <div className="planScreen">
      <br />
      {subscription ? (
        <p>
          Renewal date :{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      ) : null}
      {Object.entries(products).map(([productId, productData]) => {
        // check if user's subscription is active
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "planScreen__plan--disabled"
            }  planScreen__plan`}
          >
            <div className="planSCreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() => {
                !isCurrentPackage && loadCheckout(productData?.prices?.priceId);
              }}
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
