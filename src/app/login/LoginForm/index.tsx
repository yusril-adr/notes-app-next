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
import { useState, FC, Dispatch, SetStateAction, useMemo } from "react";
import {
  RiEyeFill,
  RiEyeLine,
  RiEyeOffFill,
  RiEyeOffLine,
} from "react-icons/ri";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";

import LoginSchema from "./schema";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { login } from "@states/auth";
import { StateStatus } from "@utils/constants/enums";
import { AxiosError } from "axios";
import AuthenticationError from "@errors/AuthenticationError";
import { useLoadingBar } from "@hooks/loadingBar";
import { useAlert } from "@hooks/alert";

export type LoginFormProps = {
  styles?: CardProps;
};

type FormDataType = z.infer<typeof LoginSchema>;

const LoginForm: FC<LoginFormProps> = ({ styles = {} }) => {
  const [showPass, setShowPass] = useState(false);
  const EyeIcon = useColorModeValue(RiEyeLine, RiEyeFill);
  const EyeOffIcon = useColorModeValue(RiEyeOffLine, RiEyeOffFill);
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.authUser);
  const loadingBar = useLoadingBar();
  const { showAlertMessage, showAlertError } = useAlert();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // setError,
  } = useForm<FormDataType>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      loadingBar.start();
      const resultAction = await dispatch(login(data));
      loadingBar.complete();

      if (login.fulfilled.match(resultAction)) {
        showAlertMessage("Log In Success.");
        reset();
        router.push("/");
      } else {
        const payload = resultAction.payload;
        if (payload instanceof AxiosError) {
          let error = resultAction.payload;

          if (payload.response?.status === 401) {
            error = new AuthenticationError(
              "Username/Email doesn't exist or your password is not match",
            );
          }

          showAlertError(error);
        } else {
          throw resultAction.error;
        }
      }
    } catch (error) {
      showAlertError(error);
    }
  });

  const toggleShow = (
    val: boolean,
    handler: Dispatch<SetStateAction<boolean>>,
  ): void => handler(!val);

  const isLoading = useMemo(
    () => authUser.status === StateStatus.PENDING,
    [authUser],
  );

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

          <Button type="submit" colorScheme="teal" mt="2" isLoading={isLoading}>
            Log in
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
