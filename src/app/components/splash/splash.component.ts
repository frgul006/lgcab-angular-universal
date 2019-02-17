import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Splash } from '../../model/splash.model';

@Component({
  selector: 'lgcab-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashComponent {
  @Input() height: number;
  @Input() splash: Splash;

  public imageUrl = '';

  constructor() {
    this.imageUrl = '/assets/splash-min.jpg';
  }
}
