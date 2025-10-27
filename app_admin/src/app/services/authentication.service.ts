// app_admin/src/app/services/authentication.service.ts
import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // holds last auth result from API
  private authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  // ===== TOKEN STORAGE HELPERS =====

  // read JWT from localStorage
  public getToken(): string {
    let out: any = this.storage.getItem('travlr-token');
    if (!out) {
      return '';
    }
    return out;
  }

  // save JWT to localStorage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // remove JWT from localStorage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // ===== AUTH STATE HELPERS =====

  // isLoggedIn(): check token exists AND not expired
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // exp is in seconds, Date.now() is ms -> divide by 1000
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  // getCurrentUser(): decode token payload for { email, name }
  // call this ONLY after checking isLoggedIn()
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // ===== API WRAPPERS =====

  // call backend /login
  public login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd)
      .subscribe({
        next: (value: any) => {
          if (value) {
            // console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  // call backend /register
  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd)
      .subscribe({
        next: (value: any) => {
          if (value) {
            // console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }
}
