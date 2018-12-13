import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollageComponent } from './collage/collage.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { PblComponent } from './pbl/pbl.component';
import { SplashComponent } from './splash/splash.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [SplashComponent, ContactComponent, WelcomeComponent, CollageComponent, PblComponent, FooterComponent],
  imports: [CommonModule],
  exports: [SplashComponent, ContactComponent, WelcomeComponent, CollageComponent, PblComponent, FooterComponent]
})
export class ComponentsModule {}
