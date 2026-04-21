import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function imageUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { required: true };
    }

    try {
      new URL(value);
      return null;
    } catch {
      return { invalidUrl: true };
    }
  };
}
