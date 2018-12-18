import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SeoService } from '../../seo.service';

enum ProjectStatus {
  DOING = 'Doing',
  DONE = 'Done'
}

interface Project {
  id: number;
  title: string;
  description: string;
  role: string;
  createdAt: Date;
  currentStatus: ProjectStatus;
}

interface Query {
  projects: Project[];
}

@Component({
  selector: 'lgcab-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectsRef: QueryRef<Query>;
  projects: Observable<Project[]>;

  constructor(private seo: SeoService, private readonly apollo: Apollo) {}

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
}
