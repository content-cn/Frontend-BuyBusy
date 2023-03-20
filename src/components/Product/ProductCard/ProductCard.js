import React from "react";
import ProductContainer from "../ProductContainer/ProductContainer";
import ProductDetails from "../ProductContainer/ProductDetails/ProductDetails";
import ProductImage from "../ProductContainer/ProductImage/ProductImage";

const ProductCard = ({
  product: { title, price, image, id },
  onOwnPage,
  onCart,
}) => {
  return (
    <ProductContainer>
      <ProductImage image={image} />
      <ProductDetails
        title={title}
        price={price}
        onOwnPage={onOwnPage}
        productId={id}
        onCart={onCart}
      />
    </ProductContainer>
  );
};

export default ProductCard;
