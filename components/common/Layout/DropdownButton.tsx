import React, { ReactElement } from "react";
import { Button } from "components";

export function DropdownButton(props: any): ReactElement | null {
  return <Button {...props}>[-]</Button>;
}
