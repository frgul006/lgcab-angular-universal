import { Component, OnInit, Input } from '@angular/core';
import { PageComponent } from '../../model/page-component.model';

@Component({
  selector: 'lgcab-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @Input() pageComponent: PageComponent;

  constructor() {}

  ngOnInit() {}
}
