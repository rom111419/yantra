import {NgIf} from '@angular/common'
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule} from '@angular/forms'
import { HttpClient } from '@angular/common/http';

class CustomValidators {
  static password(userForm: FormGroup): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const firstName = userForm.get('firstName')?.value;
      const lastName = userForm.get('lastName')?.value;
      const password = control.value;

      if (firstName && lastName && password) {
        const nameRegex = new RegExp(firstName + '|' + lastName, 'i');
        const isValid =
          password.length >= 8 &&
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password) &&
          !nameRegex.test(password);

        return isValid ? null : { invalidPassword: true };
      }

      return { invalidPassword: true };
    };
  }
}

@Component({
  selector: 'app-signup-form',
  standalone: true,
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf
  ]
})
export class SignupFormComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.userForm.get('password')?.setValidators(CustomValidators.password(this.userForm));
    this.userForm.get('password')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const lastNameLength = this.userForm.value.lastName.length;
    this.http
      .get<any>(`https://jsonplaceholder.typicode.com/photos/${lastNameLength}`)
      .subscribe((response) => {
        const thumbnailUrl = response.thumbnailUrl;
        this.http
          .post<any>('https://jsonplaceholder.typicode.com/users', {
            firstName: this.userForm.value.firstName,
            lastName: this.userForm.value.lastName,
            email: this.userForm.value.email,
            thumbnailUrl: thumbnailUrl,
          })
          .subscribe(() => {
            console.log('Form submitted successfully.');
          });
      });
  }
}
