import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MARKED_OPTIONS, MarkedOptions, MarkedRenderer, MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ContainersModule } from './containers/containers.module';
import { PagesModule } from './pages/pages.module';
import { ServiceWorkerModule } from '@angular/service-worker';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  const linkRenderer = renderer.link;

  renderer.link = function (this: MarkedRenderer, token) {
    const html = linkRenderer.call(this, token);
    return html.replace(/^<a /, '<a target="_blank" ');
  };

  return {
    renderer,
    gfm: true,
    breaks: false,
    pedantic: false
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    ContainersModule,
    PagesModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory
      }
    }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule {}
