// constants
import { INVALID_BOX_REFERENCE_ERROR } from '@/constants';

// errors
import { BaseError } from '@/errors';

export default class InvalidBoxReferenceError extends BaseError {
  public readonly type = INVALID_BOX_REFERENCE_ERROR;
}
