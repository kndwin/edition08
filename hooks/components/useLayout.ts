import { makeVar, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";

const layoutVar = makeVar({
  isHeaderDropdownOpen: false,
});

export function useLayout() {
  const { isHeaderDropdownOpen } = useReactiveVar(layoutVar);
  const toggleHeaderDropdown = () => {
    layoutVar({
      ...layoutVar(),
      isHeaderDropdownOpen: !isHeaderDropdownOpen,
    });
  };
  const setHeaderDropdown = ({ isOpen }: { isOpen: boolean }) => {
    layoutVar({
      ...layoutVar(),
      isHeaderDropdownOpen: isOpen,
    });
  };

  useEffect(() => {
    console.log({ isHeaderDropdownOpen });
  }, [isHeaderDropdownOpen]);

  return {
    isHeaderDropdownOpen,
    setHeaderDropdown,
    toggleHeaderDropdown,
  };
}
