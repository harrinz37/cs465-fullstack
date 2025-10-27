import { Routes } from '@angular/router';

import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', component: TripListing, pathMatch: 'full' },
  { path: 'add-trip', component: AddTrip },
  { path: 'edit-trip/:tripId', component: EditTrip },
  { path: 'login', component: LoginComponent }
];
