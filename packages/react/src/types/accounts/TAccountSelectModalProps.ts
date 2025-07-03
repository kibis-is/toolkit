// types
import type { IAccount, IBaseComponentProps } from '@/types';

interface IProps {
  accounts: IAccount[];
  allowWatchAccounts?: boolean;
  multiple?: boolean;
  onClose: () => void;
  onSelect: (accounts: IAccount[]) => void;
  open: boolean;
  title?: string;
}

type TAccountSelectModalProps = IBaseComponentProps & IProps;

export default TAccountSelectModalProps;
