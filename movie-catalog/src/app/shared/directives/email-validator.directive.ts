import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidator,
      multi: true,
    },
  ],
})
export class EmailValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]{6,}@gmail\.(bg|com)$/;

    if (!emailRegex.test(value)) {
      return { invalidEmail: true };
    }

    return null;
  }
}
