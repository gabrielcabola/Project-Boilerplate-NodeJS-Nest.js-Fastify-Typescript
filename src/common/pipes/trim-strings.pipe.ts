import { AbstractTransformPipe } from './abstract-transform.pipe';

export class TrimStringsPipe extends AbstractTransformPipe {
  except(): string[] {
    return ['password', 'passwordConfirmation'];
  }

  protected transformValue(value: number | string | any): string | any {
    return typeof value === 'string' ? value.trim() : value;
  }
}
