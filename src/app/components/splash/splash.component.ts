import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lgcab-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashComponent {
  @Input() height: number;

  public imageUrl = '';

  constructor() {
    this.imageUrl = '/assets/splash-min.jpg';
  }
}
