import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error: any;

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  login(username: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(username ,password)
      .then(result => {
        this.auth.authState.subscribe(async user => {
          if(user) {
            localStorage.setItem('user', JSON.stringify(user));
            await this.router.navigate(['/dashboard']);
            location.reload();
          }
        })
      })
      .catch( err => {
        this.error = err;
      })
  }

  signUp(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
    .then( result => {
      this.auth.authState.subscribe(async user => {
        this.router.navigate(['/login']);
        location.reload();
      })
    })
    .catch( err => {
      this.error = err;
    })
  }

  async logout() {
    localStorage.setItem('user','null');
    localStorage.removeItem('user');
    localStorage.removeItem('token_value');
    await this.router.navigate(['/login']);
    location.reload();
  }

  isUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

}
