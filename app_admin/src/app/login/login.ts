import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  public formError: string = '';
  public submitted: boolean = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public onLoginSubmit(): void {
    this.formError = '';

    if (
      !this.credentials.email ||
      !this.credentials.password ||
      !this.credentials.name
    ) {
      this.formError = 'All fields are required, please try again';
      // mimic the guide: bounce back to page
      this.router.navigateByUrl('#');
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    const newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    // This triggers the backend /login and stores the JWT.
    this.authenticationService.login(newUser, this.credentials.password);

    // Try immediate redirect
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']);
    } else {
      // Fallback: wait up to 3 seconds and check again
      const timer = setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']);
        }
      }, 3000);
    }
  }
}
