// constants
import { INSUFFICIENT_BALANCE_ERROR } from '@/constants';

// errors
import { BaseError } from '@/errors';

export default class InsufficientBalanceError extends BaseError {
  public readonly type = INSUFFICIENT_BALANCE_ERROR;
}
