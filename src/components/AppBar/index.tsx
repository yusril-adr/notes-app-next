"use client";

import { useRef, FC, useMemo } from "react";
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

import { useAppSelector } from "@hooks/redux";

import AppLink from "@components/AppLink";
import ColorModeSwitcher from "@components/ColorModeSwitcher";
import Tooltip from "@components/Tooltip";
import { StateStatus } from "@utils/constants/enums";
import useLogout from "@hooks/logout";

export type AppBarProps = {
  transparent?: boolean;
  styles: ContainerProps;
};

const AppBar: FC<AppBarProps> = ({ transparent, styles }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerBtnRef = useRef<HTMLButtonElement>(null);
  const HomeIcon = useColorModeValue(RiHome4Line, RiHome4Fill);
  const NotesIcon = useColorModeValue(RiStickyNoteLine, RiStickyNoteFill);
  const authUser = useAppSelector((state) => state.authUser);

  const { logout } = useLogout();

  const user = useMemo(() => {
    if (authUser.status === StateStatus.SUCCESS) {
      return authUser.value;
    }

    return null;
  }, [authUser]);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      bg={transparent ? "transparent" : bgColor}
      zIndex="999"
    >
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
              as={AppLink}
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
              as={AppLink}
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
                      name={user?.username || user?.email}
                      src={
                        user?.profile_img ||
                        `https://ui-avatars.com/api/?background=random&name=${user?.username || user?.email}`
                      }
                      size="sm"
                    />
                  }
                  rightIcon={<RiArrowDownWideFill />}
                  variant="ghost"
                >
                  {user?.username || user?.email}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as={Button}
                    justifyContent="normal"
                    onClick={logout}
                  >
                    Log Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Then>

            <Else>
              <Button
                as={AppLink}
                href="/login"
                colorScheme="teal"
                variant="ghost"
                size={{
                  base: "xs",
                  md: "sm",
                }}
              >
                Log In
              </Button>

              <Button
                as={AppLink}
                href="/register"
                colorScheme="teal"
                variant="solid"
                size={{
                  base: "xs",
                  md: "sm",
                }}
              >
                Register
              </Button>
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
                    as={AppLink}
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
                    as={AppLink}
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
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      w="100%"
                      onClick={logout}
                    >
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
                        as={AppLink}
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
                        as={AppLink}
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
};

export default AppBar;
