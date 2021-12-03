import React, { ReactElement } from "react";
import { Button } from "components";

export interface DropdownButtonProps {
}

export function DropdownButton(
  props: DropdownButtonProps
): ReactElement | null {
  return <Button>[-]</Button>;
}
