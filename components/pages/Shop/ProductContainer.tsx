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
        <div>
          <h1>{product?.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: product?.description }} />
          <div className={styles.row}>
            <NumberField
              aria-label="Quantity"
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
