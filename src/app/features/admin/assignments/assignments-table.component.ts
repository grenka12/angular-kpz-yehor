import { Component, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AssignmentsService } from '../../../core/services/assignments.service';
import { AssignmentDto } from '../../../core/interfaces/assignment.dto';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-assignments-table',
  standalone: false,
  templateUrl: './assignments-table.component.html',
  styleUrls: ['./assignments-table.component.scss']
})
export class AssignmentsTableComponent implements OnInit {
  assignments: AssignmentDto[] = [];
  loading = false;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly assignmentsService: AssignmentsService
  ) {}

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadAssignments();
    }
  }

  loadAssignments() {
    this.loading = true;
    this.assignmentsService.getAssignments().subscribe({
      next: (assignments) => {
        this.assignments = assignments;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  private get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
