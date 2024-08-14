import {
  FC,
  useEffect,
  useRef,
  createContext,
  useState,
  ReactNode,
} from "react";
// import PropTypes from "prop-types";
import {
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useAlert } from "@hooks/alert";
import CONFIG from "@utils/contants/config";
import APIError from "@errors/APIError";

export type AlertContextType = {
  title?: string | null;
  message?: string | null;
  isLoading?: boolean;
  showAlert: (title: string, message: string) => void;
  showAlertMessage: (message: string) => void;
  showAlertError: (payload: unknown) => void;
  showLoading: () => void;
  clearAlert: () => void;
};

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined,
);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showAlert = (title: string, message: string) => {
    setTitle(title);
    setMessage(message);
    setIsLoading(false);
  };

  const showAlertMessage = (message: string) => {
    setTitle(null);
    setMessage(message);
    setIsLoading(false);
  };

  const showAlertError = (payload: unknown) => {
    let message: string = CONFIG.DEFAULT_ERROR_MESSAGE;

    if (payload instanceof APIError) {
      message = payload.message;
    }

    setTitle(null);
    setMessage(message);
    setIsLoading(false);
  };

  const showLoading = () => {
    setTitle(null);
    setMessage(null);
    setIsLoading(true);
  };

  const clearAlert = () => {
    setTitle(null);
    setMessage(null);
    setIsLoading(false);
  };

  return (
    <AlertContext.Provider
      value={{
        title,
        message,
        isLoading,
        showAlert,
        showAlertMessage,
        showAlertError,
        showLoading,
        clearAlert,
      }}
    >
      {children}
      <Alert />
    </AlertContext.Provider>
  );
};

export type AlertProps = {
  title?: string | null;
  message?: string | null;
  isLoading?: boolean;
  onConfirm?: () => void | null;
};

const Alert: FC = () => {
  const cancelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { title, message, isLoading, clearAlert } = useAlert();

  useEffect(() => {
    if (message || isLoading) {
      onOpen();
    } else {
      onClose();
    }
  }, [message, isLoading, onOpen, onClose]);

  const onCloseHandler = () => {
    clearAlert();
    onClose();
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            {...(isLoading && { textAlign: "center" })}
          >
            {isLoading ? "Loading..." : title || "Notification"}
          </AlertDialogHeader>

          <AlertDialogBody
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
            {isLoading && <Spinner size="xl" mb="8" />}
            {!isLoading && <Text>{message}</Text>}
          </AlertDialogBody>

          <AlertDialogFooter>
            {!isLoading && message && (
              <Button
                ref={cancelRef}
                colorScheme="teal"
                ml={3}
                onClick={onCloseHandler}
              >
                Okay!
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
