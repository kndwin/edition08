import Link from "next/link";
import { OverlayContainer } from "@react-aria/overlays";
import { useRef } from "react";
import { useOverlay, usePreventScroll, useModal } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";

import styles from "./styles.module.scss";
import { useLayout } from "hooks";

export const HeaderDropdown = () => {
  const options = [
    { label: "About", href: "/about" },
    { label: "Shop", href: "/shop" },
    { label: "Journal", href: "/journal" },
  ];
  return (
    <OverlayContainer>
      <DrawerModal isOpen isDismissable>
        <div
          onMouseDown={(e: any) => {
            e.stopPropagation();
          }}
          className={styles.header}
        >
          {options?.map(({ label, href }) => (
            <Link href={href}>
              <p className={styles.label}>{label}</p>
            </Link>
          ))}
        </div>
      </DrawerModal>
    </OverlayContainer>
  );
};

const DrawerModal = (props: any) => {
  let { title, children } = props;
  let ref = useRef(null);
  const { setHeaderDropdown } = useLayout();
  let { overlayProps, underlayProps } = useOverlay(props, ref);
  usePreventScroll();
  let { modalProps } = useModal();
  let { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div
      {...underlayProps}
      className={styles.drawerOverlay}
      onMouseDown={() => {
        setHeaderDropdown({ isOpen: false });
      }}
    >
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
