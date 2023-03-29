import React, { useState, useEffect, useContext } from "react";
import { db } from "../../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import AuthContext from "../../context/Auth/AuthContext";
import { getProductsUsingProductIds } from "../../utils/utils";
import Loader from "../../components/UI/Loader/Loader";
import styles from "./OrdersPage.module.css";
import { toast } from "react-toastify";
import OrderTable from "../../components/OrderTable/OrderTable";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const getOrders = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "userOrders", user.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (!data) {
        return toast.error("No Orders Found!");
      }

      let promiseArray = [];

      data.orders.forEach((order) => {
        promiseArray.push(
          new Promise((resolve, reject) => {
            const data = getProductsUsingProductIds(order);
            if (data) resolve(data);
            else reject("Something went wrong");
          })
        );
      });

      const finalOrders = await Promise.all(promiseArray);
      setOrders(finalOrders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!loading && !orders.length)
    return <h1 style={{ textAlign: "center" }}>No Orders Found!</h1>;

  return (
    <div className={styles.ordersContainer}>
      <h1>Your Orders</h1>
      {orders.map((order, idx) => {
        return <OrderTable order={order} key={idx} />;
      })}
    </div>
  );
};

export default OrdersPage;
