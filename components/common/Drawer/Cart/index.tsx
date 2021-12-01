import { OverlayContainer } from "@react-aria/overlays";
import { useRef } from "react";
import { useOverlay, usePreventScroll, useModal } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";

import { useCartDrawer } from "hooks/components/useCartDrawer";
import styles from "./styles.module.scss";
import { useCart } from "hooks/shopify";
import { NumberField, Button } from "components";

export const CartModal = () => {
  const { setIsOpen } = useCartDrawer();
  const { cart, removeItemFromCart } = useCart();

  // console.log({ cart });
  const changeItemQuanityHandler = (event: Event) => {
    console.log(event);
  };

  const removeItem = async (merchandiseId: string) => {
    await removeItemFromCart({ merchandiseId });
  };

  return (
    <OverlayContainer>
      <DrawerModal
        title="Cart"
        isOpen
        onClose={() => setIsOpen(false)}
        isDismissable
      >
        <div className={styles.cart}>
          <div className={styles.titleWrapper}>
            <h3>Cart</h3>
            <div className={styles.close} onClick={() => setIsOpen(false)}>
              ❌
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.cartItems}>
              {cart?.items?.map(
                ({
                  merchandiseId,
                  productVariantId,
                  image,
                  title,
                  price,
                  quantity,
                }) => (
                  <div className={styles.itemWrapper}>
                    <img src={image} className={styles.image} />
                    <div className={styles.description}>
                      <div className={styles.itemTitleWrapper}>
                        <h4 className={styles.title}>{title}</h4>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => removeItem(merchandiseId)}
                        >
                          ❌
                        </div>
                      </div>
                      <div className={styles.priceAndQuantity}>
                        <NumberField
                          className={styles.quantity}
                          aria-label={`Quantity of ${title}`}
                          value={quantity}
                          onChange={(e: Event) => changeItemQuanityHandler(e)}
                        />
                        <p>$ {price}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className={styles.checkout}>{cart?.subtotal}</div>
            <Button onClick={() => window.location.assign(cart?.checkoutUrl)}>
              Checkout
            </Button>
          </div>
        </div>
      </DrawerModal>
    </OverlayContainer>
  );
};

const DrawerModal = (props: any) => {
  let { title, children } = props;
  let ref = useRef(null);
  let { overlayProps, underlayProps } = useOverlay(props, ref);
  usePreventScroll();
  let { modalProps } = useModal();
  let { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div className={styles.drawerOverlay} {...underlayProps}>
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          className={styles.drawer}
          ref={ref}
        >
          {children}
        </div>
      </FocusScope>
    </div>
  );
};
