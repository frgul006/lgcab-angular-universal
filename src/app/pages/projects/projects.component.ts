import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Query } from '../../model/graphql.model';
import { Project } from '../../model/project.model';
import { SeoService } from '../../seo.service';
import { ProjectsDialogComponent } from './projects.dialog.component';

@Component({
  selector: 'lgcab-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectsRef: QueryRef<Query>;
  projects: Observable<Project[]>;

  constructor(private seo: SeoService, private readonly apollo: Apollo, public dialog: MatDialog) {}

  ngOnInit() {
    this.seo.generateTags({
      title: 'Projekt',
      description: 'Här ser du alla tidigare och pågående projekt utförda av LGCAB',
      slug: 'project'
    });
    this.projectsRef = this.apollo.watchQuery<Query>({
      query: gql`
        query allProjects {
          projects(orderBy: title_ASC) {
            id
            slug
            title
            description
            role
            createdAt
            currentStatus
          }
        }
      `
    });

    this.projects = this.projectsRef.valueChanges.pipe(map(result => result.data.projects));
  }

  openDialog(project: Project): void {
    const dialogRef = this.dialog.open(ProjectsDialogComponent, {
      width: '378px',
      data: project
    });
  }
}
