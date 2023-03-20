import React, { useState, useContext } from "react";
import styles from "./ProductDetails.module.css";
import { toast } from "react-toastify";
import AuthContext from "../../../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ title, price, productId, onCart }) => {
  const [productAddingToCart, setProductAddingToCart] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const addProductToCart = async () => {
    setProductAddingToCart(true);
    if (!user) {
      return navigate("/signin");
    }

    try {
      toast.success(productId);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProductAddingToCart(false);
    }
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.productName}>
        <p>{`${title.slice(0, 25)}...`}</p>
      </div>
      <div className={styles.productOptions}>
        <p>₹ {price}</p>
      </div>
      {!onCart ? (
        <button
          className={styles.addBtn}
          title="Add to Cart"
          onClick={addProductToCart}
        >
          {productAddingToCart ? "Adding" : "Add To Cart"}
        </button>
      ) : null}
    </div>
  );
};

export default ProductDetails;
