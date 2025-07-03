import type { StackProps } from '@chakra-ui/react';

// types
import type { IBaseComponentProps } from '@/types';

interface IProps {
  error?: string;
  label: string;
  required?: boolean;
}
type TLabelProps = IProps & IBaseComponentProps & StackProps;

export default TLabelProps;
