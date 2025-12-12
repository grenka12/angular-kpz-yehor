import { NgModule } from '@angular/core';
import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RequestFormComponent } from './request-form.component';

@NgModule({
  declarations: [RequestFormComponent],
  imports: [SharedModule, PatientRoutingModule]
})
export class PatientModule {}
