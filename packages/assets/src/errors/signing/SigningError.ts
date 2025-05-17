// constants
import { SIGNING_ERROR } from '@/constants';

// errors
import { BaseError } from '@/errors';

export default class SigningError extends BaseError {
  public readonly type = SIGNING_ERROR;
}
