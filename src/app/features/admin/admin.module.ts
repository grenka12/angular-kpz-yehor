import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { RequestsTableComponent } from './requests/requests-table.component';
import { RequestDetailsComponent } from './requests/request-details.component';
import { AssignmentsTableComponent } from './assignments/assignments-table.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    RequestsTableComponent,
    RequestDetailsComponent,
    AssignmentsTableComponent
  ],
  imports: [SharedModule, AdminRoutingModule]
})
export class AdminModule {}
