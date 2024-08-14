import { FC } from "react";
import PropTypes from "prop-types";
import { Box, Text, type BoxProps } from "@chakra-ui/react";

export type FooterProps = {
  styles?: BoxProps;
};

const Footer: FC<FooterProps> = ({ styles = {} }) => {
  const year = new Date().getFullYear();

  return (
    <Box {...styles} as="footer" textAlign="center">
      <Text>© Yusril A. P. {year} All rights reserved</Text>
    </Box>
  );
};

Footer.propTypes = {
  styles: PropTypes.object,
};

export default Footer;
