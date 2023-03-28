import React, { useState, useEffect, useContext } from "react";
import { db } from "../../config/firebase";
import { getDoc, doc } from "firebase/firestore";
import AuthContext from "../../context/Auth/AuthContext";
import { getProductsUsingProductIds } from "../../utils/utils";
import Loader from "../../components/UI/Loader/Loader";
import styles from "./OrdersPage.module.css";
import { toast } from "react-toastify";

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

  const convertDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
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
        return (
          <div key={idx} style={{ textAlign: "center", marginTop: "2rem" }}>
            {order[0].date && (
              <h2>Ordered On:- {convertDate(order[0].date)}</h2>
            )}
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {order.map((product, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{product.title.slice(0, 25) + "..."}</td>
                      <td>{`₹ ${product.price} `}</td>
                      <td>{`${product.quantity} `}</td>
                      <td>{`₹ ${product.quantity * product.price}`}</td>
                    </tr>
                  );
                })}
                <tr></tr>
              </tbody>
              <tr className={styles.totalPrice}>
                <td>
                  {`₹ ${order.reduce((acc, currentProduct) => {
                    return acc + currentProduct.price * currentProduct.quantity;
                  }, 0)}`}
                </td>
              </tr>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersPage;
