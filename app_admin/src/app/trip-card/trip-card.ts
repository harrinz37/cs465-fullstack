import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StripHtmlPipe } from '../strip-html.pipe';
import { ShortenPipe } from '../shorten.pipe';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, StripHtmlPipe, ShortenPipe],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCardComponent {
  @Input('trip') trip: any;

  constructor(private router: Router) {}

  editTrip(trip: any): void {
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['/edit']);
  }
}
