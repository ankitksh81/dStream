import { useState } from 'react';

import { toast } from 'react-hot-toast';

interface AppHook {
  isModalOpen: boolean;
  selectedEvent: StreamEvent | null;
  handleCopyFeedback: () => void;
  handleOpenEventDetails: (event: StreamEvent) => void;
  closeModal: () => void;
}

export const useAppHook = (): AppHook => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<StreamEvent | null>(null);

  const closeModal = () => setIsModalOpen(false);

  const handleOpenEventDetails = (event: StreamEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCopyFeedback = () => {
    toast.success('Copied to Clipboard');
  };

  return {
    isModalOpen,
    selectedEvent,
    handleOpenEventDetails,
    closeModal,
    handleCopyFeedback,
  };
};
