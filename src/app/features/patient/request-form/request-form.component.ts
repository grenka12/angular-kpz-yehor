import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { RequestsService } from '../../../core/services/requests.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { RequestFormValue } from '../../../shared/interfaces/request-form-value.interface';
import { toCreateRequestDto } from '../../../shared/helpers/dto-mappers';

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
    priority: ['Normal' as 'Normal' | 'Urgent', Validators.required]
  });

  loading = signal(false);
  submitted = signal(false);
  errorMessage = signal('');
  readonly title = computed(() => (this.submitted() ? 'Request submitted' : 'Patient request'));

  constructor(private readonly requestsService: RequestsService) {}

  ngOnInit() {
    this.setInitialDate();
    this.enforce2025Year();
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue() as RequestFormValue;
    const payload = toCreateRequestDto({
      ...raw,
      requestedDate: this.combineDateTime(raw.requestedDate, raw.requestedTime)
    });
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

  private setInitialDate() {
    const today = new Date();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');
    const normalized = `2025-${month}-${day}`;

    this.form.patchValue({ requestedDate: normalized }, { emitEvent: false });
  }

  private enforce2025Year() {
    this.form.controls.requestedDate.valueChanges.subscribe((value) => {
      if (!value) return;

      const normalized = this.to2025DateString(value);
      if (normalized !== value) {
        this.form.patchValue({ requestedDate: normalized }, { emitEvent: false });
      }
    });
  }

  private combineDateTime(dateValue: string, timeValue: string) {
    const normalizedDate = this.to2025DateString(dateValue);
    const [hours = '00', minutes = '00'] = (timeValue || '').split(':');

    return `${normalizedDate}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00.000Z`;
  }

  private to2025DateString(value: string) {
    if (!value) return '';

    const [datePart] = value.split('T');
    const [, month = '01', day = '01'] = (datePart || '').split('-');

    const normalizedMonth = month.padStart(2, '0');
    const normalizedDay = (day?.split('T')[0] || '01').padStart(2, '0');

    return `2025-${normalizedMonth}-${normalizedDay}`;
  }
}
