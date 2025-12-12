import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { DoctorsService } from '../../../core/services/doctors.service';
import { RequestsService } from '../../../core/services/requests.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { RequestFormValue } from '../../../shared/interfaces/request-form-value.interface';
import { toRequestDto } from '../../../shared/helpers/dto-mappers';
import { DoctorDto } from '../../../core/interfaces/doctor.dto';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoaderComponent],
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    patientFirstName: ['', Validators.required],
    patientLastName: ['', Validators.required],
    patientPatronymic: ['', Validators.required],
    address: ['', Validators.required],
    caseDescription: ['', Validators.required],
    requestedDate: ['', Validators.required],
    requestedTime: ['', Validators.required],
    priority: ['Normal' as 'Normal' | 'Urgent', Validators.required],
    availableDoctors: this.fb.control<number[]>([])
  });

  doctors = signal<DoctorDto[]>([]);
  loading = signal(false);
  submitted = signal(false);
  errorMessage = signal('');
  readonly title = computed(() => (this.submitted() ? 'Request submitted' : 'Patient request'));

  constructor(
    private readonly requestsService: RequestsService,
    private readonly doctorsService: DoctorsService
  ) {}

  ngOnInit() {
    this.fetchDoctors();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue() as RequestFormValue;
    raw.availableDoctors = raw.availableDoctors?.map(Number);
    const payload = toRequestDto(raw);
    this.loading.set(true);
    this.errorMessage.set('');

    this.requestsService
      .createRequest(payload)
      .pipe(
        tap({
          next: () => {
            this.submitted.set(true);
            this.loading.set(false);
          },
          error: (err) => {
            this.errorMessage.set('Failed to submit request');
            console.error(err);
            this.loading.set(false);
          }
        })
      )
      .subscribe();
  }

  private fetchDoctors() {
    this.loading.set(true);
    this.doctorsService
      .getDoctors()
      .pipe(
        tap({
          next: (doctors) => this.doctors.set(doctors),
          error: () => this.errorMessage.set('Unable to load doctors')
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }
}
