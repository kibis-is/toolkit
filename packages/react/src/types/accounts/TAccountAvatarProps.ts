// types
import type { IAccountAvatarBadgesProps, IBaseComponentProps, TAccountColors, TAccountIcons, TSizes } from '@/types';

interface IProps {
  badges?: IAccountAvatarBadgesProps;
  color?: TAccountColors;
  icon?: TAccountIcons;
  size?: TSizes;
}
type TAccountAvatarProps = IProps & IBaseComponentProps;

export default TAccountAvatarProps;
