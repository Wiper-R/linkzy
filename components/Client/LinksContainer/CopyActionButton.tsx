"use client";

import { BiCopy } from "react-icons/bi";
import ActionButton from "./ActionButton";
import useAlert from "@/hooks/useAlert";

const CopyActionButton = ({ shortenUrl }: { shortenUrl: string }) => {
  const { setAlert } = useAlert();
  return (
    <ActionButton
      icon={<BiCopy />}
      text="Copy"
      onClick={() => {
        navigator.clipboard.writeText(shortenUrl);
        setAlert({ message: "Copied url to clipboard.", type: "success" });
      }}
    />
  );
};

export default CopyActionButton;
