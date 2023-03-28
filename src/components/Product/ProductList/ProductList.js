import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import ProductGrid from "../ProductGrid/ProductGrid";

const ProductList = ({
  products,
  style,
  onCart,
  removeProductFromCart,
  updateProductQuantity,
  filterProductFromState,
}) => {
  return (
    <ProductGrid style={{ ...style }}>
      {products.map((product, idx) => {
        return (
          <ProductCard
            product={product}
            key={idx}
            removeProductFromCart={removeProductFromCart}
            updateProductQuantity={updateProductQuantity}
            filterProductFromState={filterProductFromState}
            onCart={onCart}
          />
        );
      })}
    </ProductGrid>
  );
};

export default ProductList;
