"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Hide,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Show,
  SkipNavContent,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Lottie from "lottie-react";

import notesLottie from "@utils/libs/lottie/notes.json";
import AppBar from "@components/AppBar";
import Footer from "@components/Footer";
import { CONFIG } from "@utils/contants/config";
import {
  RiEyeFill,
  RiEyeLine,
  RiEyeOffFill,
  RiEyeOffLine,
} from "react-icons/ri";
import Link from "next/link";

export default function Login(): React.ReactNode {
  const [showPass, setShowPass] = useState(false);
  const bgColor = useColorModeValue("teal.400", "teal.500");
  const EyeIcon = useColorModeValue(RiEyeLine, RiEyeFill);
  const EyeOffIcon = useColorModeValue(RiEyeOffLine, RiEyeOffFill);

  const toggleShow = (
    val: boolean,
    handler: React.Dispatch<React.SetStateAction<boolean>>
  ): void => handler(!val);

  return (
    <>
      <Container
        as="main"
        pos="relative"
        maxW="8xl"
        minH={CONFIG.MIN_BODY_HEIGHT}
      >
        <Show above="md">
          <Box
            position="absolute"
            top="0"
            right="0"
            bgColor={bgColor}
            w="50%"
            h="100%"
          />
        </Show>

        <AppBar transparent styles={{ maxW: "8xl", bgColor: "transparent" }} />
        <Grid
          minH={`calc(${CONFIG.MIN_BODY_HEIGHT} + ${CONFIG.FOOTER_HEIGHT} )`}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
        >
          <Show above="md">
            <GridItem
              display="flex"
              flexDir="column"
              justifyContent="center"
              ps="2"
              pe="6"
            >
              <Box
                as={Lottie}
                mx="auto"
                maxW="500px"
                animationData={notesLottie}
                loop
              />

              <Show above="md">
                <Footer styles={{ mt: 8 }} />
              </Show>
            </GridItem>
          </Show>

          <GridItem
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            gap="4"
          >
            <SkipNavContent />

            <Card
              w={{
                base: "320px",
                sm: "360px",
              }}
            >
              <CardHeader pb="0">
                <Heading size="lg" textAlign="center">
                  Log In
                </Heading>
              </CardHeader>

              <CardBody>
                <form action="">
                  <Stack spacing="4">
                    <FormControl>
                      <FormLabel>Email or Username</FormLabel>
                      <Input type="text" placeholder="John Doe" />
                      {/* <FormErrorMessage>{errors.password}</FormErrorMessage> */}
                    </FormControl>

                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          // {...field}
                          type={showPass ? "text" : "password"}
                          placeholder="Password"
                        />
                        <InputRightElement>
                          <IconButton
                            title={showPass ? "Hide password" : "show Password"}
                            aria-label={
                              showPass ? "Hide password" : "show Password"
                            }
                            icon={showPass ? <EyeIcon /> : <EyeOffIcon />}
                            onClick={() => toggleShow(showPass, setShowPass)}
                          />
                        </InputRightElement>
                      </InputGroup>
                      {/* <FormErrorMessage>{errors.password}</FormErrorMessage> */}
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="teal"
                      mt="2"
                      // isLoading={isSubmitting || isLoading}
                      // disabled={isSubmitting || isLoading}
                    >
                      Log in
                    </Button>
                  </Stack>
                </form>
              </CardBody>
            </Card>

            <Card
              w={{
                base: "320px",
                sm: "360px",
              }}
            >
              <CardBody textAlign="center">
                <Text>
                  {"Don't have an account? "}
                  <ChakraLink
                    as={Link}
                    href="/register"
                    fontWeight="bold"
                    textColor="teal"
                  >
                    Register
                  </ChakraLink>
                </Text>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Container>

      <Hide above="md">
        <Footer styles={{ my: "8" }} />
      </Hide>
    </>
  );
}
