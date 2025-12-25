import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../model/contact.model';
import { PageComponent } from '../model/page-component.model';
import { Philosophy } from '../model/philosophy.model';
import { Project } from '../model/project.model';
import { Splash } from '../model/splash.model';

@Injectable({ providedIn: 'root' })
export class QueryService {
  private readonly dataRoot = 'assets/data';

  constructor(private readonly http: HttpClient) {}

  getContact(): Observable<Contact> {
    return this.http.get<Contact>(`${this.dataRoot}/contact.json`);
  }

  getSplash(): Observable<Splash> {
    return this.http.get<Splash>(`${this.dataRoot}/splash.json`);
  }

  getPageComponentBySlug(slug: string): Observable<PageComponent> {
    return this.http
      .get<Array<PageComponent & { slug?: string }>>(`${this.dataRoot}/page-components.json`)
      .pipe(map(components => components.find(component => component.slug === slug) || null));
  }

  getAllPhilosophies(): Observable<Philosophy[]> {
    return this.http.get<Philosophy[]>(`${this.dataRoot}/philosophies.json`);
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.dataRoot}/projects.json`);
  }
}
