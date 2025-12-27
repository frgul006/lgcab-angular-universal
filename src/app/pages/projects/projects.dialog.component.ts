import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../model/project.model';

@Component({
    selector: 'lgcab-projects-dialog',
    templateUrl: 'projects.dialog.component.html',
    styleUrls: ['./projects.dialog.component.scss'],
    standalone: false
})
export class ProjectsDialogComponent {
  constructor(public dialogRef: MatDialogRef<ProjectsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Project) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
