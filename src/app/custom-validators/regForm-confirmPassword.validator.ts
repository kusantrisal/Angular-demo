import { AbstractControl, ValidatorFn } from "@angular/forms";

//control is actuall the whole formgroup
// export function compareValidator(givenPassword: String): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any | null } => {
//     console.error(control.get('password'));
//     console.error(control.get('confirmPassword'));
//     const invalid = control.get('confirmPassword') === control.get('password');
//     return invalid ? { misMatchedPassword: { value: control.value } } : null;
//   };
//}

export function compareValidator(control: AbstractControl): {[key: string]: boolean} |  null{
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
 if(password.pristine || confirmPassword.pristine) {
   return null;
 }
  return password && confirmPassword && password.value !== confirmPassword.value ? {'misMatchedPassword': true} : null;
}