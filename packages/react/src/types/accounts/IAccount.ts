// types
import type { IAccountDomainNames, TAccountColors, TAccountIcons } from '@/types';

interface IAccount {
  address: string;
  color: TAccountColors | null;
  domainName: IAccountDomainNames;
  icon: TAccountIcons | null;
  name: string | null;
  watch?: boolean;
}

export default IAccount;
