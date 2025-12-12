import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomComponent } from '../custom-component/custom-component';

const routes: Routes = [
  { path: 'custom', component: CustomComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomRoutingRoutingModule { }
