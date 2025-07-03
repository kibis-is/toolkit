import {
  Dialog,
  Portal,
} from '@chakra-ui/react';
import type { Dialog as ArkDialog } from '@ark-ui/react';
import { type FC, useCallback, useMemo } from 'react';
import { IoClose } from 'react-icons/io5';

// components
import { IconButton } from '@/components';

// hooks
import { useBackgroundColor, useDesktopAndUp, useTabletAndUp } from '@/hooks';

// types
import type { TModalProps } from '@/types';

const Modal: FC<TModalProps> = ({ body, closeButton, closeOnEscape, closeOnInteractOutside, colorMode, footer, header, onClose, open }) => {
  // hooks
  const backgroundColor = useBackgroundColor(colorMode);
  const isDesktopAndUp = useDesktopAndUp();
  const isTabletAndUp = useTabletAndUp();
  // memos
  const size = useMemo(() => {
    if (isDesktopAndUp) {
      return 'md';
    }

    if (isTabletAndUp) {
      return 'lg';
    }

    return 'full';
  }, []);
  // callbacks
  const handleOnOpenChange = useCallback((event: ArkDialog.OpenChangeDetails) => {
    if (!event.open && onClose) {
      onClose();
    }
  }, []);

  return (
    <Dialog.Root
      closeOnEscape={closeOnEscape}
      closeOnInteractOutside={closeOnInteractOutside}
      lazyMount={true}
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={handleOnOpenChange}
      placement="center"
      scrollBehavior="inside"
      size={size}
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content bg={backgroundColor}>
            {/*header*/}
            <Dialog.Header>
              {header}
            </Dialog.Header>

            {/*body*/}
            <Dialog.Body>
              {body}
            </Dialog.Body>

            {/*footer*/}
            <Dialog.Footer>
              {footer}
            </Dialog.Footer>

            {/*close button*/}
            {closeButton && (
              <Dialog.CloseTrigger asChild={true}>
                <IconButton colorMode={colorMode} icon={IoClose} size="sm" />
              </Dialog.CloseTrigger>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

Modal.displayName = 'Modal';

export default Modal;
