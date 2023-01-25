import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form !: FormGroup;
  email: any = '';
  password: any = '';
  error: any = '';
  public showPassword: boolean = false;

  constructor(
    private authApi: AuthService,
    private fb: FormBuilder)
  {
      this.form = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, [Validators.required]]
    })
  }

  public togglePassVisible(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
  }

  login() {
    this.authApi.login(this.form.value.email, this.form.value.password);
  }

}
