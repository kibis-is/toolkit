import type { InputProps } from '@chakra-ui/react';

// types
import type { IBaseComponentProps } from '@/types';

interface IProps {
  error?: string;
  label?: string;
  passwordPolicyLink?: string;
  score: number;
}
type TNewPasswordInputProps = IBaseComponentProps & InputProps & IProps;

export default TNewPasswordInputProps;
