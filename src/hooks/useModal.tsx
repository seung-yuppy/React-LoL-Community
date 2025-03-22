import { useState } from "react";

type IModal = {
  [key: string]: boolean,
}

const useModal = () => {
  const [modals, setModals] = useState<IModal>({});

  const openModal = (key: string) => {
    setModals(prev => ({
      ...prev,
      [key]: true
    }))
  };

  const closeModal = (key: string) => {
    setModals(prev => ({
      ...prev,
      [key]: false
    }))
  };

  const isOpen = (key: string) => modals[key]

  return { isOpen, openModal, closeModal };
}

export default useModal;