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
  ContainerProps,
  GridItem,
  Grid,
  DrawerFooter,
} from "@chakra-ui/react";
import {
  RiArrowDownWideFill,
  RiHome4Fill,
  RiHome4Line,
  RiMenuFill,
  RiStickyNoteFill,
  RiStickyNoteLine,
} from "react-icons/ri";
import { Else, If, Then } from "react-if";

// Components
import ColorModeSwitcher from "../ColorModeSwitcher";
import Tooltip from "../Tooltip";

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
  const HomeIcon = useColorModeValue(RiHome4Line, RiHome4Fill);
  const NotesIcon = useColorModeValue(RiStickyNoteLine, RiStickyNoteFill);
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

        <Box
          display={{ base: "none", lg: "flex" }}
          alignItems="center"
          columnGap="1"
        >
          <Tooltip label="Home">
            <IconButton
              as={Link}
              href="/"
              size="md"
              fontSize="lg"
              aria-label="Home"
              title="Home"
              variant="ghost"
              color="current"
              icon={<HomeIcon />}
            />
          </Tooltip>

          <Tooltip label="My Notes">
            <IconButton
              as={Link}
              href="/notes"
              size="md"
              fontSize="lg"
              aria-label="My Notes"
              title="My Notes"
              variant="ghost"
              color="current"
              icon={<NotesIcon />}
            />
          </Tooltip>

          <ColorModeSwitcher />

          <If condition={!!user}>
            <Then>
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={
                    <Avatar
                      name={user?.email}
                      src={`https://ui-avatars.com/api/?background=random&name=${user?.email}`}
                      size="sm"
                    />
                  }
                  rightIcon={<RiArrowDownWideFill />}
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
            </Then>

            <Else>
              <Link href={`/login`}>
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  size={{
                    base: "xs",
                    md: "sm",
                  }}
                >
                  Log In
                </Button>
              </Link>

              <Link href={`/register`}>
                <Button
                  colorScheme="teal"
                  variant="solid"
                  size={{
                    base: "xs",
                    md: "sm",
                  }}
                >
                  Register
                </Button>
              </Link>
            </Else>
          </If>
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
              <Grid templateColumns="repeat(2, 1fr)" gap="2" onClick={onClose}>
                <GridItem>
                  <Button
                    as={Link}
                    href="/"
                    variant="outline"
                    w="100%"
                    leftIcon={<HomeIcon />}
                  >
                    Home
                  </Button>
                </GridItem>

                <GridItem>
                  <Button
                    as={Link}
                    href="/notes"
                    variant="outline"
                    w="100%"
                    leftIcon={<NotesIcon />}
                  >
                    My Notes
                  </Button>
                </GridItem>
              </Grid>
            </DrawerBody>

            <DrawerFooter>
              <If condition={!!user}>
                <Then>
                  <Box w="100%" onClick={onClose}>
                    <Button colorScheme="blue" variant="outline" w="100%">
                      Log Out
                    </Button>
                  </Box>
                </Then>
                <Else>
                  <Grid
                    templateColumns="repeat(2, 1fr)"
                    width="100%"
                    gap="2"
                    onClick={onClose}
                  >
                    <GridItem>
                      <Button
                        as={Link}
                        href="/login"
                        colorScheme="teal"
                        variant="outline"
                        w="100%"
                      >
                        Log In
                      </Button>
                    </GridItem>

                    <GridItem>
                      <Button
                        as={Link}
                        href="/register"
                        colorScheme="teal"
                        variant="solid"
                        w="100%"
                      >
                        Register
                      </Button>
                    </GridItem>
                  </Grid>
                </Else>
              </If>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Container>
    </Box>
  );
}
