import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing';
import { AddTripComponent } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip'; 

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TripListingComponent,
    title: 'Travlr Getaways Admin'
  },
  {
    path: 'trips',
    component: TripListingComponent,
    title: 'Trip Management'
  },
  {
    path: 'add',
    component: AddTripComponent,
    title: 'Add Trip'
  },
  {
    path: 'edit-trip/:tripid', 
    component: EditTrip,
    title: 'Edit Trip'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
