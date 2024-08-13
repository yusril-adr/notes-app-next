import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, FC } from "react";
import {
  RiEyeFill,
  RiEyeLine,
  RiEyeOffFill,
  RiEyeOffLine,
} from "react-icons/ri";

const LoginForm: FC = () => {
  const [showPass, setShowPass] = useState(false);
  const EyeIcon = useColorModeValue(RiEyeLine, RiEyeFill);
  const EyeOffIcon = useColorModeValue(RiEyeOffLine, RiEyeOffFill);

  return (
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
                    aria-label={showPass ? "Hide password" : "show Password"}
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
  );
};

export default LoginForm;
