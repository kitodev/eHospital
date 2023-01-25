import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form !: FormGroup;
  email: string = '';
  username: string = '';
  password: any = '';
  error: any = '';

  constructor(
    private authApi: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: [this.username, [Validators.required, Validators.required]],
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  signUp() {
    this.authApi.signUp(this.form.value.email, this.form.value.password);
  }
}
