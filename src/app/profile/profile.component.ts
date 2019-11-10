import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import {
  invalidPasswordValidator,
  initialValidator
} from "../custom-validators/registrationform.validator";
import { compareValidator } from "../custom-validators/regForm-confirmPassword.validator";
import { HttpService } from '../services/http/http.service';
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  public firstEnteredPassword: string;
  public registrationForm: FormGroup;

  ngOnInit() {
    //One way
    // registrationForm = new FormGroup({
    //   fname: new FormControl('default value'),
    //   password: new FormControl(),
    //   confirmPassword: new FormControl(),
    //   contactInfo: new FormGroup({
    //     email: new FormControl()
    //   })
    // });
    //Using formbuilder to create from group
    //2nd way
    this.registrationForm = this.fb.group(
      {
        fname: ["", [Validators.required, Validators.minLength(2)]],
        password: [
          "",
          [
            invalidPasswordValidator,
            Validators.required,
            Validators.minLength(2)
          ]
        ],
        // confirmPassword: ["p", compareValidator('example of passing args lol')],
        confirmPassword: ["", Validators.required],
        contactInfo: this.fb.group({
          email: [""]
        }),
        consent: [false],
        initial: [""]
      },
      { validators: [compareValidator] }
    );
    //show initial formcontrol only if box is checked
    this.registrationForm
      .get("consent")
      .valueChanges.subscribe(checkedValue => {
        const formGroup = this.registrationForm;
        const initial = this.registrationForm.get("initial");
        if (checkedValue) {
          initial.setValidators([Validators.required]);
          formGroup.setValidators([compareValidator, initialValidator]);
        } else {
          initial.clearValidators();
        }
        initial.updateValueAndValidity();
        formGroup.updateValueAndValidity();
      });

      //for dynamic form controls
      //https://www.youtube.com/watch?v=4nJJQMxZkF0&list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ&index=58
  }

  loadFormData() {
    //setValue is for complete object use patchValue for certain fields only
    console.log(this.registrationForm);
    this.registrationForm.setValue({
      fname: "first name",
      password: "aa",
      confirmPassword: "aa",
      contactInfo: {
        email: "sample@mail.com"
      },
      consent: true,
      initial: "f"
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.httpService.postRequest(this.registrationForm.value)
    .subscribe(data => {
      console.log(data), 
      err => {
        console.error(err);
      }
    });
  }
}
