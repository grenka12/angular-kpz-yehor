import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomPipe } from '../../custom-pipe';
import { CustomDirective } from '../../custom-directive';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, CustomPipe, CustomDirective],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(private readonly router: Router) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
