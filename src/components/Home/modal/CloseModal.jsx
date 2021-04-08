import { useContext } from "react";
import { ModalContext } from "../../../contexts/ModalContext";

export default function CloseModal({ modal }) {
  const { deactivateModal } = useContext(ModalContext);

  return (
    <>
      <button onClick={() => deactivateModal(modal)} className="closeButton">
        X
      </button>{" "}
    </>
  );
}
