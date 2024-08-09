import {
  useColorMode,
  useColorModeValue,
  Button,
  type ButtonProps,
} from "@chakra-ui/react";
import { RiMoonLine, RiSunFill } from "react-icons/ri";

interface ColorModeSwitcherProps {
  styles?: ButtonProps;
}

export default function ColorModeSwitcher({ styles }: ColorModeSwitcherProps) {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("Dark", "Light");
  const SwitchIcon = useColorModeValue(RiMoonLine, RiSunFill);

  return (
    <Button
      size="md"
      fontSize="lg"
      aria-label={`${text} Mode`}
      title={`${text} Mode`}
      variant="ghost"
      color="current"
      onClick={toggleColorMode}
      leftIcon={<SwitchIcon />}
      {...styles}
    >
      Switch to {text} Mode
    </Button>
  );
}
