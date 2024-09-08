import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css',
})
export class RegistrationPageComponent {
  submited: boolean = false;
  form = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
  submit() {
    this.submited = true;
    if (!this.form.valid) return;
    const { username, password } = this.form.value;
    if (!username || !password) return;
    const localUsers = localStorage.getItem('users');
    if (!localUsers) {
      localStorage.setItem('users', JSON.stringify([this.form.value]));
      return;
    }
    const users: { username: string; password: string }[] =
      JSON.parse(localUsers);
    const localUser = users.find((item) => item.username === username);
    if (localUser) {
      if (localUser.password !== password) {
        console.log('password invalid');
        this.password.setErrors({ invalidPassword: 'пароль не совпадает' });
        return;
      }
      console.log('password valid');
      return;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
  }
  get username() {
    return this.form.controls.username;
  }
  get password() {
    return this.form.controls.password;
  }
  get passwordError(): string {
    const { errors } = this.password;
    if (this.submited && errors?.['required'])
      return 'поле должно быть заполнено';
    if (this.submited && errors?.['invalidPassword'])
      return 'пароль не совпадает';
    return '';
  }
}
