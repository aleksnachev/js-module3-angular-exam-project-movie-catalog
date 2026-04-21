import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function movieTitleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { required: true };
    }

    if (value.length < 2) {
      return { minLength: { requiredLength: 2, actualLength: value.length } };
    }

    if (value.length > 100) {
      return { maxLength: { requiredLength: 100, actualLength: value.length } };
    }

    return null;
  };
}
