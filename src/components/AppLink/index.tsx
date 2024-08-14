import { FC, ReactNode } from "react";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/next-js";
import Link from "next/link";

const AppLink: FC<
  ChakraLinkProps & {
    children: ReactNode;
  }
> = ({ children, ...props }) => (
  <ChakraLink as={Link} {...props}>
    {children}
  </ChakraLink>
);

export default AppLink;
