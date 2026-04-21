import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function movieDescriptionValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { required: true };
    }

    if (value.length < 10) {
      return { minLength: { requiredLength: 10, actualLength: value.length } };
    }

    if (value.length > 1000) {
      return { maxLength: { requiredLength: 1000, actualLength: value.length } };
    }

    return null;
  };
}
