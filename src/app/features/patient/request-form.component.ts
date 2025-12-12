import { Component, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { DoctorsService } from '../../core/services/doctors.service';
import { RequestsService } from '../../core/services/requests.service';
import { DoctorDto } from '../../core/interfaces/doctor.dto';
import { mapRequestFormToDto } from '../../shared/helpers/dto-mappers';

@Component({
  selector: 'app-request-form',
  standalone: false,
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  requestForm!: FormGroup;
  doctors: DoctorDto[] = [];
  submitting = false;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly fb: FormBuilder,
    private readonly requestsService: RequestsService,
    private readonly doctorsService: DoctorsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      patientFirstName: ['', Validators.required],
      patientLastName: ['', Validators.required],
      patientPatronymic: [''],
      address: ['', Validators.required],
      caseDescription: ['', Validators.required],
      requestedDate: ['', Validators.required],
      requestedTime: ['', Validators.required],
      priority: ['Normal', Validators.required],
      doctorId: [null]
    });

    if (this.isBrowser) {
      this.doctorsService.getDoctors().subscribe((doctors) => (this.doctors = doctors));
    }
  }

  submit(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload = mapRequestFormToDto(this.requestForm.value);
    this.requestsService.createRequest(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.requestForm.reset({ priority: 'Normal' });
        this.router.navigate(['/']);
      },
      error: () => (this.submitting = false)
    });
  }

  private get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
