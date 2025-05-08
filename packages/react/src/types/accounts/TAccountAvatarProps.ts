// types
import type { IBaseComponentProps, TAccountColors, TAccountIcons, TSizes } from '@/types';

interface IProps {
  color?: TAccountColors;
  icon?: TAccountIcons;
  size?: TSizes;
}
type TAccountAvatarProps = IProps & IBaseComponentProps;

export default TAccountAvatarProps;
