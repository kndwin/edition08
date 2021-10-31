import { OverlayContainer } from "@react-aria/overlays";
import { useRef } from "react";
import { useOverlay, usePreventScroll, useModal } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import Image from "next/image";

import { useCartDrawer } from "hooks/components/useCartDrawer";
import styles from "./styles.module.scss";
import { useCart } from "hooks/shopify";
import { NumberField } from "components/common/NumberField";

export const CartModal = () => {
  const { setIsOpen } = useCartDrawer();
  const { cart } = useCart();

  console.log({ cart });

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
              {cart?.items?.map(({ image, title, price, quantity }) => (
                <div className={styles.itemWrapper}>
                  <img src={image} className={styles.image} />
                  <div className={styles.description}>
                    <h4 className={styles.title}>{title}</h4>
                    <div className={styles.priceAndQuantity}>
                      <NumberField
												className={styles.quantity}
                        aria-label={`Quantity of ${title}`}
                        value={quantity}
                        onChange={(e) => console.log(e)}
                      />
                      <p>$ {price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.checkout}>{cart?.subtotal}</div>
          </div>
        </div>
      </DrawerModal>
    </OverlayContainer>
  );
};

const DrawerModal = (props: any) => {
  let { title, children } = props;

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  let ref = useRef(null);
  let { overlayProps, underlayProps } = useOverlay(props, ref);

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();
  let { modalProps } = useModal();

  // Get props for the dialog and its title
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
