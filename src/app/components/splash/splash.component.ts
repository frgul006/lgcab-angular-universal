import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Splash } from '../../model/splash.model';

@Component({
  selector: 'lgcab-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashComponent {
  @Input() height = 0;
  @Input() splash: Splash | null = null;

  public imageUrl = '/assets/splash-min.jpg';
}
