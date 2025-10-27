import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrls: ['./add-trip.css']
})
export class AddTripComponent implements OnInit {
  addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    console.log('[AddTrip] ngOnInit');

    this.addForm = this.formBuilder.group({
      // DO NOT send _id to API
      code: ['', Validators.required],
      name: ['', Validators.required],
      // backend wants Number here
      length: ['', Validators.required],
      // backend wants String here (you can keep just yyyy-mm-dd)
      start: ['', Validators.required],
      resort: ['', Validators.required],
      // backend wants perPerson: Number
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit(): void {
    console.log('[AddTrip] onSubmit fired');
    this.submitted = true;

    if (this.addForm.invalid) {
      console.log('[AddTrip] form invalid:', this.addForm.value, this.addForm.errors);
      alert('Please fill out all fields.');
      return;
    }

    const raw = this.addForm.value;

    // Build exactly what /api/trips expects
    const tripData = {
      code: raw.code,
      name: raw.name,
      length: Number(raw.length),         // must be a number
      start: String(raw.start),           // schema says String, not Date
      resort: raw.resort,
      perPerson: Number(raw.perPerson),   // must be a number
      image: raw.image,
      description: raw.description
    };

    console.log('[AddTrip] sending to API:', tripData);

    this.tripService.addTrip(tripData).subscribe({
      next: (data: any) => {
        console.log('[AddTrip] API success:', data);
        this.router.navigate(['/trips']);
      },
      error: (err: any) => {
        console.error('[AddTrip] API error:', err);
        alert('Trip create failed. Check console for details.');
      }
    });
  }

  cancel(): void {
    console.log('[AddTrip] cancel clicked');
    this.router.navigate(['/trips']);
  }
}
