import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css',
})
export class RegistrationPageComponent {
  constructor(private userService: UserService) {}
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
    const currentUser = { username, password };
    this.userService.getAll();
    if (this.userService.authorization(currentUser)) {
      this.userService.addUser(currentUser);
      this.userService.saveUsers();
    } else {
      this.password.setErrors({ invalidPassword: 'пароль не совпадает' });
    }
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
