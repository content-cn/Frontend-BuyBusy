import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./HomePage.module.css";
import Loader from "../../components/UI/Loader/Loader";
import ProductList from "../../components/Product/ProductList/ProductList";
import ProductsContext from "../../context/Products/ProductsContext";
// import { getAuth } from "firebase/auth";
// import { addDataToCollection } from "../../utils/utils";

function HomePage() {
  const [priceRange, setPriceRange] = useState(75000);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState({
    mensFashion: false,
    electronics: false,
    jewelery: false,
    womensClothing: false,
  });

  const {
    products,
    loading,
    getAllProducts,
    filteredProducts,
    filterProducts,
  } = useContext(ProductsContext);

  useEffect(() => {
    getAllProducts();
    // addDataToCollection();
  }, []);

  useEffect(() => {
    filterProducts({ priceRange, searchQuery: query, categories });
  }, [priceRange, query, categories]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.homePageContainer}>
      <aside className={styles.filterContainer}>
        <h2>Filter</h2>
        <form>
          <label htmlFor="price">Price: {priceRange}</label>
          <input
            type="range"
            id="price"
            name="price"
            min="1"
            max="100000"
            className={styles.priceRange}
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            step="10"
          />
          <h2>Category</h2>
          <div className={styles.categoryContainer}>
            <div className={styles.inputContainer}>
              <input
                type="checkbox"
                id="mensFashion"
                name="mensFashion"
                onChange={(e) =>
                  setCategories((prevCategories) => ({
                    ...prevCategories,
                    mensFashion: e.target.checked,
                  }))
                }
              />
              <label htmlFor="mensFashion">Men's Clothing</label>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="checkbox"
                id="womensFashion"
                name="womensFashion"
                onChange={(e) =>
                  setCategories((prevCategories) => ({
                    ...prevCategories,
                    womensFashion: e.target.checked,
                  }))
                }
              />
              <label htmlFor="womensFashion">Women's Clothing</label>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="checkbox"
                id="jewelery"
                name="jewelery"
                onChange={(e) =>
                  setCategories((prevCategories) => ({
                    ...prevCategories,
                    jewelery: e.target.checked,
                  }))
                }
              />
              <label htmlFor="jewelery">Jewelery</label>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="checkbox"
                id="electronics"
                name="electronics"
                onChange={(e) =>
                  setCategories((prevCategories) => ({
                    ...prevCategories,
                    electronics: e.target.checked,
                  }))
                }
              />
              <label htmlFor="electronics">Electronics</label>
            </div>
          </div>
        </form>
      </aside>
      <form className={styles.form}>
        <input
          type="search"
          placeholder="Search By Name"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {products.length ? (
        <ProductList products={products.length ? filteredProducts : null} />
      ) : null}
    </div>
  );
}

export default HomePage;
