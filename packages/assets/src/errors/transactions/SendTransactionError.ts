// constants
import { SEND_TRANSACTION_ERROR } from '@/constants';

// errors
import { BaseError } from '@/errors';

export default class SendTransactionError extends BaseError {
  public readonly type = SEND_TRANSACTION_ERROR;
}
