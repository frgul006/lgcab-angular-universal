import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Project } from '../../model/project.model';
import { QueryService } from '../../queries/query.service';
import { SeoService } from '../../seo.service';
import { ProjectsDialogComponent } from './projects.dialog.component';

@Component({
  selector: 'lgcab-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects!: Observable<Project[]>;

  constructor(private seo: SeoService, private readonly queryService: QueryService, public dialog: MatDialog) {}

  ngOnInit() {
    this.seo.generateTags({
      title: 'Projekt',
      description: 'Här ser du alla tidigare och pågående projekt utförda av LGCAB',
      slug: 'project'
    });

    this.projects = this.queryService.getAllProjects();
  }

  openDialog(project: Project): void {
    this.dialog.open(ProjectsDialogComponent, {
      width: '378px',
      data: project
    });
  }
}
