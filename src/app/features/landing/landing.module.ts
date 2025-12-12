import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';
import { LandingRoutingModule } from './landing-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [SharedModule, LandingRoutingModule]
})
export class LandingModule {}
