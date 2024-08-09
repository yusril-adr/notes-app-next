/* eslint-disable prettier/prettier */
import { forwardRef, ReactNode } from "react";
import { Box, BoxProps, Tooltip as TooltipChakra } from "@chakra-ui/react";

const ToolTipRef = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...rest }, ref) => (
    <Box ref={ref} {...rest}>
      {children}
    </Box>
  )
);

ToolTipRef.displayName = "ToolTipRef";

export interface TooltipProps {
  children: ReactNode[];
  label: string;
}

export default function Tooltip({ children, label }: TooltipProps): ReactNode {
  return (
    <TooltipChakra label={label}>
      <ToolTipRef>{children}</ToolTipRef>
    </TooltipChakra>
  );
}
