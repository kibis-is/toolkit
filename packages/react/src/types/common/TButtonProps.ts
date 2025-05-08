import type { ButtonProps } from '@chakra-ui/react';

// types
import type { IBaseComponentProps } from '@/types';

interface IProps {
  variant?: 'solid' | 'outline';
}

type TButtonProps = IBaseComponentProps & Omit<ButtonProps, 'variant'> & IProps;

export default TButtonProps;
