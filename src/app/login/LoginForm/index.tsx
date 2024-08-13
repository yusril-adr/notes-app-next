import {
  Button,
  Card,
  CardProps,
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
import { useState, FC, Dispatch, SetStateAction } from "react";
import {
  RiEyeFill,
  RiEyeLine,
  RiEyeOffFill,
  RiEyeOffLine,
} from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";

import LoginSchema from "./schema";
import { z } from "zod";
export interface LoginFormProps {
  styles?: CardProps;
}

type FormData = z.infer<typeof LoginSchema>;

const LoginForm: FC<LoginFormProps> = ({ styles = {} }) => {
  const [showPass, setShowPass] = useState(false);
  const EyeIcon = useColorModeValue(RiEyeLine, RiEyeFill);
  const EyeOffIcon = useColorModeValue(RiEyeOffLine, RiEyeOffFill);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
  });
  const onSubmit: SubmitHandler<FormData> = handleSubmit((data) =>
    setError("password", { type: "manual", message: "invalid" })
  );

  const toggleShow = (
    val: boolean,
    handler: Dispatch<SetStateAction<boolean>>
  ): void => handler(!val);

  return (
    <Card {...styles}>
      <CardHeader pb="0">
        <Heading size="lg" textAlign="center">
          Log In
        </Heading>
      </CardHeader>

      <CardBody>
        <Stack as="form" spacing="4" onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.identifier}>
            <FormLabel>Email or Username</FormLabel>
            <Input
              type="text"
              placeholder="John Doe"
              {...register("identifier")}
            />
            <ErrorMessage
              errors={errors}
              name="identifier"
              render={({ message }) => (
                <FormErrorMessage>{message}</FormErrorMessage>
              )}
            />
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
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
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <FormErrorMessage>{message}</FormErrorMessage>
              )}
            />
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
      </CardBody>
    </Card>
  );
};

export default LoginForm;
