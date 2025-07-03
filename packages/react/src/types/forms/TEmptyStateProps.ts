import type { StackProps } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

// types
import type { IBaseComponentProps } from '@/types';

interface IProps {
  description?: string;
  icon?: IconType;
  title: string;
}

type TEmptyStateProps = StackProps & IBaseComponentProps & IProps;

export default TEmptyStateProps;
