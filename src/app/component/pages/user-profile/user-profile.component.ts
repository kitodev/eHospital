import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  form !: FormGroup;
  fullName !: string;
  about !: string;
  country !: string;
  address !: string;
  phone !: number;
  email !: string;
  newpassword !: string;
  renewpassword !: string;

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.formBuilder();
    //this.changePasswordForm();
  }

  formBuilder() {
    this.form = this.fb.group({
      fullName: [this.fullName, [Validators.required]],
      about: [this.about, [Validators.required]],
      phone : [this.phone, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email : [this.email, [Validators.required, Validators.email]],
      address: [this.address, [Validators.required]],
    })

    console.log(this.form);
  }

  // changePasswordForm() {
  //   this.form = this.fb.group({
  //     newpassword: [this.newpassword, [Validators.required]],
  //     renewpassword: [this.renewpassword, [Validators.required]],
  //   })
  //   console.log(this.form);
  // }
}
