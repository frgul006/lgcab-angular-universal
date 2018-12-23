import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageComponent } from '../model/page-component.model';
import { Philosophy } from '../model/philosophy.model';
import { Project } from '../model/project.model';
import { Splash } from '../model/splash.model';
import { allPhilosophies, AllPhilosophiesQuery } from './allPhilosophies';
import { allProjects, AllProjectsQuery } from './allProjects';
import { componentBySlug, PageComponentBySlugQuery } from './pageComponent';
import { splash, SplashResponse } from './splash';

@Injectable({ providedIn: 'root' })
export class QueryService {
  constructor(private readonly apollo: Apollo) {}

  getSplash(): Observable<Splash> {
    const ref = this.apollo.watchQuery<SplashResponse>({
      query: splash
    });
    return ref.valueChanges.pipe(map(result => result.data.splashes[0]));
  }

  getPageComponentBySlug(slug: string): Observable<PageComponent> {
    const ref = this.apollo.watchQuery<PageComponentBySlugQuery>({
      query: componentBySlug,
      variables: {
        slug
      }
    });
    return ref.valueChanges.pipe(map(result => result.data.pageComponent));
  }

  getAllPhilosophies(): Observable<Philosophy[]> {
    const ref = this.apollo.watchQuery<AllPhilosophiesQuery>({
      query: allPhilosophies
    });

    return ref.valueChanges.pipe(map(result => result.data.philosophies));
  }

  getAllProjects(): Observable<Project[]> {
    const projectsRef = this.apollo.watchQuery<AllProjectsQuery>({
      query: allProjects
    });

    return projectsRef.valueChanges.pipe(map(result => result.data.projects));
  }
}
