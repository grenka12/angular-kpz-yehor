import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CustomComponent } from './custom-component/custom-component';
import { CustomPipe } from './custom-pipe';
import { CustomDirective } from './custom-directive';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
  CustomComponent,
  CustomPipe,
  CustomDirective
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-kpz-yehor');
}
