import { OverlayContainer } from "@react-aria/overlays";
import { useRef } from "react";
import { useOverlay, usePreventScroll, useModal } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";

import Cross from "public/cross.svg";

import { useCartDrawer } from "hooks/components/useCartDrawer";
import styles from "./styles.module.scss";
import { useCart } from "hooks/shopify";
import { Button } from "components";

export const CartModal = () => {
  const { setIsOpen } = useCartDrawer();
  const { cart, removeItemFromCart } = useCart();

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
            <Cross className={styles.close} onClick={() => setIsOpen(false)} />
          </div>
          <p className={styles.title}>Your Shopping Bag</p>
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
                        <p>Qty. {quantity}</p>
                        <p>$ {price}</p>
                      </div>
                    </div>
                    <div
                      className={styles.remove}
                      onClick={() => removeItem(merchandiseId)}
                    >
                      Remove
                    </div>
                  </div>
                )
              )}
            </div>
            <div className={styles.bottomOfDrawer}>
              <div className={styles.subtotal}>
                <label className={styles.label}>SUBTOTAL</label>
								{!!cart?.subtotal && (
									<p className={styles.amount}>{cart?.subtotal}</p>
								)}
              </div>
              <Button
                className={styles.checkoutButton}
                onClick={() => window.location.assign(cart?.checkoutUrl)}
              >
                Proceed to Checkout
              </Button>
              <p className={styles.continue}>Continue shopping</p>
            </div>
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
