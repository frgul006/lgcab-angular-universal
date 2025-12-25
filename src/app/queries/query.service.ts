import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../model/contact.model';
import { PageComponent } from '../model/page-component.model';
import { Philosophy } from '../model/philosophy.model';
import { Project } from '../model/project.model';
import { Splash } from '../model/splash.model';
import { CONTACT } from '../data/contact.data';
import { PAGE_COMPONENTS } from '../data/page-components.data';
import { PHILOSOPHIES } from '../data/philosophies.data';
import { PROJECTS } from '../data/projects.data';
import { SPLASH } from '../data/splash.data';

@Injectable({ providedIn: 'root' })
export class QueryService {
  getContact(): Observable<Contact> {
    return of(CONTACT);
  }

  getSplash(): Observable<Splash> {
    return of(SPLASH);
  }

  getPageComponentBySlug(slug: string): Observable<PageComponent | null> {
    return of(PAGE_COMPONENTS.find(component => component.slug === slug) ?? null);
  }

  getAllPhilosophies(): Observable<Philosophy[]> {
    return of(PHILOSOPHIES);
  }

  getAllProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }
}
