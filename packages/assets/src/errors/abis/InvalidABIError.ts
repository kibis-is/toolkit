// constants
import { INVALID_ABI_ERROR } from '@/constants';

// errors
import { BaseError } from '@/errors';

export default class InvalidABIError extends BaseError {
  public readonly type = INVALID_ABI_ERROR;
}
