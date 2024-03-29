import { Component } from '@angular/core';
import { AuthService } from './shared/service/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hospital-management-system';
  userLoggedIn : boolean = false;

  constructor(
    private authApi : AuthService,
    private titleService: Title
  ) {
    }

  ngOnInit() {
    this.userLoggedIn = this.authApi.isUserLoggedIn();
  }
}
