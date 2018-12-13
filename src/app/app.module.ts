import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ContainersModule } from './containers/containers.module';
import { PagesModule } from './pages/pages.module';
import { ProjectsComponent } from './pages/projects/projects.component';
import { StartComponent } from './pages/start/start.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'lgcab' }),
    ComponentsModule,
    ContainersModule,
    PagesModule,
    RouterModule.forRoot([
      { path: '', component: StartComponent, pathMatch: 'full' },
      { path: 'uppdrag', component: ProjectsComponent }
    ]),
    TransferHttpCacheModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
