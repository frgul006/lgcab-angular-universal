import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lgcab-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashComponent implements OnInit {
  public imageUrl = '';

  constructor() {
    this.imageUrl = '/assets/splash.jpg';
  }

  ngOnInit() {}
}
