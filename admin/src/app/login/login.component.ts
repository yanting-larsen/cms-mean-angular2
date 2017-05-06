import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  login() {
      this.loading = true;
      this.authService.login(this.model.userName, this.model.password)
          .subscribe(
            result => {
              // login successful
              this.router.navigate(['/']);
            },
            error => {
              // login failed
              this.error = 'User name or password is incorrect';
              this.loading = false;
            });
  }
}
