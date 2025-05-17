// constants
import { ABI_READ_ERROR } from '@/constants';

// errors
import { BaseError } from '@/errors';

export default class ABIReadError extends BaseError {
  public readonly type = ABI_READ_ERROR;
}
