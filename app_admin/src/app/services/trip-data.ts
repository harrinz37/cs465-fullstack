import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  // Base URL for all API calls
  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  //
  // ===== AUTH HEADERS FOR PROTECTED CALLS =====
  //
  private getAuthHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  //
  // ===== TRIP METHODS =====
  //

  // GET all trips (not protected)
  public getTrips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/trips`);
  }

  // GET a single trip by ID (not protected)
  public getTripById(tripId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/trips/${tripId}`);
  }

  // POST create a trip (protected)
  public addTrip(trip: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/trips`,
      trip,
      { headers: this.getAuthHeaders() }
    );
  }

  // PUT update a trip (protected) — explicit 2-argument version
  public updateTrip(tripId: string, trip: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/trips/${tripId}`,
      trip,
      { headers: this.getAuthHeaders() }
    );
  }

  //
  // ===== AUTH METHODS =====
  //
  // Both login() and register() share the same helper below
  //

  // /login -> returns JWT
  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  // /register -> creates user then returns JWT
  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  // shared helper for login/register
  private handleAuthAPICall(
    endpoint: string,
    user: User,
    passwd: string
  ): Observable<AuthResponse> {

    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(
      `${this.baseUrl}/${endpoint}`,
      formData
    );
  }
}
