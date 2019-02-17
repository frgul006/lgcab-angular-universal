import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../model/contact.model';
import { PageComponent } from '../model/page-component.model';
import { Philosophy } from '../model/philosophy.model';
import { Project } from '../model/project.model';
import { Splash } from '../model/splash.model';
import { allPhilosophiesQuery, AllPhilosophiesQueryResponse } from './allPhilosophies';
import { allProjectsQuery, AllProjectsQueryResponse } from './allProjects';
import { contactQuery, ContactQueryResponse } from './contact';
import { componentBySlugQuery, PageComponentBySlugQueryResponse } from './pageComponent';
import { splashQuery, SplashQueryReponse } from './splash';

@Injectable({ providedIn: 'root' })
export class QueryService {
  constructor(private readonly apollo: Apollo) {}

  getContact(): Observable<Contact> {
    const ref = this.apollo.watchQuery<ContactQueryResponse>({
      query: contactQuery
    });
    return ref.valueChanges.pipe(map(result => result.data.contacts[0]));
  }

  getSplash(): Observable<Splash> {
    const ref = this.apollo.watchQuery<SplashQueryReponse>({
      query: splashQuery
    });
    return ref.valueChanges.pipe(map(result => result.data.splashes[0]));
  }

  getPageComponentBySlug(slug: string): Observable<PageComponent> {
    const ref = this.apollo.watchQuery<PageComponentBySlugQueryResponse>({
      query: componentBySlugQuery,
      variables: {
        slug
      }
    });
    return ref.valueChanges.pipe(map(result => result.data.pageComponent));
  }

  getAllPhilosophies(): Observable<Philosophy[]> {
    const ref = this.apollo.watchQuery<AllPhilosophiesQueryResponse>({
      query: allPhilosophiesQuery
    });

    return ref.valueChanges.pipe(map(result => result.data.philosophies));
  }

  getAllProjects(): Observable<Project[]> {
    const projectsRef = this.apollo.watchQuery<AllProjectsQueryResponse>({
      query: allProjectsQuery
    });

    return projectsRef.valueChanges.pipe(map(result => result.data.projects));
  }
}
