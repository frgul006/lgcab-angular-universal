import { Component } from '@angular/core';

@Component({
  selector: 'lgcab-root',
  template: `
    <h1>Universal Demo using Angular and Angular CLI</h1>
    <a routerLink="/">Home</a> <a routerLink="/projects">Projects</a>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {}
