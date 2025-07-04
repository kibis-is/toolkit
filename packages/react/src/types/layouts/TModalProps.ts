import type { ReactNode } from 'react';

// types
import type { IBaseComponentProps } from '@/types';

export interface IModalProps {
  body: ReactNode;
  closeButton?: boolean;
  closeOnEscape?: boolean;
  closeOnInteractOutside?: boolean;
  footer?: ReactNode;
  header?: ReactNode;
  onClose?: () => void;
  open: boolean;
}

type TModalProps = IBaseComponentProps & IModalProps;

export default TModalProps;
