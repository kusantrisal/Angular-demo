import { AbstractControl, ValidatorFn } from '@angular/forms'

//if the password is password throw this error
export function invalidPasswordValidator(control: AbstractControl): {[key: string]: any | null}{
const invalid = /password/.test(control.value.toLowerCase());
return invalid ? {"invalidPassword": {value: control.value}} : null;
}

export function initialValidator(control: AbstractControl): {[key: string]: any | null}{
    const invalid = control.get('fname') && control.get('initial') && control.get('fname').value.charAt(0) === control.get('initial').value;
    console.log(invalid);
    return !invalid ? {"invalidInitial": {value: control.value}} : null;
    }