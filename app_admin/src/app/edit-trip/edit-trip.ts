import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrls: ['./edit-trip.css']
})
export class EditTrip implements OnInit {
  editForm!: FormGroup;
  submitted = false;
  message = '';
  trip: any;
  tripId = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    // grab id from /edit-trip/:tripid
    const idFromRoute = this.route.snapshot.paramMap.get('tripid');
    if (!idFromRoute) {
      alert("Couldn't find which trip to edit.");
      this.router.navigate(['/trips']);
      return;
    }
    this.tripId = idFromRoute;

    // build reactive form
    this.editForm = this.formBuilder.group({
      _id: [''],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // load trip data
    this.tripDataService.getTripById(this.tripId).subscribe({
      next: (data: any) => {
        this.trip = data;
        this.editForm.patchValue(data);
      },
      error: (err) => {
        console.error('Error loading trip for edit:', err);
        alert('Unable to load trip details.');
        this.router.navigate(['/trips']);
      }
    });
  }

  // helper getter for template validation state
  get f() {
    return this.editForm.controls;
  }

  // called by Cancel button in template
  cancelEdit(): void {
    this.router.navigate(['/trips']);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    // build payload from form
    const updatedTrip = this.editForm.value;

    // call service with id + data
    this.tripDataService
      .updateTrip(this.tripId, updatedTrip)
      .subscribe({
        next: (updated: any) => {
          console.log('Trip updated:', updated);
          this.message = 'Trip successfully updated!';
          this.router.navigate(['/trips']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('Trip update failed.');
        }
      });
  }
}
