// types
import type { IBaseComponentProps, TAccountColors, TAccountIcons } from '@/types';

interface IProps {
  address: string;
  color?: TAccountColors;
  domainName?: string;
  icon?: TAccountIcons;
  name?: string;
  subTextColor?: string;
  textColor?: string;
}

type TProps = IBaseComponentProps & IProps;

export default TProps;
