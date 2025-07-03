// types
import type { IAccount, IBaseComponentProps } from '@/types';

interface IProps {
  account: IAccount;
  subTextColor?: string;
  textColor?: string;
}

type TProps = IBaseComponentProps & IProps;

export default TProps;
