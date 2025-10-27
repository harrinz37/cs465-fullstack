import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip {
  addForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', [Validators.required, Validators.min(1)]],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }

    console.log('Trip added:', this.addForm.value);
    alert('Trip successfully added!');
    this.addForm.reset();
    this.submitted = false;
  }
}
