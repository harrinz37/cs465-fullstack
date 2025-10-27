import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Trip } from '../models/trip.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css']
})
export class TripCard {
  @Input() trip!: Trip;

  constructor(public authenticationService: AuthenticationService) {}

  onImgError(evt: Event) {
    const img = evt.target as HTMLImageElement;
    img.src = 'assets/images/placeholder.png';
  }
}
