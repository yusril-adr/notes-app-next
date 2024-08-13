"use client";

import { Children, FC, ReactNode, useMemo } from "react";

import Alert from "@components/Alert";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { unsetAlert } from "@states/alertMessage";

const GlobalLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const dispatch = useAppDispatch();
  const alertMessage = useAppSelector((state) => state.alertMessage.value);
  const {
    title,
    message,
    isLoading: alertLoading,
  } = useMemo(() => alertMessage, [alertMessage]);

  const handleAlertConfirm = () => {
    dispatch(unsetAlert());
  };

  return (
    <>
      {children}
      <Alert
        title={title}
        message={message}
        isLoading={alertLoading}
        onConfirm={handleAlertConfirm}
      />
    </>
  );
};

export default GlobalLayout;
