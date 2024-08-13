import { FC, useEffect, useRef } from "react";
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

export interface AlertProps {
  title?: string | null;
  message?: string | null;
  isLoading?: boolean;
  onConfirm?: () => void | null;
}

const Alert: FC<AlertProps> = ({
  title = "Notification",
  message,
  isLoading = false,
  onConfirm = null,
}) => {
  const cancelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (message || isLoading) {
      onOpen();
    } else {
      onClose();
    }
  }, [message, isLoading, onOpen, onClose]);

  const onCloseHandler = () => {
    onClose();
    if (onConfirm) {
      onConfirm();
    }
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
            {isLoading ? "Loading..." : title}
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
                colorScheme="blue"
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

// Alert.propTypes = {
//   /** The title of the modal header. */
//   title: PropTypes.string,
//   /** The message in the modal body. */
//   message: PropTypes.string,
//   /** if true, only showing spinner from chakra ui,
//       Any title and message props are ignored.
//   */
//   isLoading: PropTypes.bool,
//   /** Action when the CTA button is clicked.  */
//   onConfirm: PropTypes.func,
// };

export default Alert;
