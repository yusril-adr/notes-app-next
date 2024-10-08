/* eslint-disable prettier/prettier */
import { FC, forwardRef, ReactNode } from "react";
import { Box, BoxProps, Tooltip as TooltipChakra } from "@chakra-ui/react";

const ToolTipRef = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...rest }, ref) => (
    <Box ref={ref} {...rest}>
      {children}
    </Box>
  ),
);

ToolTipRef.displayName = "ToolTipRef";

export type TooltipProps = {
  children: ReactNode[] | ReactNode;
  label: string;
};

const Tooltip: FC<TooltipProps> = ({ children, label }) => {
  return (
    <TooltipChakra label={label}>
      <ToolTipRef>{children}</ToolTipRef>
    </TooltipChakra>
  );
};

export default Tooltip;
