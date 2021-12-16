import { useState } from "react";
import styles from "./styles.module.scss";
import { Button, NumberField } from "components";
import { useCart } from "hooks/shopify";
import { Sidebar } from "./Sidebar";

export function ProductContainer({ product }: any) {
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useCart();

  const handleAddItemToCart = async () => {
    const cart = await addItemToCart({
      quantity,
      merchandiseId: product?.merchandiseIds[0],
      key: "product",
      value: product?.title,
    });
		console.log({ cart })
  };

  return (
    <div className={styles.productContainer}>
      <Sidebar />
      <div className={styles.grid}>
        <img
          className={styles.image}
          src={product?.images[0]}
          alt={`Close up of ${product?.title}`}
        />
        <div className={styles.description}>
          <p className={styles.header}>001. </p>
          <p className={styles.header}>{product?.title}</p>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: product?.description }}
          />
					<div className={styles.row}>
						<p className={styles.price}>$35.00</p>
					</div>
          <div className={styles.row}>
            <NumberField
							id="quantity"
              aria-label="quantity"
              value={quantity}
              onChange={setQuantity}
            />
            <Button onPress={() => handleAddItemToCart()}>Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
