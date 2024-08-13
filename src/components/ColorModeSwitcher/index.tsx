import { FC, ReactNode } from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  type ButtonProps,
} from "@chakra-ui/react";
import { RiMoonLine, RiSunFill } from "react-icons/ri";
import Tooltip from "@components/Tooltip";

export interface ColorModeSwitcherProps {
  styles?: ButtonProps;
}

const ColorModeSwitcher: FC<ColorModeSwitcherProps> = ({ styles }) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(RiMoonLine, RiSunFill);

  return (
    <Tooltip label={`Switch to ${text} mode`}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${text} mode`}
        variant="ghost"
        color="current"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        {...styles}
      />
    </Tooltip>
  );
};

export default ColorModeSwitcher;
