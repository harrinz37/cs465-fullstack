import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css'],
  imports: [CommonModule, RouterLink]
})
export class TripListingComponent implements OnInit {
  trips: any[] = [];

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.tripDataService.getTrips().subscribe({
      next: (data: any) => {
        this.trips = data;
      },
      error: (err) => {
        console.error('Error loading trips:', err);
      }
    });
  }

  // Handles broken/missing images
  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.style.display = 'none';
  }
}
