import { OverlayContainer } from "@react-aria/overlays";
import { useRef } from "react";
import { useOverlay, usePreventScroll, useModal } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";

import styles from "./styles.module.scss";
import { useLayout } from "hooks";

export const HeaderDropdown = () => {
  const { setHeaderDropdown } = useLayout();
  return (
    <OverlayContainer>
      <DrawerModal isOpen isDismissable>
        <div className={styles.header}>
					<div onClick={() => setHeaderDropdown(false)}>❌</div>
          Header dropdown
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
