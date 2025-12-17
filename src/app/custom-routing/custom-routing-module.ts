import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomRoutingRoutingModule } from './custom-routing-routing-module';
import { CustomComponent } from '../custom-component/custom-component';

@NgModule({
  imports: [
    CommonModule,
    CustomComponent,             
    CustomRoutingRoutingModule
  ]
})
export class CustomRoutingModule {}
