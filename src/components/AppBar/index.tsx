"use client";

import { useRef, ReactNode } from "react";
import { Link } from "@chakra-ui/next-js";
import {
  useColorModeValue,
  useDisclosure,
  Container,
  Box,
  Heading,
  Avatar,
  Text,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  ContainerProps,
} from "@chakra-ui/react";
import { RiArrowDownWideFill, RiMenuFill } from "react-icons/ri";

// Components
import ColorModeSwitcher from "../ColorModeSwitcher";

// Services

type User = null | {
  email?: string;
};

interface AppBarProps {
  styles: ContainerProps;
}

export default function AppBar({ styles }: AppBarProps): ReactNode {
  const bgColor = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerBtnRef = useRef<HTMLButtonElement>(null);
  const user: User = null;

  return (
    <Box as="header" position="sticky" top="0" bg={bgColor} zIndex="999">
      <Container
        fontSize="xl"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={3}
        width="100%"
        {...styles}
      >
        <Heading as="h1" size={["md", "lg"]}>
          Notes
        </Heading>

        <Box display={{ base: "none", lg: "flex" }} alignItems="center">
          {user && (
            <>
              <Avatar
                name={user?.email}
                src={`https://ui-avatars.com/api/?background=random&name=${user?.email}`}
              />
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<RiArrowDownWideFill />}
                  ms={[1, 2]}
                  variant="ghost"
                >
                  {user?.email}
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} href="/logout">
                    Log Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}

          <ColorModeSwitcher styles={{ ms: 2 }} />
        </Box>

        <IconButton
          display={{ base: "flex", lg: "none" }}
          size="md"
          fontSize="lg"
          aria-label="Toggle Drawer"
          variant="ghost"
          color="current"
          marginLeft="2"
          onClick={onOpen}
          icon={<RiMenuFill />}
          ref={drawerBtnRef}
        />

        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={drawerBtnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text>Menu</Text>
              <ColorModeSwitcher styles={{ me: 6 }} />
            </DrawerHeader>
            <DrawerBody>
              <List spacing={3}>
                {user && (
                  <ListItem>
                    <Button variant="ghost" as={Link} href="/logout">
                      Log Out
                    </Button>
                  </ListItem>
                )}
              </List>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Container>
    </Box>
  );
}
