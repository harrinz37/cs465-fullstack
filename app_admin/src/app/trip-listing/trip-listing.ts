import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { TripDataService } from '../services/trip-data';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css']
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  loading = true;
  error: string | null = null;

  constructor(private tripService: TripDataService) {}

  ngOnInit(): void {
    this.tripService.getTrips().subscribe({
      next: (data) => { this.trips = data; this.loading = false; },
      error: (err) => { this.error = 'Failed to load trips'; this.loading = false; console.error(err); }
    });
  }
}
