"use client";

import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Show,
  SkipNavContent,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import Lottie from "lottie-react";

import AppLink from "@components/AppLink";
import Footer from "@components/Footer";
import CONFIG from "@utils/constants/config";
import notesLottie from "@utils/libs/lottie/notes.json";

import LoginForm from "./LoginForm";

const Login: FC = () => {
  return (
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

        <LoginForm
          styles={{
            w: {
              base: "320px",
              sm: "360px",
            },
          }}
        />

        <Card
          w={{
            base: "320px",
            sm: "360px",
          }}
        >
          <CardBody textAlign="center">
            <Text>
              {"Don't have an account? "}
              <AppLink href="/register" fontWeight="bold" textColor="teal">
                Register
              </AppLink>
            </Text>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default Login;
