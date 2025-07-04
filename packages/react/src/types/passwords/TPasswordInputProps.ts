import type { ChangeEvent, KeyboardEvent, RefObject } from 'react';

// types
import type { IBaseComponentProps } from '@/types';

interface IProps {
  disabled?: boolean;
  error: string | null;
  hint?: string;
  id?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  label?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string;
}

type TPasswordInputProps = IBaseComponentProps & IProps;

export default TPasswordInputProps;
