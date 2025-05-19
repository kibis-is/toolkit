// constants
import { FAILED_TO_COMPILE_ERROR } from '@/constants';

// errors
import { BaseError } from '@/errors';

export default class FailedToCompileError extends BaseError {
  public readonly type = FAILED_TO_COMPILE_ERROR;
}
