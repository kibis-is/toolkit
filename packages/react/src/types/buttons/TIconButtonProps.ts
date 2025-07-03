import type { IconButtonProps } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

// types
import type { IBaseComponentProps } from '@/types';

interface IProps {
  icon: IconType;
}

type TIconButtonProps = IProps & IBaseComponentProps & IconButtonProps;

export default TIconButtonProps;
