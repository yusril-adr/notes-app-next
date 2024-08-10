import { ReactNode } from "react";
import PropTypes from "prop-types";
import { Box, Text, type BoxProps } from "@chakra-ui/react";

export interface FooterProps {
  styles: BoxProps;
}

function Footer({ styles }: FooterProps): ReactNode {
  const year = new Date().getFullYear();

  return (
    <Box {...styles} as="footer" textAlign="center">
      <Text>© Yusril A. P. {year} All rights reserved</Text>
    </Box>
  );
}

Footer.defaultProps = {
  styles: {},
};

Footer.propTypes = {
  styles: PropTypes.object,
};

export default Footer;
