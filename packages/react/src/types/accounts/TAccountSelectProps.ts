// types
import type { IAccount, IBaseComponentProps } from '@/types';

interface IProps {
  accounts: IAccount[];
  allowWatchAccounts?: boolean;
  disabled?: boolean;
  label?: string;
  onSelect: (account: IAccount) => void;
  required?: boolean;
  selectModalTitle?: string;
  value: IAccount | null;
}

type TAccountSelectProps = IBaseComponentProps & IProps;

export default TAccountSelectProps;
