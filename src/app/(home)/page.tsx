"use client";

import {
  Flex,
  Image,
  Heading,
  Text,
  Code,
  useColorModeValue,
} from "@chakra-ui/react";
import ColorModeSwitcher from "@components/ColorModeSwitcher";
import { motion } from "framer-motion";
import React from "react";

export default function Home(): React.ReactNode {
  const bgColor = useColorModeValue("gray.300", "gray.600");
  return (
    <Flex
      as="main"
      bg={bgColor}
      color="white"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
    >
      <motion.div
        animate={{
          scale: [1, 0.5, 0.5, 1, 1],
          rotateY: [0, 0, 180, 180, 360],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <Image src="/chakra.svg" alt="logo" w="250px" h="250px" mb="8" />
      </motion.div>
      <Heading as="h1">Chakra UI + Next JS</Heading>
      <Text>
        Edit in <Code colorScheme="teal">src/app/(home)/page.tsx</Code>
      </Text>
      <ColorModeSwitcher styles={{ mt: 4 }} />
    </Flex>
  );
}
