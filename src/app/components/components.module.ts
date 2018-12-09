import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CollageComponent } from './collage/collage.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { PblComponent } from './pbl/pbl.component';
import { SplashComponent } from './splash/splash.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    NavComponent,
    SplashComponent,
    ContactComponent,
    WelcomeComponent,
    CollageComponent,
    PblComponent,
    FooterComponent
  ],
  imports: [CommonModule, MatToolbarModule],
  exports: [
    NavComponent,
    SplashComponent,
    ContactComponent,
    WelcomeComponent,
    CollageComponent,
    PblComponent,
    FooterComponent
  ]
})
export class ComponentsModule {}
