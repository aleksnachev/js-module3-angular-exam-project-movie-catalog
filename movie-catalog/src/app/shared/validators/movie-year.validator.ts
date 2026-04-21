import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function movieYearValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { required: true };
    }

    const year = Number(value);
    const currentYear = new Date().getFullYear();

    if (year < 1800 || year > currentYear) {
      return { invalidYear: true };
    }

    return null;
  };
}
