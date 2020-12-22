import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CollageComponent } from './collage/collage.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { PageSectionComponent } from './page-section/page-section.component';
import { SplashComponent } from './splash/splash.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PhilosophyComponent } from './philosophy/philosophy.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    SplashComponent,
    ContactComponent,
    PhilosophyComponent,
    WelcomeComponent,
    CollageComponent,
    PageSectionComponent,
    FooterComponent
  ],
  imports: [CommonModule, MatIconModule, MarkdownModule.forChild()],
  exports: [
    SplashComponent,
    ContactComponent,
    PhilosophyComponent,
    WelcomeComponent,
    CollageComponent,
    PageSectionComponent,
    FooterComponent
  ]
})
export class ComponentsModule {}
