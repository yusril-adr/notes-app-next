import { ReactNode } from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  type ButtonProps,
} from "@chakra-ui/react";
import { RiMoonLine, RiSunFill } from "react-icons/ri";

export interface ColorModeSwitcherProps {
  styles?: ButtonProps;
}

export default function ColorModeSwitcher({
  styles,
}: ColorModeSwitcherProps): ReactNode {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(RiMoonLine, RiSunFill);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...styles}
    />
  );
}
