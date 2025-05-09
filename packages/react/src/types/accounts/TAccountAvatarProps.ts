// types
import type { IAccount, IAccountAvatarBadgesProps, IBaseComponentProps, TSizes } from '@/types';

interface IProps {
  account: IAccount;
  badges?: IAccountAvatarBadgesProps;
  size?: TSizes;
}
type TAccountAvatarProps = IProps & IBaseComponentProps;

export default TAccountAvatarProps;
