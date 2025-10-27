import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip {
  editForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      code: ['TRIP001', Validators.required],
      name: ['Sample Trip', Validators.required],
      length: [7, [Validators.required, Validators.min(1)]],
      start: ['2025-12-01', Validators.required],
      resort: ['Example Resort', Validators.required],
      perPerson: [1500, [Validators.required, Validators.min(0)]],
      image: ['sample.jpg', Validators.required],
      description: ['An example trip for editing.']
    });
  }

  get f() {
    return this.editForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }

    console.log('Trip updated:', this.editForm.value);
    alert('Trip successfully updated!');
  }
}
