import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PageComponent } from '../../model/page-component.model';

@Component({
  selector: 'lgcab-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent {
  @Input() pageComponent: PageComponent;
}
