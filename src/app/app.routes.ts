import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CustomComponent } from './custom-component/custom-component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'custom', component: CustomComponent },
];
