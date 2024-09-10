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
  ngOnInit() {
    this.userService.getAll();
    this.form.controls.username.setValue(this.userService.currentUserName);
  }

  constructor(private userService: UserService) {}

  form = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
  submited: boolean = false;
  submit() {
    this.submited = true;
    if (!this.form.valid) return;
    const { username, password } = this.form.value;
    if (!username || !password) return;
    const user = { username, password };
    this.userService.getAll();
    if (this.userService.authorization(user)) {
      this.userService.addUser(user);
      this.userService.saveUsers();
      this.userService.saveCurrentUser(user);
    } else {
      this.form.controls.password.setErrors({
        invalidPassword: 'пароль не совпадает',
      });
    }
  }
  get passwordError(): string {
    const { errors } = this.form.controls.password;
    if (this.submited && errors?.['required'])
      return 'поле должно быть заполнено';
    if (this.submited && errors?.['invalidPassword'])
      return 'пароль не совпадает';
    return '';
  }
}
