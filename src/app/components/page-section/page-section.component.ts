import { Component, Input } from '@angular/core';
import { PageComponent } from '../../model/page-component.model';

@Component({
  selector: 'lgcab-page-section',
  templateUrl: './page-section.component.html',
  styleUrls: ['./page-section.component.scss']
})
export class PageSectionComponent {
  @Input() pageComponent: PageComponent;
  @Input() imgUrl: string;
  @Input() imgAlt: string;
}
