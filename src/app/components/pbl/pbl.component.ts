import { Component, OnInit, Input } from '@angular/core';
import { PageComponent } from '../../model/page-component.model';

@Component({
  selector: 'lgcab-pbl',
  templateUrl: './pbl.component.html',
  styleUrls: ['./pbl.component.scss']
})
export class PblComponent {
  @Input() pageComponent: PageComponent;
}
